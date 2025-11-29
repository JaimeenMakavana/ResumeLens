"""FastAPI application entry point."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import session
from app.core.config import settings
from app.utils.logger import setup_logging

# Set up logging
setup_logging()

# Create FastAPI app
app = FastAPI(
    title="ResumeLens RAG Service",
    version="1.0.0",
    description="Ephemeral RAG-based conversational assistant",
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(
    session.router, prefix="/api/session", tags=["session"]
)

from app.api.routes import chunk, embed, search, rag

app.include_router(chunk.router, prefix="/api/chunk", tags=["chunk"])
app.include_router(embed.router, prefix="/api/embed", tags=["embed"])
app.include_router(search.router, prefix="/api/search", tags=["search"])
app.include_router(rag.router, prefix="/api/rag", tags=["rag"])


@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "ok", "service": "ResumeLens RAG Service"}


@app.get("/health")
async def health():
    """Health check endpoint."""
    return {"status": "healthy"}

