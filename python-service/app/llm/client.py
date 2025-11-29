"""LLM client interface."""
from abc import ABC, abstractmethod


class LLMClient(ABC):
    """Abstract base class for LLM clients."""

    @abstractmethod
    async def generate(self, prompt: str, **kwargs) -> str:
        """Generate text response from prompt."""
        pass

