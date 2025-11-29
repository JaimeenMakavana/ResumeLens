"""RAG pipeline orchestrator."""
from app.core.config import settings
from app.core.exceptions import SessionNotFoundError
from app.core.session_manager import session_manager
from app.llm.gemini_client import GeminiClient
from app.services.embedding.generator import EmbeddingService
from app.services.rag.prompt_builder import build_prompt
from app.services.rag.response_parser import parse_response
from app.services.vector_search.searcher import VectorSearchService
from app.types.rag import RAGResponse
from app.utils.logger import logger


class RAGPipeline:
    """Complete RAG pipeline orchestrator."""

    def __init__(self):
        logger.info("Creating new RAGPipeline instance")
        self.embedding_service = EmbeddingService()
        self.search_service = VectorSearchService()
        logger.info("Creating GeminiClient...")
        self.llm_client = GeminiClient()
        logger.info(f"RAGPipeline created with LLM client model: {self.llm_client.model_name}")

    async def process_query(
        self, query: str, session_id: str, top_k: int | None = None
    ) -> RAGResponse:
        """
        Complete RAG pipeline:
        1. Embed query
        2. Search relevant chunks
        3. Build prompt with context
        4. Call LLM
        5. Return response with sources
        """
        top_k = top_k or settings.default_top_k

        # 1. Get session
        session = session_manager.get_session(session_id)
        if not session:
            raise SessionNotFoundError(session_id)

        if not session.chunks or not session.embeddings:
            return RAGResponse(
                answer="No document has been processed yet. Please upload a document first.",
                sources=[],
                confidence=0.0,
            )

        # 2. Generate query embedding
        logger.info(f"Generating query embedding for session {session_id}")
        query_embedding = await self.embedding_service.generate_embedding(query)

        # 3. Search relevant chunks
        logger.info(f"Searching for relevant chunks (top_k={top_k})")
        search_results = self.search_service.search(
            query_embedding=query_embedding,
            document_embeddings=session.embeddings,
            chunks=session.chunks,
            top_k=top_k,
        )

        if not search_results:
            return RAGResponse(
                answer="No relevant information found in the document.",
                sources=[],
                confidence=0.0,
            )

        # 4. Build prompt
        logger.info("Building RAG prompt")
        chunks_for_prompt = [
            chunk
            for chunk in session.chunks
            if chunk.id in [r.chunk_id for r in search_results]
        ]
        prompt = build_prompt(query, chunks_for_prompt)

        # 5. Generate response
        logger.info("Calling LLM")
        llm_response = await self.llm_client.generate(prompt)

        # 6. Parse response
        parsed_response = parse_response(llm_response, search_results)

        logger.info(
            f"RAG pipeline completed. Found {len(parsed_response.sources)} sources."
        )

        return parsed_response

