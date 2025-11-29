"""Session storage and TTL management."""
import threading
import time
from datetime import datetime, timedelta
from typing import Dict, Optional

from app.core.config import settings
from app.core.exceptions import SessionNotFoundError
from app.types.session import Session
from app.utils.logger import logger


class SessionManager:
    """In-memory session manager with TTL expiration."""

    def __init__(self, ttl_minutes: int | None = None):
        self._sessions: Dict[str, Session] = {}
        self._lock = threading.Lock()
        self.ttl_minutes = ttl_minutes or settings.session_ttl_minutes
        self._start_cleanup_task()

    def create_session(
        self, session_id: str, source_type: str
    ) -> Session:
        """Create new session with TTL."""
        expires_at = datetime.now() + timedelta(minutes=self.ttl_minutes)
        session = Session(
            session_id=session_id,
            chunks=[],
            embeddings=[],
            source_type=source_type,
            created_at=datetime.now(),
            expires_at=expires_at,
        )
        with self._lock:
            if len(self._sessions) >= settings.max_sessions:
                # Remove oldest expired session if any
                self._cleanup_expired_sessions()
                if len(self._sessions) >= settings.max_sessions:
                    raise ValueError("Maximum sessions reached")
            self._sessions[session_id] = session
        logger.info(f"Created session: {session_id}")
        return session

    def get_session(self, session_id: str) -> Optional[Session]:
        """Get session if not expired."""
        with self._lock:
            session = self._sessions.get(session_id)
            if session and not session.is_expired():
                return session
            elif session:
                # Session expired, remove it
                del self._sessions[session_id]
                logger.info(f"Session expired and removed: {session_id}")
            return None

    def delete_session(self, session_id: str) -> bool:
        """Explicitly delete session."""
        with self._lock:
            if session_id in self._sessions:
                del self._sessions[session_id]
                logger.info(f"Session deleted: {session_id}")
                return True
            return False

    def _cleanup_expired_sessions(self) -> None:
        """Remove expired sessions."""
        expired = [
            sid
            for sid, session in self._sessions.items()
            if session.is_expired()
        ]
        for sid in expired:
            del self._sessions[sid]
        if expired:
            logger.info(f"Cleaned up {len(expired)} expired sessions")

    def _start_cleanup_task(self) -> None:
        """Start background task to cleanup expired sessions."""
        def cleanup_loop():
            while True:
                time.sleep(60)  # Check every minute
                with self._lock:
                    self._cleanup_expired_sessions()

        # Start cleanup thread
        cleanup_thread = threading.Thread(target=cleanup_loop, daemon=True)
        cleanup_thread.start()


# Global session manager instance
session_manager = SessionManager()

