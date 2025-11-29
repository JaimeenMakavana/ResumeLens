"""Integration tests for RAG pipeline."""
import pytest
from app.core.session_manager import session_manager
from app.services.rag.pipeline import RAGPipeline


@pytest.mark.asyncio
async def test_rag_pipeline_end_to_end():
    """Test complete RAG pipeline."""
    # This is a placeholder - actual test would require mocked Gemini API
    # For now, just verify the pipeline can be instantiated
    pipeline = RAGPipeline()
    assert pipeline is not None
    assert pipeline.embedding_service is not None
    assert pipeline.search_service is not None
    assert pipeline.llm_client is not None

