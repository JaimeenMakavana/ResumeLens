"""Embedding generation service."""
import google.generativeai as genai
from typing import List

from app.core.config import settings
from app.core.exceptions import EmbeddingGenerationError
from app.utils.logger import logger


class EmbeddingService:
    """Service for generating embeddings using Gemini."""

    def __init__(self, api_key: str | None = None):
        self.api_key = api_key or settings.gemini_api_key
        genai.configure(api_key=self.api_key)
        self.model = settings.gemini_embedding_model

    async def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding for single text using Gemini API."""
        try:
            result = genai.embed_content(
                model=self.model,
                content=text,
                task_type="retrieval_document",
            )
            return result["embedding"]
        except Exception as e:
            error_str = str(e)
            logger.error(f"Embedding generation error: {e}")
            
            # Check for quota/rate limit errors
            if "429" in error_str or "quota" in error_str.lower() or "rate limit" in error_str.lower():
                raise EmbeddingGenerationError(
                    "Gemini API quota exceeded. The free tier has limited embedding requests. "
                    "Please wait a few minutes and try again, or upgrade your API plan. "
                    f"Error details: {error_str[:200]}"
                )
            
            raise EmbeddingGenerationError(f"Failed to generate embedding: {error_str}")

    async def generate_embeddings_batch(
        self, texts: List[str]
    ) -> List[List[float]]:
        """Generate embeddings for multiple texts efficiently."""
        embeddings = []
        for text in texts:
            embedding = await self.generate_embedding(text)
            embeddings.append(embedding)
        return embeddings

