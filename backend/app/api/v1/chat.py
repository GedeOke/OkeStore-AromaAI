from fastapi import APIRouter, HTTPException
from app.schemas.chat_schema import ChatRequest, ChatResponse
from app.services.chat_service import process_chat
from app.core.logger import logger

router = APIRouter(tags=["Chatbot"])


@router.post("/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    """
    Endpoint utama untuk chatbot OKE STORE.
    """

    try:
        logger.info(f"[REQUEST] User message: {req.message} | Session: {req.session_id}")

        reply, intent, context_docs = await process_chat(req.message, req.session_id)

        logger.info(f"[REPLY] Intent={intent} | Text={reply[:50]}...")

        return ChatResponse(
            reply=reply,
            intent=intent,
            context_used=context_docs
        )

    except HTTPException as e:
        logger.error(f"[HTTP ERROR] {e.detail}")
        raise e

    except Exception as e:
        logger.exception("[INTERNAL ERROR]")
        raise HTTPException(
            status_code=500,
            detail="Terjadi kesalahan internal pada server."
        )
