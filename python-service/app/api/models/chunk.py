"""Chunking API models."""
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class ChunkMetadataModel(BaseModel):
    """Chunk metadata model."""

    section: Optional[str] = None
    page_number: Optional[int] = None
    source_type: str = "resume"


class ChunkModel(BaseModel):
    """Chunk model for API responses."""

    id: str
    text: str
    index: int
    metadata: ChunkMetadataModel


class ChunkRequest(BaseModel):
    """Request to chunk text."""

    text: str = Field(..., min_length=1)
    session_id: str
    max_chunk_size: int = Field(default=1000, ge=100, le=2000)
    overlap: float = Field(default=0.25, ge=0.0, le=0.5)
    source_type: str = Field(default="resume", description="'resume' or 'jd'")
    metadata: Optional[dict] = None


class ChunkResponse(BaseModel):
    """Response with chunks."""

    chunks: List[ChunkModel]
    total_chunks: int

