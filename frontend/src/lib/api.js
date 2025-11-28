const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

/**
 * Service untuk memanggil endpoint chatbot FastAPI.
 * Request: { message, session_id }
 * Response: { reply, intent, context_used }
 */
export async function sendChat(message, sessionId) {
  const trimmed = message?.trim();

  if (!trimmed) {
    throw new Error("Pesan tidak boleh kosong.");
  }

  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: trimmed,
        session_id: sessionId,
      }),
    });

    if (!response.ok) {
      let detail = "Terjadi kesalahan pada server.";

      try {
        const errorData = await response.json();
        if (errorData?.detail) {
          detail = errorData.detail;
        }
      } catch {
        // Abaikan jika parsing error body gagal
      }

      throw new Error(detail);
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw new Error("Terjadi kesalahan, coba lagi nanti.");
  }
}

