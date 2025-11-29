"""RAG API models."""
from pydantic import BaseModel, Field

from app.types.rag import RAGResponse


class RAGRequest(BaseModel):
    """Request for RAG query."""

    session_id: str
    query: str = Field(..., min_length=1)
    top_k: int = Field(default=8, ge=1, le=50)


class RAGResponseModel(BaseModel):
    """RAG response model (matches RAGResponse from types)."""

    answer: str
    sources: list[str]
    confidence: float

