# 🛍️ OKE STORE Chatbot API (RAG + Gemini)

![Python](https://img.shields.io/badge/Python-3.12+-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5%20Flash-4285F4?logo=google)
![RAG](https://img.shields.io/badge/RAG-ChromaDB-orange)
![Status](https://img.shields.io/badge/Status-Development-yellow)

Backend chatbot untuk **OKE STORE**, toko parfum online, dengan fitur:
- 💬 Chatbot customer service
- 🧠 RAG (Retrieval Augmented Generation) pakai **ChromaDB**
- 🤖 LLM **Google Gemini 2.5 Flash**
- 📦 Cek status pesanan dari file Excel
- 🧾 Rekomendasi & info produk parfum dari vectorstore

---

## ✨ Overview

Proyek ini adalah **API FastAPI** yang melayani chatbot e-commerce:

- `POST /api/v1/chat` → endpoint utama chatbot
- Menggunakan **intent detection** sederhana (rule-based) untuk:
  - `CHECK_STATUS` — cek status order dari Excel
  - `RECOMMENDATION` — rekomendasi parfum berdasarkan preferensi user
  - `INFO_PRODUCT` — detail produk parfum
  - `COMPLAINT` — tangani komplain dengan SOP internal
- RAG pakai:
  - Embedding dari `google.genai` (`text-embedding-004`)
  - Vectorstore `chromadb.PersistentClient` di `app/data/chroma_db`
- Memory percakapan disimpan **in-memory** per `session_id`

---

## 🧱 Arsitektur Singkat

Beberapa file penting:

- `backend/app/main.py`  
  Inisialisasi FastAPI, CORS, registrasi router:
  - `app.api.v1.chat` → `/api/v1/chat`
  - `app.routers.rag_router` → `/api/v1/rag/populate`
- `backend/app/api/v1/chat.py`  
  Endpoint `POST /api/v1/chat` yang memanggil `process_chat`.
- `backend/app/services/chat_service.py`  
  Orkestrator utama:
  - Load memory percakapan
  - Deteksi intent
  - Ambil status order (jika perlu)
  - Panggil RAG + Gemini
  - Simpan history.
- `backend/app/services/intent_service.py`  
  Rule-based intent detection berdasarkan keyword bahasa Indonesia.
- `backend/app/services/order_service.py`  
  Baca `app/data/oke_store_orders.xlsx` dengan `pandas` dan cari order by ID.
- `backend/app/services/product_loader.py`  
  Baca `app/data/oke_store_products.xlsx` dan generate teks deskripsi produk.
- `backend/app/services/embedding_service.py`  
  Panggil `google.genai` untuk membuat embedding (`text-embedding-004`).
- `backend/app/services/rag_service.py`  
  Inisialisasi ChromaDB, populate koleksi produk, dan retrieve konteks.
- `backend/app/services/gemini_service.py`  
  Client Gemini 2.5 Flash + builder prompt custom OKE STORE.
- `backend/app/services/memory_service.py`  
  In-memory session (`SESSIONS`) dengan riwayat 5 percakapan terakhir.
- `backend/app/core/logger.py`  
  Global logger format rapi.
- `backend/app/core/exceptions.py`  
  Custom HTTPException (BadRequest, NotFound, ServerError, dll).
- `backend/app/schemas/chat_schema.py`  
  Pydantic models untuk request/response.

---

## 📁 Struktur Proyek

Struktur utama (disederhanakan):

```text
chatbot_ecommerce/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   │   └── v1/
│   │   │       └── chat.py
│   │   ├── core/
│   │   │   ├── exceptions.py
│   │   │   └── logger.py
│   │   ├── data/
│   │   │   ├── oke_store_orders.xlsx
│   │   │   ├── oke_store_products.xlsx
│   │   │   └── chroma_db/        # vectorstore (generated)
│   │   ├── routers/
│   │   │   └── rag_router.py
│   │   ├── schemas/
│   │   │   └── chat_schema.py
│   │   └── services/
│   │       ├── chat_service.py
│   │       ├── embedding_service.py
│   │       ├── gemini_service.py
│   │       ├── intent_service.py
│   │       ├── memory_service.py
│   │       ├── order_service.py
│   │       ├── product_loader.py
│   │       └── rag_service.py
│   └── test_gemini_api.py
└── .env        # GEMINI_API_KEY (JANGAN DI-PUSH KE GIT)
```

---

## ⚙️ Setup & Instalasi

> Pastikan Python **3.12+** (atau versi yang kompatibel) sudah terinstall.

1. **Clone repo & masuk folder**

   ```bash
   git clone <url-repo-kamu>.git
   cd chatbot_ecommerce
   ```

2. **Buat virtual environment (opsional tapi direkomendasikan)**

   ```bash
   python -m venv .venv
   .venv\Scripts\activate   # Windows
   # source .venv/bin/activate  # Mac / Linux
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Siapkan file `.env` (di root project)**

   > Penting: JANGAN commit API key ke GitHub.

   ```env
   GEMINI_API_KEY=your-google-gemini-api-key
   ```

5. **Pastikan data Excel tersedia**

   - `backend/app/data/oke_store_products.xlsx`
   - `backend/app/data/oke_store_orders.xlsx`

---

## 🚀 Menjalankan Aplikasi

1. Pindah ke folder backend:

   ```bash
   cd backend
   ```

2. Jalankan FastAPI dengan Uvicorn:

   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

3. API akan tersedia di:

   - Base URL: `http://localhost:8000/`
   - Docs Swagger: `http://localhost:8000/docs`
   - Docs ReDoc: `http://localhost:8000/redoc`

---

## 📡 Endpoint Utama

### 1. Health check

- **GET** `/`
- Response:

  ```json
  { "message": "OKE STORE Chatbot API running" }
  ```

---

### 2. Chatbot

- **POST** `/api/v1/chat`
- Body (`ChatRequest`):

  ```json
  {
    "message": "Halo, rekomendasi parfum floral dong",
    "session_id": "user-123"
  }
  ```

- Response (`ChatResponse`):

  ```json
  {
    "reply": "teks jawaban dari chatbot",
    "intent": "RECOMMENDATION",
    "context_used": [
      "dokumen konteks dari RAG..."
    ]
  }
  ```

---

### 3. Populate RAG (produk → vectorstore)

- **POST** `/api/v1/rag/populate`
- Fungsi:
  - Baca Excel `oke_store_products.xlsx`.
  - Generate teks deskripsi setiap produk.
  - Embed dengan Gemini (`text-embedding-004`).
  - Simpan ke koleksi ChromaDB `oke_store_products`.

---

## 📌 Catatan Penting

- **Session memory** disimpan di memory Python (`SESSIONS`), jadi:
  - Restart server = history hilang.
  - Kalau mau production, sebaiknya pindah ke Redis / DB.
- **ChromaDB** disimpan di `backend/app/data/chroma_db/`. Folder ini **sebaiknya di-ignore** di Git (.gitignore).
- Jangan pernah push `.env` yang berisi **API key asli** ke GitHub public.

---

## 🔮 Ide Pengembangan Lanjutan

- 🔐 Tambah autentikasi (API key / JWT) untuk endpoint sensitif.
- 🗃️ Pindahkan session & log ke database (PostgreSQL / Redis).
- 📊 Tambah dashboard monitoring (request, intent, konversi, dsb).
- 🌐 Tambah frontend chat UI (React / Next.js) yang consume API ini.
- 🧠 Fine-tuning prompt & RAG agar lebih “brand voice” OKE STORE.

---

Made with ❤️ for OKE STORE.

