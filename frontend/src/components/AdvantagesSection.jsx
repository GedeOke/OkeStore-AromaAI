export default function AdvantagesSection() {
  const advantages = [
    "Didukung RAG dengan ChromaDB – jawaban lebih relevan dan kontekstual.",
    "Terhubung ke data produk & pesanan OKE STORE secara langsung.",
    "Pakai Google Gemini 2.5 Flash untuk respon yang cepat dan natural.",
    "History percakapan per session_id sehingga obrolan terasa lebih nyambung.",
  ];

  return (
    <section aria-labelledby="advantages-heading">
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-50 px-5 py-6 sm:px-6 sm:py-7 shadow-xl">
        <h2
          id="advantages-heading"
          className="text-xl font-semibold mb-3 text-white"
        >
          Keunggulan OKE STORE Chatbot
        </h2>
        <p className="text-sm text-slate-300 mb-4">
          Dibangun khusus untuk kebutuhan toko parfum online OKE STORE,
          sehingga lebih paham apa yang kamu cari.
        </p>

        <ul className="space-y-2 text-sm">
          {advantages.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 h-4 w-4 flex items-center justify-center rounded-full bg-emerald-500 text-[10px] font-semibold">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

