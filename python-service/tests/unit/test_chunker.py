"""Unit tests for chunking service."""
import pytest
from app.services.chunking.chunker import ChunkerService


def test_chunker_basic():
    """Test basic chunking functionality."""
    chunker = ChunkerService()
    text = "A" * 2000  # 2000 characters
    chunks = chunker.chunk(text, max_size=1000, overlap=0.25)
    assert len(chunks) > 1
    assert all(len(chunk.text) <= 1000 for chunk in chunks)


def test_chunker_single_chunk():
    """Test chunking with text smaller than max_size."""
    chunker = ChunkerService()
    text = "Short text"
    chunks = chunker.chunk(text, max_size=1000)
    assert len(chunks) == 1
    assert chunks[0].text == text

