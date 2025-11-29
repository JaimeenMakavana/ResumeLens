"""RAG chat endpoint."""
from fastapi import APIRouter, HTTPException, status

from app.api.dependencies import get_session_from_request_body
from app.api.models.rag import RAGRequest, RAGResponseModel
from app.core.exceptions import (
    ResumeLensException,
    SessionNotFoundError,
    EmbeddingGenerationError,
    LLMGenerationError,
)
from app.services.rag.pipeline import RAGPipeline
from app.utils.logger import logger

router = APIRouter()

# Create pipeline instance - recreate on each request to avoid caching issues
def get_rag_pipeline() -> RAGPipeline:
    """Get or create RAG pipeline instance."""
    logger.info("Creating new RAGPipeline instance")
    return RAGPipeline()

# Use function to get pipeline instead of global instance
# This ensures fresh instances and avoids caching


@router.post("/chat", response_model=RAGResponseModel)
async def rag_chat(request: RAGRequest) -> RAGResponseModel:
    """Complete RAG query pipeline."""
    try:
        # Validate session exists
        session = get_session_from_request_body(request)
        
        # Process RAG query - create fresh pipeline instance
        pipeline = get_rag_pipeline()
        logger.info(f"Using RAG pipeline with LLM client model: {pipeline.llm_client.model_name}")
        response = await pipeline.process_query(
            query=request.query,
            session_id=request.session_id,
            top_k=request.top_k,
        )

        return RAGResponseModel(
            answer=response.answer,
            sources=response.sources,
            confidence=response.confidence,
        )
    except SessionNotFoundError as e:
        logger.error(f"Session not found: {e}")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )
    except EmbeddingGenerationError as e:
        logger.error(f"Embedding generation failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate embedding: {str(e)}",
        )
    except LLMGenerationError as e:
        logger.error(f"LLM generation failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate response: {str(e)}",
        )
    except ResumeLensException as e:
        logger.error(f"ResumeLens error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )
    except Exception as e:
        logger.exception(f"Unexpected error in RAG chat: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Internal server error: {str(e)}",
        )

