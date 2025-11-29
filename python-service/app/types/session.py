"""Session type definitions."""
from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional

from app.types.chunk import Chunk
from app.types.embedding import EmbeddingVector


@dataclass
class Session:
    """Session data structure for in-memory storage."""

    session_id: str
    chunks: List[Chunk]
    embeddings: List[EmbeddingVector]
    source_type: str  # "resume" | "jd"
    created_at: datetime
    expires_at: datetime

    def is_expired(self) -> bool:
        """Check if session has expired."""
        return datetime.now() > self.expires_at

