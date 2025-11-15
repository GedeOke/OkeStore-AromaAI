SESSIONS = {}

def get_session(session_id: str):
    if session_id not in SESSIONS:
        SESSIONS[session_id] = {
            "history": [],
            "last_intent": None,
            "last_context": []
        }
    return SESSIONS[session_id]

def save_turn(session_id: str, user_msg: str, bot_msg: str, intent=None, context=None):
    session = get_session(session_id)

    session["history"].append({
        "user": user_msg,
        "bot": bot_msg
    })

    session["last_intent"] = intent
    session["last_context"] = context or []

def get_history_text(session_id: str) -> str:
    session = get_session(session_id)
    history = session["history"][-5:] 
    return "\n".join([f"User: {h['user']}\nBot: {h['bot']}" for h in history])
