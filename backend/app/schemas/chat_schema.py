from pydantic import BaseModel, Field

class ChatRequest(BaseModel):
    message: str = Field(..., description="Pesan dari user.")
    session_id: str = Field("default", description="ID sesi percakapan user")

class ChatResponse(BaseModel):
    reply: str
    intent: str | None = None
    context_used: list | None = None
