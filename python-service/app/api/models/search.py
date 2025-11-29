"""Vector search API models."""
from pydantic import BaseModel, Field
from typing import List


class SearchResultModel(BaseModel):
    """Search result model for API responses."""

    chunk_id: str
    score: float
    chunk_text: str


class SearchRequest(BaseModel):
    """Request for vector search."""

    session_id: str
    query_embedding: List[float] = Field(..., description="Query embedding vector")
    top_k: int = Field(default=8, ge=1, le=50)


class SearchResponse(BaseModel):
    """Response with search results."""

    results: List[SearchResultModel]

