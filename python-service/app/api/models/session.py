"""Session API models."""
from pydantic import BaseModel, Field


class SessionCreateRequest(BaseModel):
    """Request to create a new session."""

    source_type: str = Field(..., description="Source type: 'resume' or 'jd'")


class SessionResponse(BaseModel):
    """Session response model."""

    session_id: str
    expires_at: str  # ISO format datetime
    source_type: str
    created_at: str  # ISO format datetime


class SessionDeleteResponse(BaseModel):
    """Response for session deletion."""

    success: bool
    message: str

