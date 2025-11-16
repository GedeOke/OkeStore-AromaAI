const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function sendChat(message, sessionId = "frontend") {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        session_id: sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    return await response.json();
  } catch (err) {
    console.error("API error:", err);
    return {
      reply: "⚠️ Tidak dapat menghubungi server.",
      intent: "ERROR",
      context_used: [],
    };
  }
}
