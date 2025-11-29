"""Custom exceptions for ResumeLens service."""


class ResumeLensException(Exception):
    """Base exception for ResumeLens service."""

    pass


class SessionNotFoundError(ResumeLensException):
    """Raised when session doesn't exist or expired."""

    def __init__(self, session_id: str):
        self.session_id = session_id
        super().__init__(f"Session not found or expired: {session_id}")


class EmbeddingGenerationError(ResumeLensException):
    """Raised when embedding generation fails."""

    pass


class LLMGenerationError(ResumeLensException):
    """Raised when LLM generation fails."""

    pass


class DocumentProcessingError(ResumeLensException):
    """Raised when document processing fails."""

    pass


class ChunkingError(ResumeLensException):
    """Raised when chunking fails."""

    pass

