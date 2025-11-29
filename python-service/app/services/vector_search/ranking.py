"""Result ranking and filtering."""
from typing import List

from app.types.rag import SearchResult


def rank_results(results: List[SearchResult], top_k: int) -> List[SearchResult]:
    """Rank results by score and return top_k."""
    # Sort by score descending
    sorted_results = sorted(results, key=lambda x: x.score, reverse=True)
    return sorted_results[:top_k]

