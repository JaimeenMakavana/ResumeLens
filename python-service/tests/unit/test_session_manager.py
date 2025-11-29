"""Unit tests for session manager."""
import pytest
from datetime import datetime, timedelta
from app.core.session_manager import SessionManager
from app.types.session import Session


def test_create_session(session_manager):
    """Test session creation."""
    session = session_manager.create_session("test-session-1", "resume")
    assert session.session_id == "test-session-1"
    assert session.source_type == "resume"
    assert not session.is_expired()


def test_get_session(session_manager):
    """Test getting a session."""
    session_manager.create_session("test-session-2", "jd")
    session = session_manager.get_session("test-session-2")
    assert session is not None
    assert session.source_type == "jd"


def test_delete_session(session_manager):
    """Test session deletion."""
    session_manager.create_session("test-session-3", "resume")
    result = session_manager.delete_session("test-session-3")
    assert result is True
    assert session_manager.get_session("test-session-3") is None

