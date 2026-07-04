import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    /* ignore */
  }
}

export async function saveJsonFile<T>(filename: string, data: T): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  let existing: unknown[] = [];
  try {
    const content = await fs.readFile(filePath, "utf-8");
    existing = JSON.parse(content);
  } catch {
    existing = [];
  }
  const updated = Array.isArray(existing) ? [...existing, data] : [data];
  await fs.writeFile(filePath, JSON.stringify(updated, null, 2));
}

export async function sendNotificationEmail(
  subject: string,
  body: string,
  to?: string
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = to ?? process.env.NOTIFICATION_EMAIL;

  if (!apiKey || !recipient) return false;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM ?? "Sindhu <onboarding@resend.dev>",
        to: [recipient],
        subject,
        text: body,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
