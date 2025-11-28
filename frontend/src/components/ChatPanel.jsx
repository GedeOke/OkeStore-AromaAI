import { useEffect, useRef, useState } from "react";
import { sendChat } from "../lib/api";

export default function ChatPanel() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const chatRef = useRef(null);

  // Static session_id per load untuk mengelola history percakapan di backend
  const [sessionId] = useState(() => {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return `web-${Date.now()}`;
  });

  // Auto scroll ke bawah setiap ada pesan baru
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const addMessage = (msg) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), ...msg }]);
  };

  const handleSend = async (overrideMessage) => {
    const textToSend =
      overrideMessage !== undefined ? overrideMessage : input.trim();

    if (!textToSend || loading) return;

    setError(null);
    setInput("");

    // Tampilkan pesan user di UI
    addMessage({ sender: "user", text: textToSend });

    setLoading(true);

    try {
      const data = await sendChat(textToSend, sessionId);

      addMessage({
        sender: "bot",
        text: data.reply,
        intent: data.intent,
      });
    } catch (err) {
      const friendly =
        err?.message || "Terjadi kesalahan, coba lagi nanti.";
      setError(friendly);
      addMessage({
        sender: "system",
        text: "Terjadi kesalahan, coba lagi nanti.",
      });
    } finally {
      setLoading(false);
    }
  };

  const quickSuggestions = [
    "Cek status pesanan #OKE1234",
    "Rekomendasi parfum manis untuk wanita",
    "Lihat detail produk parfum paling laris",
    "Saya mau komplain soal pesanan",
  ];

  return (
    <div className="flex flex-col h-[70vh] max-h-[640px] rounded-3xl border border-slate-200/70 bg-gradient-to-br from-white via-sky-50 to-indigo-50 shadow-xl">
      {/* Header panel chat */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/80 bg-white/80">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Chat dengan OKE STORE Bot
          </h2>
          <p className="text-[11px] text-slate-500">
            Tanyakan apa saja seputar parfum dan pesananmu.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-[11px] font-medium text-emerald-600">
            Online
          </span>
        </div>
      </div>

      {/* Area chat */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-slate-50/70"
      >
        {messages.length === 0 && !loading && (
          <div className="text-[11px] text-slate-500 bg-white/90 border border-dashed border-slate-200 rounded-2xl px-3 py-3">
            <p className="font-medium text-slate-700 mb-1">
              Selamat datang di OKE STORE Chatbot 👋
            </p>
            <p className="mb-1">
              Kamu bisa mulai dengan contoh seperti:
            </p>
            <ul className="list-disc list-inside space-y-0.5">
              <li>"Halo, rekomendasi parfum floral dong."</li>
              <li>"Cek status pesanan #OKE1234."</li>
              <li>"Detail parfum yang wangi fresh untuk kerja."</li>
            </ul>
          </div>
        )}

        {messages.map((msg) => {
          if (msg.sender === "system") {
            return (
              <div
                key={msg.id}
                className="flex justify-center text-[11px] text-red-600"
              >
                <div className="px-3 py-1.5 rounded-full bg-red-50 border border-red-100">
                  {msg.text}
                </div>
              </div>
            );
          }

          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm ${
                  isUser
                    ? "bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 text-white rounded-br-md"
                    : "bg-white/95 text-slate-900 rounded-bl-md border border-slate-100"
                }`}
              >
                <p>{msg.text}</p>
                {!isUser && msg.intent && (
                  <span className="mt-2 inline-flex rounded-full bg-slate-100 text-slate-600 border border-slate-200 px-2 py-0.5 text-[10px] font-medium">
                    Intent: {msg.intent}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-400 animate-pulse" />
            <span>Bot sedang mengetik...</span>
          </div>
        )}
      </div>

      {/* Input dan quick actions */}
      <div className="border-t border-slate-200/80 px-4 py-3 bg-white/90">
        {error && (
          <div className="mb-2 rounded-lg bg-red-50 border border-red-100 px-3 py-1.5 text-[11px] text-red-600">
            {error}
          </div>
        )}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1.5 focus-within:ring-1 focus-within:ring-indigo-500/80">
              <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-xs text-slate-900 placeholder:text-slate-400"
                placeholder='Contoh: "Halo, rekomendasi parfum floral dong."'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:from-blue-700 hover:via-indigo-600 hover:to-fuchsia-600 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Mengirim..." : "Kirim"}
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {quickSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              disabled={loading}
              onClick={() => handleSend(suggestion)}
              className="text-[10px] rounded-full border border-slate-200 bg-white/80 px-2.5 py-1 text-slate-600 hover:bg-slate-50 disabled:opacity-60"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

