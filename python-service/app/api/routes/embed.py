"""Embedding generation endpoint."""
from fastapi import APIRouter, HTTPException, status

from app.api.dependencies import get_session_from_request_body
from app.api.models.embed import EmbedRequest, EmbedResponse
from app.services.embedding.generator import EmbeddingService
from app.utils.logger import logger

router = APIRouter()
embedding_service = EmbeddingService()


@router.post("/", response_model=EmbedResponse)
async def generate_embeddings(
    request: EmbedRequest
) -> EmbedResponse:
    """Generate embeddings for chunks."""
    # Get session from request body
    session = get_session_from_request_body(request)
    
    try:
        # Generate embeddings for all chunks
        texts = [chunk.text for chunk in request.chunks]
        embeddings = await embedding_service.generate_embeddings_batch(texts)

        # Convert Pydantic models to Chunk dataclasses for storage
        from app.types.chunk import Chunk, ChunkMetadata
        stored_chunks = [
            Chunk(
                id=chunk.id,
                text=chunk.text,
                index=chunk.index,
                metadata=ChunkMetadata(
                    section=chunk.metadata.section,
                    page_number=chunk.metadata.page_number,
                    source_type=chunk.metadata.source_type,
                ),
            )
            for chunk in request.chunks
        ]

        # Store embeddings in session
        session.embeddings = embeddings
        session.chunks = stored_chunks

        logger.info(
            f"Generated {len(embeddings)} embeddings for session {request.session_id}"
        )

        return EmbedResponse(success=True, embedding_count=len(embeddings))
    except Exception as e:
        logger.error(f"Embedding generation failed: {e}")
        error_str = str(e)
        
        # Check for quota errors and return appropriate status code
        if "quota" in error_str.lower() or "429" in error_str or "rate limit" in error_str.lower():
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail={
                    "error": "API quota exceeded",
                    "message": (
                        "You've exceeded your Gemini API quota for embedding requests. "
                        "The free tier has limited requests per day/minute. "
                        "Please wait a few minutes and try again, or upgrade your API plan at "
                        "https://ai.google.dev/pricing"
                    ),
                    "details": error_str[:500],  # Limit detail length
                }
            )
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate embeddings: {error_str}",
        )

