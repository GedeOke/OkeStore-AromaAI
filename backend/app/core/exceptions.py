from fastapi import HTTPException


class BadRequest(HTTPException):
    """
    Error untuk request user yang tidak valid.
    Contoh: message kosong, format salah, input tidak sesuai.
    """
    def __init__(self, message: str = "Bad Request"):
        super().__init__(status_code=400, detail=message)


class Unauthorized(HTTPException):
    """
    Error untuk masalah autentikasi (kalau nanti dibutuhkan).
    """
    def __init__(self, message: str = "Unauthorized"):
        super().__init__(status_code=401, detail=message)


class Forbidden(HTTPException):
    """
    Error untuk akses yang dilarang.
    """
    def __init__(self, message: str = "Forbidden"):
        super().__init__(status_code=403, detail=message)


class NotFound(HTTPException):
    """
    Error untuk resource yang tidak ditemukan.
    Digunakan untuk Order ID yang tidak ada.
    """
    def __init__(self, message: str = "Not Found"):
        super().__init__(status_code=404, detail=message)


class ServerError(HTTPException):
    """
    Error internal server — jika ada error tak terduga.
    Digunakan untuk Gemini API, RAG, database, dll.
    """
    def __init__(self, message: str = "Internal Server Error"):
        super().__init__(status_code=500, detail=message)
