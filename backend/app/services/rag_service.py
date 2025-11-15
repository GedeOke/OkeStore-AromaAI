from chromadb import PersistentClient
from app.core.exceptions import ServerError
from app.services.embedding_service import embed_text
from app.services.product_loader import load_products


# --------------------------------------------------
# Init Chroma Client
# --------------------------------------------------

try:
    client = PersistentClient(path="app/data/chroma_db")
except Exception as e:
    raise ServerError(f"Gagal inisialisasi ChromaDB: {e}")


# --------------------------------------------------
# Create Collection
# --------------------------------------------------

try:
    collection = client.get_or_create_collection(
        name="oke_store_products",
        metadata={"hnsw:space": "cosine"}  
    )
except Exception as e:
    raise ServerError(f"Gagal membuat koleksi Chroma: {e}")


# --------------------------------------------------
# Populate Product Embeddings
# --------------------------------------------------

def populate_products() -> int:
    try:
        docs = load_products()
        ids = [f"prod_{i}" for i in range(len(docs))]

        # Clear old data (Chroma v0.5+)
        try:
            collection.delete_all()
        except:
            # fallback untuk kompatibilitas
            collection.delete(where={"id": {"$ne": ""}})

        embeddings = [embed_text(doc) for doc in docs]

        collection.add(
            ids=ids,
            documents=docs,
            embeddings=embeddings
        )

        return len(docs)

    except Exception as e:
        raise ServerError(f"Gagal populate produk ke RAG: {e}")



# --------------------------------------------------
# RAG Retriever
# --------------------------------------------------

def retrieve_context(query: str, k: int = 3) -> list[str]:
    try:
        query_emb = embed_text(query)

        results = collection.query(
            query_embeddings=[query_emb],
            n_results=k
        )

        return results.get("documents", [[]])[0]

    except Exception as e:
        raise ServerError(f"RAG retrieval error: {e}")


def test_rag():
    return retrieve_context("parfum lembut floral")
