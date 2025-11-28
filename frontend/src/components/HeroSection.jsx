export default function HeroSection() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 items-center">
      <div className="space-y-5">
        <p className="inline-flex items-center rounded-full bg-sky-50 text-sky-700 text-xs font-medium px-3 py-1 border border-sky-100 shadow-sm">
          Chatbot OKE STORE · 24/7
        </p>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            Chatbot Parfum OKE STORE – Teman Belanja Parfum 24/7
          </h1>
          <p className="text-sm sm:text-base leading-relaxed text-slate-600">
            Tanyakan apa saja seputar parfum dan pesanan di OKE STORE. Bot kami
            bisa bantu cek status pesanan, kasih rekomendasi parfum sesuai
            selera, jelaskan detail produk, sampai bantu proses komplain dengan
            sopan.
          </p>
        </div>

        <ul className="text-sm text-slate-700 space-y-1.5">
          <li>• Cek status pesanan hanya dengan ID pesanan.</li>
          <li>• Rekomendasi parfum berdasarkan aroma favorit kamu.</li>
          <li>• Informasi lengkap notes, tipe aroma, dan ukuran.</li>
          <li>• Komplain dan bantuan sesuai SOP tim OKE STORE.</li>
        </ul>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="#chat"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-fuchsia-500 text-white text-sm font-medium shadow-md hover:from-blue-700 hover:via-indigo-600 hover:to-fuchsia-600 transition-colors"
          >
            Mulai Chat Sekarang
          </a>
          <span className="text-xs text-slate-500">
            Tidak perlu install apa pun · langsung chat di browser
          </span>
        </div>
      </div>

      <div className="hidden lg:flex justify-end">
        <div className="relative w-full max-w-md">
          <div className="absolute -inset-2 bg-gradient-to-br from-sky-100 via-indigo-100 to-rose-100 rounded-3xl blur-xl opacity-80" />
          <div className="relative rounded-3xl bg-white shadow-xl border border-slate-100 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">OKE STORE · Chatbot</p>
                <p className="text-sm font-semibold text-slate-900">
                  Asisten belanja parfum kamu
                </p>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-lg">
                💬
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-start">
                <div className="max-w-[75%] rounded-2xl rounded-bl-md bg-slate-50 border border-slate-100 px-3 py-2 text-slate-700">
                  Hai! Aku bot OKE STORE. Mau cek pesanan, cari rekomendasi
                  parfum, atau tanya detail produk?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[70%] rounded-2xl rounded-br-md bg-blue-600 text-white px-3 py-2">
                  Rekomendasi parfum floral yang soft dong.
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-slate-900 text-slate-50 px-3 py-2">
                  Siap! Ada beberapa parfum floral manis yang cocok untuk daily
                  use. Mau yang budget friendly atau premium?
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

