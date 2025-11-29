"""FastAPI dependencies."""
from typing import Annotated
from fastapi import HTTPException, status, Depends

from app.core.exceptions import SessionNotFoundError
from app.core.session_manager import session_manager
from app.types.session import Session


def get_session(session_id: str) -> Session:
    """Dependency to get and validate session from path or query parameter."""
    session = session_manager.get_session(session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Session not found or expired: {session_id}",
        )
    return session


def get_session_from_request_body(request) -> Session:
    """Dependency to get session from request body (for POST endpoints).
    
    Usage: session: Session = Depends(get_session_from_request_body)
    The request parameter will be automatically injected by FastAPI.
    """
    session_id = getattr(request, "session_id", None)
    if not session_id:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="session_id is required in request body",
        )
    session = session_manager.get_session(session_id)
    if not session:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Session not found or expired: {session_id}",
        )
    return session

