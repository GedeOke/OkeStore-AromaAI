from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.chat import router as chat_router
from app.core.logger import logger
from app.routers.rag_router import router as rag_router


def create_app() -> FastAPI:
    app = FastAPI(
        title="OKE STORE Chatbot API",
        version="1.0.0",
        description="Chatbot dengan RAG + Gemini"
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register routes
    app.include_router(chat_router, prefix="/api/v1")

    return app


app = create_app()
app.include_router(rag_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"message": "OKE STORE Chatbot API running"}
