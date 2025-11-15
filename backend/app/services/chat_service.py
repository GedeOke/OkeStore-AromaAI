from app.core.logger import logger
from app.services.intent_service import detect_intent
from app.services.order_service import get_order_by_id
from app.services.rag_service import retrieve_context
from app.services.gemini_service import ask_gemini, build_prompt
from app.services.memory_service import get_session, save_turn, get_history_text
from app.core.exceptions import NotFound


def extract_order_id(message: str) -> str | None:
    words = message.upper().replace("#", "").split()
    for w in words:
        if w.startswith("ORD") and len(w) > 3:
            return w
    return None


async def process_chat(user_message: str, session_id: str):

    logger.info(f"Processing chat message: {user_message}")

    # ============================================================
    # LOAD MEMORY
    # ============================================================
    session = get_session(session_id)
    last_intent = session["last_intent"]
    last_context = session["last_context"]

    history_text = get_history_text(session_id)

    # ============================================================
    # INTENT DETECT
    # ============================================================
    intent = detect_intent(user_message)
    rag_context = []

    # Follow-up conversation memory
    if intent == "UNKNOWN" and last_intent in ["RECOMMENDATION", "INFO_PRODUCT"]:
        intent = last_intent
        rag_context = last_context

    # ============================================================
    # CHECK ORDER STATUS
    # ============================================================
    if intent == "CHECK_STATUS":
        order_id = extract_order_id(user_message)

        if not order_id:
            reply = (
                "Boleh bantu infokan nomor Order ID kamu? "
                "Contohnya: ORD0012 atau ORD1200."
            )
            save_turn(session_id, user_message, reply, intent, [])
            return reply, intent, []

        try:
            order = get_order_by_id(order_id)

            reply = (
                f"Berikut status pesanan kamu, {order['nama']}:\n\n"
                f"- Order ID: {order['order_id']}\n"
                f"- Produk: {order['produk']}\n"
                f"- Jumlah: {order['jumlah']}\n"
                f"- Kurir: {order['kurir']}\n"
                f"- Status: {order['status']}\n"
                f"- Tanggal beli: {order['tanggal_beli']}\n"
                f"- Tanggal kirim: {order['tanggal_kirim']}\n"
                f"- Estimasi sampai: {order['tanggal_sampai']}"
            )

            save_turn(session_id, user_message, reply, intent, [])
            return reply, intent, []

        except NotFound as e:
            reply = str(e)
            save_turn(session_id, user_message, reply, intent, [])
            return reply, intent, []

    # ============================================================
    # RAG: RECOMMENDATION + PRODUCT INFO
    # ============================================================
    if intent in ["RECOMMENDATION", "INFO_PRODUCT"]:

        if not rag_context:  
            rag_context = retrieve_context(user_message)

        prompt = build_prompt(
            user_message=user_message,
            history_text=history_text,
            context_docs=rag_context
        )

        llm_reply = ask_gemini(prompt)

        save_turn(session_id, user_message, llm_reply, intent, rag_context)

        return llm_reply, intent, rag_context

    # ============================================================
    # COMPLAINT
    # ============================================================
    if intent == "COMPLAINT":

        sop_context = [
            "SOP Penanganan Komplain OKE STORE:",
            "1. Dengarkan dengan empati.",
            "2. Minta maaf atas ketidaknyamanan.",
            "3. Minta bukti jika perlu.",
            "4. Tawarkan solusi: refund / replacement / voucher."
        ]

        prompt = build_prompt(
            user_message=user_message,
            history_text=history_text,
            context_docs=sop_context
        )

        llm_reply = ask_gemini(prompt)

        save_turn(session_id, user_message, llm_reply, intent, sop_context)

        return llm_reply, intent, sop_context

    # ============================================================
    # UNKNOWN
    # ============================================================
    prompt = build_prompt(
        user_message=user_message,
        history_text=history_text,
        context_docs=[]
    )

    llm_reply = ask_gemini(prompt)

    save_turn(session_id, user_message, llm_reply, "UNKNOWN", [])

    return llm_reply, "UNKNOWN", []
