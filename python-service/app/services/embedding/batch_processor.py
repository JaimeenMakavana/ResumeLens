"""Batch embedding processing utilities."""
from typing import List

from app.services.embedding.generator import EmbeddingService


async def process_embeddings_batch(
    texts: List[str], embedding_service: EmbeddingService
) -> List[List[float]]:
    """Process embeddings in batches."""
    return await embedding_service.generate_embeddings_batch(texts)

