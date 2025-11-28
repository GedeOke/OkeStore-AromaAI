export default function HowToSection() {
  const steps = [
    {
      title: "Langkah 1",
      description:
        "Tulis pertanyaan atau kebutuhanmu di kolom chat, misalnya ingin cari parfum baru atau tanya promo.",
    },
    {
      title: "Langkah 2",
      description:
        'Untuk cek status pesanan, gunakan format seperti: "Cek pesanan #OKE1234" atau kirim ID pesananmu.',
    },
    {
      title: "Langkah 3",
      description:
        "Untuk rekomendasi parfum, jelaskan preferensi aroma kamu: manis, floral, fresh, woody, atau lainnya.",
    },
  ];

  return (
    <section aria-labelledby="howto-heading" className="bg-white rounded-3xl border border-slate-100 shadow-sm px-5 py-5 sm:px-6 sm:py-6">
      <h2
        id="howto-heading"
        className="text-xl font-semibold text-slate-900 mb-2"
      >
        Cara Pakai Chatbot OKE STORE
      </h2>
      <p className="text-sm text-slate-600 mb-4">
        Ikuti langkah sederhana ini untuk memaksimalkan bantuan dari chatbot
        OKE STORE.
      </p>

      <ol className="space-y-3 text-sm text-slate-700">
        {steps.map((step) => (
          <li
            key={step.title}
            className="flex items-start gap-3 rounded-2xl bg-slate-50 px-3 py-2.5"
          >
            <div className="mt-0.5 h-6 w-6 flex items-center justify-center rounded-full bg-blue-600 text-white text-xs font-semibold">
              {step.title.split(" ")[1]}
            </div>
            <p className="leading-relaxed">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

