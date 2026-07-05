"use client";

import { useState } from "react";
import { Power } from "lucide-react";
import { useRouter } from "next/navigation";

interface SettingsFormProps {
  initialIsOnline: boolean;
  initialMessage: string;
}

export function SettingsForm({ initialIsOnline, initialMessage }: SettingsFormProps) {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(initialIsOnline);
  const [message, setMessage] = useState(initialMessage);
  const [loading, setLoading] = useState(false);

  const toggleOnline = async () => {
    setLoading(true);
    const nextState = !isOnline;
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "IS_ONLINE", value: String(nextState) })
      });
      setIsOnline(nextState);
      router.refresh();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const saveMessage = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "OFFLINE_MESSAGE", value: message })
      });
      alert("Message saved!");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-sindhu-border/30 shadow-sm max-w-2xl">
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-full ${isOnline ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <Power size={32} />
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-sindhu-text mb-2">
              Restaurant Status: {isOnline ? 'ONLINE' : 'OFFLINE'}
            </h2>
            <p className="text-sm text-sindhu-text-light mb-6">
              Toggle this switch to completely pause incoming orders. When offline, customers will see a message that the restaurant is not accepting orders.
            </p>
            
            <button 
              onClick={toggleOnline}
              disabled={loading}
              className={`px-6 py-3 rounded-xl font-bold tracking-widest text-sm shadow-md transition-colors disabled:opacity-50 ${isOnline ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
            >
              {isOnline ? 'TAKE RESTAURANT OFFLINE' : 'BRING RESTAURANT ONLINE'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-sindhu-border/30 shadow-sm max-w-2xl">
        <h2 className="text-xl font-bold text-sindhu-text mb-2">Offline Message</h2>
        <p className="text-sm text-sindhu-text-light mb-4">
          This message will be shown to users when the restaurant is taken offline.
        </p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-sindhu-border/50 rounded-xl p-4 mb-4 focus:outline-none focus:border-sindhu-gold resize-none"
          rows={3}
        />
        <button 
          onClick={saveMessage}
          disabled={loading}
          className="bg-sindhu-text text-white px-6 py-3 rounded-xl font-bold tracking-widest text-sm hover:bg-[#1f1e1d] transition-colors disabled:opacity-50"
        >
          SAVE MESSAGE
        </button>
      </div>
    </div>
  );
}
