import { Moon, Sun } from "lucide-react";
import useDarkMode from "../hooks/useDarkMode";

export default function Header() {
  const [dark, setDark] = useDarkMode();

  return (
    <header className="flex justify-between items-center px-5 py-4 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 rounded-t-2xl backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-500 via-sky-400 to-teal-400 flex items-center justify-center shadow-md shadow-blue-500/30">
          <span className="text-white text-lg font-semibold">OA</span>
        </div>
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg text-slate-900 dark:text-slate-50 tracking-tight">
            OkeStore AromaAI
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Asisten belanja parfum & kebutuhan harian kamu
          </p>
        </div>
      </div>

      <button
        onClick={() => setDark(!dark)}
        aria-label="Toggle dark mode"
        className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm"
      >
        {dark ? (
          <Sun size={18} className="text-amber-400" />
        ) : (
          <Moon size={18} className="text-slate-600" />
        )}
      </button>
    </header>
  );
}
