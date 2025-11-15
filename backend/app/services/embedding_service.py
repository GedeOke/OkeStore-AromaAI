from google import genai
import os
from dotenv import load_dotenv
from app.core.exceptions import ServerError

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=API_KEY)


def embed_text(text: str) -> list[float]:
    """
    Embedding function for Google AI SDK (embed_content).
    WORKS with Ocan’s SDK version.
    """

    try:
        response = client.models.embed_content(
            model="text-embedding-004",   # <--- FIX MODEL NAME
            contents=[text]               # <--- MUST BE LIST OF STRINGS
        )

        return response.embeddings[0].values

    except Exception as e:
        raise ServerError(f"Embedding error: {e}")
