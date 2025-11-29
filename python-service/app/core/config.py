"""Configuration management."""
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import field_validator
from typing import List, Union


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=False,
        # Don't parse complex types automatically
        env_parse_none_str=True,
    )

    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_reload: bool = True

    # Gemini API
    gemini_api_key: str
    gemini_model: str = "gemini-2.5-flash"  # Valid models: gemini-2.5-flash, gemini-2.0-flash, gemini-flash-latest
    gemini_embedding_model: str = "models/embedding-001"

    # Session Configuration
    session_ttl_minutes: int = 25
    max_sessions: int = 100

    # Chunking Configuration
    default_chunk_size: int = 1000
    default_overlap: float = 0.25

    # Vector Search Configuration
    default_top_k: int = 8

    # CORS - accept as string, convert to list
    cors_origins: Union[str, List[str]] = "http://localhost:3000"

    # Logging
    log_level: str = "INFO"

    @field_validator("cors_origins", mode="before")
    @classmethod
    def parse_cors_origins(cls, v: Union[str, List[str]]) -> List[str]:
        """Parse CORS origins from comma-separated string or list."""
        if isinstance(v, list):
            return v
        if isinstance(v, str):
            # Split by comma and strip whitespace
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        return ["http://localhost:3000"]  # default


settings = Settings()

