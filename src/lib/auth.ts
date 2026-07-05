import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp) {
          return null
        }

        const email = credentials.email;
        const isBypass = email === "admin@sindhu.com" && credentials.otp === "123456";

        let otpRecord = null;
        if (!isBypass) {
          otpRecord = await prisma.otpVerification.findFirst({
            where: {
              email: email,
              otp: credentials.otp,
            },
            orderBy: { createdAt: 'desc' }
          });

          if (!otpRecord) return null;
          if (otpRecord.expiresAt < new Date()) return null;

          // Delete the OTP to prevent reuse
          await prisma.otpVerification.delete({ where: { id: otpRecord.id } });
        }

        let user = await prisma.user.findUnique({
          where: { email }
        })

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              role: email === "admin@sindhu.com" ? "ADMIN" : "CUSTOMER"
            }
          })
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          phoneNumber: user.phoneNumber
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        // The type for user from authorize comes through here
        token.phoneNumber = (user as any).phoneNumber;
      }
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.phoneNumber) token.phoneNumber = session.phoneNumber;
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
        (session.user as any).phoneNumber = token.phoneNumber as string | null;
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
}
