"""Chunking endpoint."""
from fastapi import APIRouter

from app.api.models.chunk import (
    ChunkModel,
    ChunkMetadataModel,
    ChunkRequest,
    ChunkResponse,
)
from app.services.chunking.chunker import ChunkerService

router = APIRouter()
chunker_service = ChunkerService()


@router.post("/", response_model=ChunkResponse)
async def chunk_text(request: ChunkRequest) -> ChunkResponse:
    """Chunk text with metadata."""
    metadata = request.metadata or {}
    metadata["source_type"] = request.source_type

    chunks = chunker_service.chunk(
        text=request.text,
        max_size=request.max_chunk_size,
        overlap=request.overlap,
        metadata=metadata,
    )

    # Convert dataclass chunks to Pydantic models
    chunk_models = [
        ChunkModel(
            id=chunk.id,
            text=chunk.text,
            index=chunk.index,
            metadata=ChunkMetadataModel(
                section=chunk.metadata.section,
                page_number=chunk.metadata.page_number,
                source_type=chunk.metadata.source_type,
            ),
        )
        for chunk in chunks
    ]

    return ChunkResponse(chunks=chunk_models, total_chunks=len(chunk_models))

