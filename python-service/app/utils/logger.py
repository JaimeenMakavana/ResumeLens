"""Logging configuration."""
import logging
import sys
from app.core.config import settings


def setup_logging(level: str | None = None) -> None:
    """Set up structured logging."""
    log_level = level or settings.log_level
    logging.basicConfig(
        level=getattr(logging, log_level.upper(), logging.INFO),
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[logging.StreamHandler(sys.stdout)],
    )


logger = logging.getLogger("resumelens")

