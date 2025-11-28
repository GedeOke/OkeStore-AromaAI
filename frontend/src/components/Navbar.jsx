export default function Navbar() {
  const links = [
    { href: "#beranda", label: "Beranda" },
    { href: "#cara-pakai", label: "Cara Pakai" },
    { href: "#keunggulan", label: "Keunggulan" },
    { href: "#kontak", label: "Kontak" },
  ];

  return (
    <header className="border-b border-slate-200/70 bg-white/80 backdrop-blur-lg sticky top-0 z-20">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold text-white shadow-sm shadow-blue-500/40">
            O
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight text-slate-900">
              OKE STORE
            </span>
            <span className="text-[11px] text-slate-500">
              Chatbot Parfum Online
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-600 hover:text-slate-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#chat"
          className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 text-white text-xs font-medium px-3 py-1.5 hover:from-blue-700 hover:via-indigo-600 hover:to-fuchsia-600 shadow-sm"
        >
          Mulai Chat
        </a>
      </nav>
    </header>
  );
}
