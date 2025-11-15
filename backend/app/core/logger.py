import logging

# -------------------------------------------------------------------
# Konfigurasi logging global
# -------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

# Logger utama aplikasi
logger = logging.getLogger("oke_store_chatbot")
