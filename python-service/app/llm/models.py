"""LLM response models."""
from dataclasses import dataclass


@dataclass
class LLMResponse:
    """LLM response structure."""

    text: str
    model: str
    usage: dict | None = None

