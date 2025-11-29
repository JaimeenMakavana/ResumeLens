"""Session management endpoints."""
import uuid
from fastapi import APIRouter, Depends, HTTPException, status

from app.api.dependencies import get_session
from app.api.models.session import (
    SessionCreateRequest,
    SessionDeleteResponse,
    SessionResponse,
)
from app.core.session_manager import session_manager
from app.types.session import Session

router = APIRouter()


@router.post("/create", response_model=SessionResponse)
async def create_session(request: SessionCreateRequest) -> SessionResponse:
    """Create a new ephemeral session."""
    if request.source_type not in ["resume", "jd"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="source_type must be 'resume' or 'jd'",
        )

    session_id = str(uuid.uuid4())
    session = session_manager.create_session(
        session_id=session_id, source_type=request.source_type
    )

    return SessionResponse(
        session_id=session.session_id,
        expires_at=session.expires_at.isoformat(),
        source_type=session.source_type,
        created_at=session.created_at.isoformat(),
    )


@router.get("/{session_id}", response_model=SessionResponse)
async def get_session_info(
    session: Session = Depends(get_session),
) -> SessionResponse:
    """Get session information."""
    return SessionResponse(
        session_id=session.session_id,
        expires_at=session.expires_at.isoformat(),
        source_type=session.source_type,
        created_at=session.created_at.isoformat(),
    )


@router.delete("/{session_id}", response_model=SessionDeleteResponse)
async def delete_session(session_id: str) -> SessionDeleteResponse:
    """Delete a session."""
    success = session_manager.delete_session(session_id)
    if success:
        return SessionDeleteResponse(
            success=True, message=f"Session {session_id} deleted"
        )
    return SessionDeleteResponse(
        success=False, message=f"Session {session_id} not found"
    )

