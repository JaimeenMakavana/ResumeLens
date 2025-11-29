"""LLM response parsing."""
import re
from typing import List

from app.types.rag import RAGResponse, SearchResult


def parse_response(
    llm_response: str, search_results: List[SearchResult]
) -> RAGResponse:
    """Parse LLM response and extract sources."""
    # Extract chunk IDs mentioned in response
    chunk_id_pattern = r"chunk-(\d+)"
    mentioned_ids = re.findall(chunk_id_pattern, llm_response.lower())

    # Map to actual chunk IDs from search results
    sources: List[str] = []
    for idx_str in mentioned_ids:
        try:
            idx = int(idx_str)
            if 0 <= idx < len(search_results):
                sources.append(search_results[idx].chunk_id)
        except ValueError:
            pass

    # Calculate confidence based on number of sources and scores
    if search_results:
        avg_score = sum(r.score for r in search_results) / len(search_results)
        confidence = min(1.0, avg_score * 1.2)  # Normalize to 0-1
    else:
        confidence = 0.0

    return RAGResponse(
        answer=llm_response.strip(),
        sources=list(set(sources)),  # Remove duplicates
        confidence=round(confidence, 2),
    )

