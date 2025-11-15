import os
from dotenv import load_dotenv
from google import genai
from app.core.exceptions import ServerError
from app.core.logger import logger

# -------------------------------------------------------------------
# Load .env
# -------------------------------------------------------------------

load_dotenv()
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ServerError("GEMINI_API_KEY tidak ditemukan di .env")


# -------------------------------------------------------------------
# Init Gemini Client (API Studio 2025)
# -------------------------------------------------------------------

try:
    client = genai.Client(api_key=API_KEY)
except Exception as e:
    raise ServerError(f"Gagal inisialisasi Gemini Client: {e}")


# -------------------------------------------------------------------
# Gemini Chat Completion (API Studio 2025)
# -------------------------------------------------------------------

def ask_gemini(prompt: str) -> str:
    """
    Generate response dari Gemini dengan API Google AI Studio 2025.
    TIDAK ada temperature / config — langsung panggil generate_content.
    """
    try:
        logger.info("Mengirim permintaan ke Gemini API (Studio 2025)...")

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text.strip()

    except Exception as e:
        logger.exception("Gemini API Error")
        raise ServerError(f"Gagal memproses request Gemini: {e}")


# -------------------------------------------------------------------
# Prompt Builder
# -------------------------------------------------------------------

def build_prompt(user_message: str, history_text: str, context_docs: list[str]):
    
    context_block = (
        "\n\n-----\n".join(context_docs)
        if context_docs else "Tidak ada konteks tambahan."
    )

    prompt = f"""
[ROLE]
Anda adalah **OKE STORE Assistant**, asisten AI resmi untuk toko parfum OKE STORE.
Fokus Anda adalah membantu pelanggan memahami produk, rekomendasi parfum, dan informasi pesanan.

[CONTEXT – RAG]
Informasi berikut berasal dari database internal OKE STORE (hasil pencarian RAG):
{context_block}

[CONVERSATION HISTORY]
Riwayat percakapan terakhir antara pengguna dan asisten:
{history_text}

[USER MESSAGE]
{user_message}

[RESPONSE REQUIREMENTS]
- Jawab dengan sopan, profesional, dan mudah dipahami.
- Jika konteks RAG tersedia, gunakan itu sebagai sumber informasi utama.
- Gunakan RIWAYAT percakapan untuk memahami konteks follow-up.
- Jangan berhalusinasi: jika tidak tahu, katakan dengan sopan.
- Jika pertanyaan tidak relevan dengan parfum, produk, atau pesanan OKE STORE, jawab secara netral dan arahkan kembali ke topik toko.
- Jika user komplain, gunakan empati dan bantu arahkan solusi terbaik.
- Jangan membuat informasi produk yang tidak ada di konteks RAG.
- Jangan gunakan format markdown, tabel, point, bold, italic dalam jawaban.

[OUTPUT FORMAT]
Berikan jawaban final dalam Bahasa Indonesia yang natural, asik ber-emotikon dan ramah pelanggan.

"""

    return prompt.strip()
