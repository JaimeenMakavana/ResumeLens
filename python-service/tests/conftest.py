"""Pytest configuration and fixtures."""
import pytest
from app.core.session_manager import SessionManager


@pytest.fixture
def session_manager():
    """Create a test session manager."""
    return SessionManager(ttl_minutes=5)


@pytest.fixture
def sample_text():
    """Sample text for testing."""
    return "This is a sample text for testing chunking functionality. " * 50

