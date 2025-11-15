import re
from app.core.logger import logger


# ============================
# Keyword Mapping
# ============================
INTENT_KEYWORDS = {
    "CHECK_STATUS": [
        "status", "order", "cek pesanan", "tracking",
        "nomor pesanan", "resi", "lacak"
    ],
    "RECOMMENDATION": [
        "rekomendasi", "saran", "reco", "pilihan parfum",
        "parfum apa", "bagus mana", "cocok parfum", "parfum cocok"
    ],
    "INFO_PRODUCT": [
        "detail", "info parfum", "aroma", "ketahanan",
        "harga parfum", "tipe parfum", "cocok untuk apa",
        "deskripsi parfum", "tentang parfum"
    ],
    "COMPLAINT": [
        "komplain", "keluhan", "rusak", "tidak puas",
        "bocor", "salah kirim", "penipuan", "kecewa"
    ],
}


# ============================
# Fungsi Utama
# ============================

def detect_intent(message: str) -> str:
    """
    Rule-based intent detection.
    Bersih, mudah dibaca, dan mendukung Order ID detection (ORDxxxx).
    """

    try:
        msg = message.lower().strip()
        logger.info(f"Deteksi intent untuk pesan: {msg}")

        # --------------------------------------------------
        # 1. DETEKSI ORDER ID LANGSUNG (Paling Prioritas)
        # --------------------------------------------------
        # Pola: ORD0001, ord234, ORD999999
        if re.search(r"\bord\d{3,6}\b", msg):
            logger.info("Intent terdeteksi via regex: CHECK_STATUS (Order ID)")
            return "CHECK_STATUS"

        # --------------------------------------------------
        # 2. DETEKSI BERDASARKAN KEYWORD
        # --------------------------------------------------
        for intent, keywords in INTENT_KEYWORDS.items():
            if any(kw in msg for kw in keywords):
                logger.info(f"Intent terdeteksi via keywords: {intent}")
                return intent

        # --------------------------------------------------
        # 3. DEFAULT: UNKNOWN
        # --------------------------------------------------
        logger.info("Intent terdeteksi: UNKNOWN")
        return "UNKNOWN"

    except Exception as e:
        logger.exception("Error saat mendeteksi intent")
        return "UNKNOWN"
