"""Vector search implementation."""
from typing import List

from app.core.config import settings
from app.services.vector_search.ranking import rank_results
from app.services.vector_search.similarity import cosine_similarity
from app.types.chunk import Chunk
from app.types.embedding import EmbeddingVector
from app.types.rag import SearchResult


class VectorSearchService:
    """Service for vector similarity search."""

    def search(
        self,
        query_embedding: EmbeddingVector,
        document_embeddings: List[EmbeddingVector],
        chunks: List[Chunk],
        top_k: int | None = None,
    ) -> List[SearchResult]:
        """
        Perform cosine similarity search.
        Returns top_k most relevant chunks with scores.
        """
        top_k = top_k or settings.default_top_k

        if not document_embeddings or not chunks:
            return []

        if len(document_embeddings) != len(chunks):
            raise ValueError(
                "Number of embeddings must match number of chunks"
            )

        # Calculate similarities
        results: List[SearchResult] = []
        for i, (embedding, chunk) in enumerate(zip(document_embeddings, chunks)):
            score = cosine_similarity(query_embedding, embedding)
            results.append(
                SearchResult(
                    chunk_id=chunk.id,
                    score=score,
                    chunk_text=chunk.text,
                )
            )

        # Rank and return top_k
        ranked_results = rank_results(results, top_k)
        return ranked_results

