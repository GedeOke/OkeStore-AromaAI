import ChatWindow from "../components/ChatWindow";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100/70 dark:bg-slate-950 p-3 md:p-6">
      <div className="w-full md:w-[480px]">
        <ChatWindow />
      </div>
    </div>
  );
}
