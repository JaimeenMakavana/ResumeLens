"""RAG type definitions."""
from dataclasses import dataclass
from typing import List


@dataclass
class SearchResult:
    """Result from vector search."""

    chunk_id: str
    score: float
    chunk_text: str


@dataclass
class RAGResponse:
    """Response from RAG pipeline."""

    answer: str
    sources: List[str]  # Chunk IDs
    confidence: float

