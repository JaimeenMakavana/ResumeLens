"""Input validation helpers."""
from typing import Any


def validate_session_id(session_id: str) -> bool:
    """Validate session ID format."""
    if not session_id or not isinstance(session_id, str):
        return False
    if len(session_id) < 8 or len(session_id) > 64:
        return False
    # Allow alphanumeric and hyphens/underscores
    return bool(session_id.replace("-", "").replace("_", "").isalnum())


def validate_chunk_size(size: int) -> bool:
    """Validate chunk size."""
    return 100 <= size <= 2000


def validate_overlap(overlap: float) -> bool:
    """Validate overlap ratio."""
    return 0.0 <= overlap <= 0.5


def validate_top_k(top_k: int) -> bool:
    """Validate top_k value."""
    return 1 <= top_k <= 50


def validate_source_type(source_type: str) -> bool:
    """Validate source type."""
    return source_type in ["resume", "jd"]

