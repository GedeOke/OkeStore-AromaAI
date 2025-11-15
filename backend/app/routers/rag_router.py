from fastapi import APIRouter, HTTPException
from app.services.rag_service import populate_products
from app.core.logger import logger

router = APIRouter(tags=["RAG"])


@router.post("/rag/populate")
async def populate_rag_endpoint():
    """
    Populate ulang database RAG dari data produk Excel.
    """
    try:
        logger.info("[RAG] Populate dimulai...")

        total = populate_products()

        logger.info(f"[RAG] Berhasil populate {total} produk ke vectorstore.")

        return {
            "status": "success",
            "message": f"Berhasil populate {total} produk.",
            "count": total
        }

    except Exception as e:
        logger.exception("[RAG] Gagal populate RAG")
        raise HTTPException(status_code=500, detail=str(e))
