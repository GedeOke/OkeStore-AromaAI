export default function FeaturesSection() {
  const features = [
    {
      title: "Cek Status Pesanan",
      intent: "CHECK_STATUS",
      icon: "📦",
      toneClass: "border-amber-100 bg-amber-50/70",
      description:
        'Cukup kirim format seperti: "Cek pesanan #OKE1234" dan bot akan bantu cek status pengirimanmu.',
    },
    {
      title: "Rekomendasi Parfum",
      intent: "RECOMMENDATION",
      icon: "✨",
      toneClass: "border-pink-100 bg-pink-50/70",
      description:
        "Ceritakan preferensi kamu (manis, floral, fresh, woody, dll) dan bot akan memilihkan parfum yang pas.",
    },
    {
      title: "Info Produk Lengkap",
      intent: "INFO_PRODUCT",
      icon: "🧴",
      toneClass: "border-sky-100 bg-sky-50/70",
      description:
        "Tanya notes, tipe aroma, ukuran, hingga range harga produk parfum yang ada di OKE STORE.",
    },
    {
      title: "Komplain & Bantuan",
      intent: "COMPLAINT",
      icon: "💬",
      toneClass: "border-rose-100 bg-rose-50/70",
      description:
        "Sampaikan keluhan dengan sopan, dan bot akan memandu sesuai SOP customer service OKE STORE.",
    },
  ];

  return (
    <section aria-labelledby="features-heading">
      <h2
        id="features-heading"
        className="text-xl sm:text-2xl font-semibold text-slate-900"
      >
        Apa yang bisa dilakukan chatbot?
      </h2>
      <p className="mt-1.5 text-sm text-slate-600">
        OKE STORE Bot terhubung dengan data produk dan pesanan, sehingga bisa
        menjawab pertanyaanmu secara lebih akurat.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div
            key={feature.intent}
            className={`flex flex-col gap-2 rounded-2xl border bg-white shadow-sm px-4 py-3 ${feature.toneClass}`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-white/70 flex items-center justify-center text-lg">
                  <span aria-hidden>{feature.icon}</span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <span className="inline-flex items-center rounded-full border border-white/60 bg-white/70 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                Intent: {feature.intent}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

