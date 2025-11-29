"""Text chunking service."""
import uuid
from typing import List, Optional

from app.core.config import settings
from app.types.chunk import Chunk, ChunkMetadata
from app.utils.logger import logger


class ChunkerService:
    """Service for chunking text with overlap."""

    def chunk(
        self,
        text: str,
        max_size: int | None = None,
        overlap: float | None = None,
        metadata: Optional[dict] = None,
    ) -> List[Chunk]:
        """
        Split text into chunks with overlap.
        Preserve metadata (section, page, source type).
        """
        max_size = max_size or settings.default_chunk_size
        overlap = overlap or settings.default_overlap

        if not text or len(text) <= max_size:
            # Single chunk
            chunk_metadata = ChunkMetadata(
                section=metadata.get("section") if metadata else None,
                page_number=metadata.get("page_number") if metadata else None,
                source_type=metadata.get("source_type", "resume")
                if metadata
                else "resume",
            )
            return [
                Chunk(
                    id=str(uuid.uuid4()),
                    text=text,
                    index=0,
                    metadata=chunk_metadata,
                )
            ]

        chunks: List[Chunk] = []
        overlap_size = int(max_size * overlap)
        start = 0
        index = 0

        while start < len(text):
            end = start + max_size

            # Try to break at word boundary
            if end < len(text):
                # Look for last space before end
                last_space = text.rfind(" ", start, end)
                if last_space > start:
                    end = last_space + 1

            chunk_text = text[start:end].strip()

            if chunk_text:
                chunk_metadata = ChunkMetadata(
                    section=metadata.get("section") if metadata else None,
                    page_number=metadata.get("page_number") if metadata else None,
                    source_type=metadata.get("source_type", "resume")
                    if metadata
                    else "resume",
                )

                chunks.append(
                    Chunk(
                        id=str(uuid.uuid4()),
                        text=chunk_text,
                        index=index,
                        metadata=chunk_metadata,
                    )
                )
                index += 1

            # Move start with overlap
            start = end - overlap_size
            if start >= len(text):
                break

        logger.info(f"Created {len(chunks)} chunks from text")
        return chunks

