export default function ChatBubble({ sender = "bot", text }) {
  const isUser = sender === "user";

  return (
    <div className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 max-w-[78%] rounded-2xl text-sm shadow-sm
        ${
          isUser
            ? "bg-gradient-to-br from-blue-600 to-sky-500 text-white rounded-br-md shadow-blue-500/30"
            : "bg-white/95 dark:bg-slate-800/95 text-slate-900 dark:text-slate-100 border border-slate-200/70 dark:border-slate-700/80 rounded-bl-md"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
