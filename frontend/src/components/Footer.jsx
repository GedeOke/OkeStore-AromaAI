export default function Footer() {
  const socials = [
    { label: "Instagram", short: "IG", href: "#" },
    { label: "WhatsApp", short: "WA", href: "#" },
    { label: "Tokopedia", short: "Tkp", href: "#" },
    { label: "Shopee", short: "Shp", href: "#" },
  ];

  return (
    <footer
      id="kontak"
      className="border-t border-slate-200/80 bg-white/90 mt-8 sm:mt-10 backdrop-blur"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs sm:text-sm text-slate-500">
          © {new Date().getFullYear()} OKE STORE Chatbot. All rights reserved.
        </p>

        <div className="flex items-center gap-2">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="inline-flex items-center justify-center h-7 w-7 rounded-full border border-slate-200 text-[11px] text-slate-600 hover:bg-slate-50"
              aria-label={item.label}
            >
              {item.short}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

