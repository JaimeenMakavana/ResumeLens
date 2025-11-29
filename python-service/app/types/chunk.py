"""Chunk type definitions."""
from dataclasses import dataclass
from typing import Optional


@dataclass
class ChunkMetadata:
    """Metadata for a text chunk."""

    section: Optional[str] = None
    page_number: Optional[int] = None
    source_type: str = "resume"  # "resume" | "jd"


@dataclass
class Chunk:
    """Text chunk with metadata."""

    id: str
    text: str
    index: int
    metadata: ChunkMetadata

