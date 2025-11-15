from app.core.logger import logger

# Mapping kata kunci → intent
INTENT_KEYWORDS = {
    "CHECK_STATUS": [
        "status", "order", "pesanan", "cek pesanan", 
        "tracking", "nomor pesanan", "resi"
    ],
    "RECOMMENDATION": [
        "rekomendasi", "saran", "reco", "pilihan parfum",
        "parfum apa", "bagus mana"
    ],
    "INFO_PRODUCT": [
        "detail", "info parfum", "aroma", "ketahanan", 
        "harga parfum", "tipe parfum", "cocok untuk apa"
    ],
    "COMPLAINT": [
        "komplain", "keluhan", "rusak", "tidak puas",
        "bocor", "penipuan", "salah kirim"
    ],
}


def detect_intent(message: str) -> str:
    """
    Menentukan intent berdasarkan rule-based keyword matching.
    """

    msg = message.lower()

    logger.info(f"Deteksi intent untuk pesan: {msg}")

    # Cek setiap intent berdasarkan keywords
    for intent, keywords in INTENT_KEYWORDS.items():
        if any(kw in msg for kw in keywords):
            logger.info(f"Intent terdeteksi: {intent}")
            return intent

    logger.info("Intent terdeteksi: UNKNOWN")
    return "UNKNOWN"
