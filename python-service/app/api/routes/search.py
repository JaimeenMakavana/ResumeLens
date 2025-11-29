"""Vector search endpoint."""
from fastapi import APIRouter

from app.api.dependencies import get_session_from_request_body
from app.api.models.search import (
    SearchRequest,
    SearchResponse,
    SearchResultModel,
)
from app.services.vector_search.searcher import VectorSearchService

router = APIRouter()
search_service = VectorSearchService()


@router.post("/", response_model=SearchResponse)
async def vector_search(
    request: SearchRequest
) -> SearchResponse:
    """Perform vector similarity search."""
    # Get session from request body
    session = get_session_from_request_body(request)
    """Perform vector similarity search."""
    results = search_service.search(
        query_embedding=request.query_embedding,
        document_embeddings=session.embeddings,
        chunks=session.chunks,
        top_k=request.top_k,
    )

    # Convert to Pydantic models
    result_models = [
        SearchResultModel(
            chunk_id=r.chunk_id,
            score=r.score,
            chunk_text=r.chunk_text,
        )
        for r in results
    ]

    return SearchResponse(results=result_models)

