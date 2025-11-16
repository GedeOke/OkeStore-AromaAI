import { useState, useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble";
import Header from "./Header";
import { sendChat } from "../lib/api";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const chatRef = useRef(null);

  // Auto scroll ke bawah setiap ada pesan baru
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Masukkan pesan user ke layar
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const userInput = input;
    setInput("");
    setLoading(true);

    // Panggil API lewat wrapper sendChat()
    const data = await sendChat(userInput, "frontend-client");

    const botMsg = { sender: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);

    setLoading(false);
  };

  return (
    <div className="w-full max-w-lg h-[620px] md:h-[640px] rounded-2xl shadow-[0_18px_60px_rgba(15,23,42,0.25)] bg-white/95 dark:bg-slate-950/95 border border-slate-100/80 dark:border-slate-800/80 flex flex-col overflow-hidden">
      {/* Header */}
      <Header />

      {/* Chat area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto chat-scroll px-4 py-3 bg-slate-50/80 dark:bg-slate-900/80"
      >
        {messages.length === 0 && !loading && (
          <div className="mt-7 mb-4 flex flex-col items-center text-center text-xs text-slate-500 dark:text-slate-400">
            <p className="font-medium text-slate-600 dark:text-slate-200 text-sm mb-1">
              Selamat datang di OkeStore AromaAI
            </p>
            <p>Contoh pertanyaan yang bisa kamu coba:</p>
            <ul className="mt-3 space-y-1">
              <li className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 inline-flex text-[11px]">
                "Rekomendasi parfum pria untuk kantor dong"
              </li>
              <li className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 inline-flex text-[11px]">
                "Cek status pesanan saya nomor #12345"
              </li>
              <li className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 inline-flex text-[11px]">
                "Ada promo apa untuk body care hari ini?"
              </li>
            </ul>
          </div>
        )}

        {messages.map((msg, index) => (
          <ChatBubble key={index} sender={msg.sender} text={msg.text} />
        ))}

        {loading && (
          <div className="mt-2 text-slate-400 dark:text-slate-300 text-xs animate-pulse">
            Bot sedang mengetik...
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="p-3 border-t border-slate-100/90 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95">
        <div className="flex items-end gap-2">
          <div className="flex-1 flex flex-col gap-1">
            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700/80 px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500/70">
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                placeholder="Tulis pesanmu di sini..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 pl-1">
              Tekan Enter untuk kirim pesan
            </p>
          </div>

          <button
            onClick={sendMessage}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 text-white rounded-xl hover:from-blue-700 hover:via-sky-600 hover:to-teal-500 text-xs font-medium shadow-md shadow-blue-500/30 disabled:opacity-60 disabled:shadow-none"
            disabled={loading || !input.trim()}
          >
            {loading ? "Mengirim..." : "Kirim"}
          </button>
        </div>
      </div>
    </div>
  );
}
