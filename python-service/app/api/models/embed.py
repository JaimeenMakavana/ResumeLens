"""Embedding API models."""
from pydantic import BaseModel, Field
from typing import List

from app.api.models.chunk import ChunkModel


class EmbedRequest(BaseModel):
    """Request to generate embeddings."""

    session_id: str
    chunks: List[ChunkModel]


class EmbedResponse(BaseModel):
    """Response with embeddings."""

    success: bool
    embedding_count: int

