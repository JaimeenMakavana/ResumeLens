"""Integration tests for session lifecycle."""
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_session_lifecycle():
    """Test complete session lifecycle."""
    # Create session
    create_response = client.post(
        "/api/session/create", json={"source_type": "resume"}
    )
    assert create_response.status_code == 200
    session_data = create_response.json()
    session_id = session_data["session_id"]

    # Get session
    get_response = client.get(f"/api/session/{session_id}")
    assert get_response.status_code == 200

    # Delete session
    delete_response = client.delete(f"/api/session/{session_id}")
    assert delete_response.status_code == 200
    assert delete_response.json()["success"] is True

