# Python RAG Service Architecture & Folder Structure - ResumeLens

**Purpose**: This document defines the folder structure, architecture, and design patterns for the Python FastAPI RAG service that handles document processing, embeddings, vector search, and LLM interactions.

---

## Root Project Structure

```
ResumeLens/
├── frontend/                      # Next.js frontend (separate)
│   └── ...
│
├── python-service/                # Python FastAPI RAG service
│   ├── app/                       # Main application package
│   ├── tests/                     # Test suite
│   ├── scripts/                   # Utility scripts
│   ├── .env                       # Environment variables
│   ├── .env.example               # Environment template
│   ├── requirements.txt           # Python dependencies
│   ├── requirements-dev.txt       # Development dependencies
│   ├── pyproject.toml             # Project configuration (optional)
│   ├── Dockerfile                 # Docker configuration
│   ├── docker-compose.yml         # Docker compose (optional)
│   ├── README.md                  # Service-specific README
│   └── main.py                    # Application entry point
│
├── PRD.md                         # Product requirements
├── TECH_STACK.md                  # Tech stack guide
├── frontend.md                    # Frontend structure
└── background-work.md             # This file
```

---

## Python Service Folder Structure (Detailed)

```
python-service/
│
├── app/                           # Main application package
│   ├── __init__.py
│   │
│   ├── main.py                    # FastAPI application setup
│   │
│   ├── api/                       # API route handlers
│   │   ├── __init__.py
│   │   ├── dependencies.py        # FastAPI dependencies (session validation, etc.)
│   │   │
│   │   ├── routes/                # API route modules
│   │   │   ├── __init__.py
│   │   │   ├── session.py         # Session management endpoints
│   │   │   ├── chunk.py           # Chunking endpoint
│   │   │   ├── embed.py           # Embedding generation endpoint
│   │   │   ├── search.py          # Vector search endpoint
│   │   │   └── rag.py             # RAG chat endpoint
│   │   │
│   │   └── models/                # API request/response models
│   │       ├── __init__.py
│   │       ├── session.py         # Session models
│   │       ├── chunk.py           # Chunking models
│   │       ├── embed.py           # Embedding models
│   │       ├── search.py          # Search models
│   │       └── rag.py             # RAG chat models
│   │
│   ├── core/                      # Core business logic
│   │   ├── __init__.py
│   │   ├── config.py              # Configuration management
│   │   ├── session_manager.py     # Session storage and TTL management
│   │   └── exceptions.py          # Custom exceptions
│   │
│   ├── services/                  # Business logic services
│   │   ├── __init__.py
│   │   │
│   │   ├── document/              # Document processing services
│   │   │   ├── __init__.py
│   │   │   ├── extractor.py       # Text extraction (PDF/DOCX fallback)
│   │   │   ├── cleaner.py         # Text cleaning and normalization
│   │   │   └── processor.py       # Document processing orchestrator
│   │   │
│   │   ├── chunking/              # Text chunking services
│   │   │   ├── __init__.py
│   │   │   ├── chunker.py         # Main chunking logic
│   │   │   ├── strategies.py      # Chunking strategies (if multiple)
│   │   │   └── metadata.py        # Metadata preservation
│   │   │
│   │   ├── embedding/             # Embedding generation services
│   │   │   ├── __init__.py
│   │   │   ├── generator.py       # Embedding generation
│   │   │   ├── gemini_client.py   # Gemini API client wrapper
│   │   │   └── batch_processor.py # Batch embedding processing
│   │   │
│   │   ├── vector_search/         # Vector similarity search
│   │   │   ├── __init__.py
│   │   │   ├── searcher.py        # Vector search implementation
│   │   │   ├── similarity.py      # Cosine similarity calculation
│   │   │   └── ranking.py         # Result ranking and filtering
│   │   │
│   │   └── rag/                   # RAG pipeline orchestration
│   │       ├── __init__.py
│   │       ├── pipeline.py        # RAG pipeline orchestrator
│   │       ├── prompt_builder.py  # RAG prompt template builder
│   │       └── response_parser.py # LLM response parsing
│   │
│   ├── llm/                       # LLM integration layer
│   │   ├── __init__.py
│   │   ├── client.py              # LLM client interface
│   │   ├── gemini_client.py       # Gemini implementation
│   │   └── models.py              # LLM response models
│   │
│   ├── utils/                     # Utility functions
│   │   ├── __init__.py
│   │   ├── text_utils.py          # Text manipulation utilities
│   │   ├── validation.py          # Input validation helpers
│   │   ├── logger.py              # Logging configuration
│   │   └── decorators.py          # Utility decorators
│   │
│   └── types/                     # Type definitions and schemas
│       ├── __init__.py
│       ├── session.py             # Session type definitions
│       ├── chunk.py               # Chunk type definitions
│       ├── embedding.py           # Embedding type definitions
│       └── rag.py                 # RAG type definitions
│
├── tests/                         # Test suite
│   ├── __init__.py
│   │
│   ├── unit/                      # Unit tests
│   │   ├── __init__.py
│   │   ├── test_chunker.py
│   │   ├── test_embedding.py
│   │   ├── test_vector_search.py
│   │   ├── test_session_manager.py
│   │   └── test_text_cleaner.py
│   │
│   ├── integration/               # Integration tests
│   │   ├── __init__.py
│   │   ├── test_rag_pipeline.py
│   │   ├── test_api_endpoints.py
│   │   └── test_session_lifecycle.py
│   │
│   ├── fixtures/                  # Test fixtures and mocks
│   │   ├── __init__.py
│   │   ├── sample_documents/      # Sample PDFs/DOCX for testing
│   │   ├── mock_responses.py      # Mock API responses
│   │   └── test_data.py           # Test data generators
│   │
│   └── conftest.py                # Pytest configuration and fixtures
│
├── scripts/                       # Utility scripts
│   ├── setup_env.py               # Environment setup script
│   ├── test_api.py                # API testing script
│   └── cleanup_sessions.py        # Manual session cleanup (dev)
│
├── .env                           # Environment variables (not committed)
├── .env.example                   # Environment variables template
├── .gitignore
├── requirements.txt               # Production dependencies
├── requirements-dev.txt           # Development dependencies
├── pyproject.toml                 # Project metadata and tool configs
├── Dockerfile                     # Docker image definition
├── docker-compose.yml             # Docker compose (optional)
├── README.md                      # Service documentation
└── main.py                        # Application entry point (alternate)
```

---

## Key Directory Explanations

### `/app` - Main Application Package

#### `/app/main.py` - FastAPI Application Entry Point

FastAPI app initialization, middleware, CORS, routing:

```python
# app/main.py structure
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import session, chunk, embed, search, rag
from app.core.config import settings

app = FastAPI(title="ResumeLens RAG Service", version="1.0.0")

# CORS middleware
app.add_middleware(...)

# Include routers
app.include_router(session.router, prefix="/api/session", tags=["session"])
app.include_router(chunk.router, prefix="/api/chunk", tags=["chunk"])
# ... other routers
```

#### `/app/api/routes/` - API Route Handlers

FastAPI route handlers organized by feature:

- `session.py` - Session CRUD operations
- `chunk.py` - Text chunking endpoint
- `embed.py` - Embedding generation endpoint
- `search.py` - Vector similarity search endpoint
- `rag.py` - Complete RAG pipeline endpoint

**Example Route:**
```python
# app/api/routes/chunk.py
from fastapi import APIRouter, Depends
from app.api.models.chunk import ChunkRequest, ChunkResponse
from app.services.chunking.chunker import ChunkerService

router = APIRouter()

@router.post("/", response_model=ChunkResponse)
async def chunk_text(
    request: ChunkRequest,
    chunker: ChunkerService = Depends(get_chunker_service)
):
    chunks = await chunker.chunk(request.text, request.metadata)
    return ChunkResponse(chunks=chunks)
```

#### `/app/api/models/` - Pydantic Request/Response Models

Pydantic models for API validation:

- Request models: Input validation
- Response models: Output structure
- Serialization: Automatic JSON serialization

**Example Model:**
```python
# app/api/models/chunk.py
from pydantic import BaseModel, Field
from typing import List, Optional

class ChunkRequest(BaseModel):
    text: str = Field(..., min_length=1)
    session_id: str
    max_chunk_size: int = Field(default=1000, ge=100, le=2000)
    overlap: float = Field(default=0.25, ge=0.0, le=0.5)
    metadata: Optional[dict] = None

class ChunkResponse(BaseModel):
    chunks: List[ChunkModel]
    total_chunks: int
```

### `/app/core/` - Core Infrastructure

#### `/app/core/config.py` - Configuration Management

Centralized configuration using environment variables:

```python
# app/core/config.py
from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API Configuration
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    
    # Gemini API
    gemini_api_key: str
    gemini_model: str = "gemini-pro"
    gemini_embedding_model: str = "models/embedding-001"
    
    # Session Configuration
    session_ttl_minutes: int = 25
    max_sessions: int = 100
    
    # Chunking Configuration
    default_chunk_size: int = 1000
    default_overlap: float = 0.25
    
    # Vector Search Configuration
    default_top_k: int = 8
    
    # CORS
    cors_origins: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
```

#### `/app/core/session_manager.py` - Session Storage & TTL

In-memory session management with TTL expiration:

- Dictionary-based storage
- Background cleanup task
- Session expiration logic
- Thread-safe operations

**Session Data Structure:**
```python
# app/types/session.py
from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional
from app.types.chunk import Chunk
from app.types.embedding import EmbeddingVector

@dataclass
class Session:
    session_id: str
    chunks: List[Chunk]
    embeddings: List[EmbeddingVector]
    source_type: str  # "resume" | "jd"
    created_at: datetime
    expires_at: datetime
    
    def is_expired(self) -> bool:
        return datetime.now() > self.expires_at
```

### `/app/services/` - Business Logic Services

#### `/app/services/chunking/` - Text Chunking

**`chunker.py`** - Main chunking logic:

- Character-based chunking (800-1200 chars)
- Configurable overlap (20-30%)
- Metadata preservation
- Section/page tracking

**Key Functions:**
```python
# app/services/chunking/chunker.py
class ChunkerService:
    def chunk(
        self,
        text: str,
        max_size: int = 1000,
        overlap: float = 0.25,
        metadata: Optional[dict] = None
    ) -> List[Chunk]:
        """
        Split text into chunks with overlap.
        Preserve metadata (section, page, source type).
        """
        # Implementation: character-based with overlap
```

#### `/app/services/embedding/` - Embedding Generation

**`generator.py`** - Embedding generation service:

- Batch embedding generation
- Gemini Embeddings API integration
- Error handling and retries

**Key Functions:**
```python
# app/services/embedding/generator.py
class EmbeddingService:
    async def generate_embedding(self, text: str) -> List[float]:
        """Generate embedding for single text using Gemini API."""
    
    async def generate_embeddings_batch(
        self, texts: List[str]
    ) -> List[List[float]]:
        """Generate embeddings for multiple texts efficiently."""
```

#### `/app/services/vector_search/` - Vector Similarity Search

**`searcher.py`** - Vector search implementation:

- Brute-force cosine similarity using NumPy
- TopK retrieval (default 6-10)
- Relevance score calculation
- Result ranking

**Key Functions:**
```python
# app/services/vector_search/searcher.py
import numpy as np

class VectorSearchService:
    def search(
        self,
        query_embedding: List[float],
        document_embeddings: List[List[float]],
        chunks: List[Chunk],
        top_k: int = 8
    ) -> List[SearchResult]:
        """
        Perform cosine similarity search.
        Returns top_k most relevant chunks with scores.
        """
        # NumPy cosine similarity implementation
```

#### `/app/services/rag/` - RAG Pipeline Orchestration

**`pipeline.py`** - Complete RAG pipeline:

1. Query embedding generation
2. Vector similarity search
3. Top chunk selection
4. Prompt assembly
5. LLM call with grounded context
6. Response parsing

**Key Functions:**
```python
# app/services/rag/pipeline.py
class RAGPipeline:
    async def process_query(
        self,
        query: str,
        session_id: str,
        top_k: int = 8
    ) -> RAGResponse:
        """
        Complete RAG pipeline:
        1. Embed query
        2. Search relevant chunks
        3. Build prompt with context
        4. Call LLM
        5. Return response with sources
        """
```

**`prompt_builder.py`** - RAG prompt templates:

- Context injection
- Grounding instructions
- Format enforcement

**Example Prompt Template:**
```python
# app/services/rag/prompt_builder.py
RAG_PROMPT_TEMPLATE = """
You are a helpful assistant answering questions based on the provided document snippets.

Context snippets:
{context}

Question: {query}

Instructions:
- Answer using ONLY the information from the snippets above
- If the information is not in the snippets, say so
- Cite which snippet(s) you used (by ID)

Answer:
"""
```

### `/app/llm/` - LLM Integration Layer

Abstraction layer for LLM providers (currently Gemini):

**`client.py`** - LLM client interface:
```python
# app/llm/client.py
from abc import ABC, abstractmethod

class LLMClient(ABC):
    @abstractmethod
    async def generate(self, prompt: str, **kwargs) -> str:
        """Generate text response from prompt."""
```

**`gemini_client.py`** - Gemini implementation:
```python
# app/llm/gemini_client.py
import google.generativeai as genai

class GeminiClient(LLMClient):
    def __init__(self, api_key: str, model: str = "gemini-pro"):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model)
    
    async def generate(self, prompt: str, **kwargs) -> str:
        response = await self.model.generate_content_async(prompt)
        return response.text
```

### `/app/utils/` - Utility Functions

Pure utility functions:

- **`text_utils.py`** - Text manipulation (normalization, cleaning)
- **`validation.py`** - Input validation helpers
- **`logger.py`** - Structured logging configuration
- **`decorators.py`** - Utility decorators (timing, error handling)

---

## File Naming Conventions

### Python Files
- **snake_case** for all Python files: `session_manager.py`, `text_chunker.py`
- **PascalCase** for classes: `SessionManager`, `TextChunker`
- **UPPER_CASE** for constants: `DEFAULT_CHUNK_SIZE`, `MAX_SESSIONS`

### Package Structure
- Each directory has `__init__.py` for Python package recognition
- Use `__init__.py` for clean imports and public API definition

### Type Definitions
- Separate type definitions in `/app/types/`
- Use Python dataclasses or Pydantic models

---

## Service Layer Architecture

### Service Dependency Injection Pattern

Services are injected via FastAPI dependencies:

```python
# app/api/dependencies.py
from app.services.chunking.chunker import ChunkerService
from app.services.embedding.generator import EmbeddingService

def get_chunker_service() -> ChunkerService:
    return ChunkerService()

def get_embedding_service() -> EmbeddingService:
    api_key = settings.gemini_api_key
    return EmbeddingService(api_key=api_key)
```

**Usage in Routes:**
```python
@router.post("/chunk")
async def chunk_text(
    request: ChunkRequest,
    chunker: ChunkerService = Depends(get_chunker_service)
):
    # Use injected service
    chunks = await chunker.chunk(request.text)
```

---

## Session Management Architecture

### In-Memory Storage

```python
# app/core/session_manager.py
from typing import Dict, Optional
from datetime import datetime, timedelta
import threading

class SessionManager:
    def __init__(self, ttl_minutes: int = 25):
        self._sessions: Dict[str, Session] = {}
        self._lock = threading.Lock()
        self.ttl_minutes = ttl_minutes
        self._start_cleanup_task()
    
    def create_session(
        self, 
        session_id: str, 
        source_type: str
    ) -> Session:
        """Create new session with TTL."""
        expires_at = datetime.now() + timedelta(minutes=self.ttl_minutes)
        session = Session(
            session_id=session_id,
            chunks=[],
            embeddings=[],
            source_type=source_type,
            created_at=datetime.now(),
            expires_at=expires_at
        )
        with self._lock:
            self._sessions[session_id] = session
        return session
    
    def get_session(self, session_id: str) -> Optional[Session]:
        """Get session if not expired."""
        with self._lock:
            session = self._sessions.get(session_id)
            if session and not session.is_expired():
                return session
            elif session:
                del self._sessions[session_id]
            return None
    
    def delete_session(self, session_id: str) -> bool:
        """Explicitly delete session."""
        with self._lock:
            if session_id in self._sessions:
                del self._sessions[session_id]
                return True
            return False
    
    def _start_cleanup_task(self):
        """Background task to cleanup expired sessions."""
        # Use asyncio or threading to periodically clean expired sessions
```

---

## RAG Pipeline Flow

### Complete Pipeline Steps

1. **Query Embedding** (`embedding/generator.py`)
   - Convert user query to embedding vector
   - Use Gemini Embeddings API

2. **Vector Search** (`vector_search/searcher.py`)
   - Calculate cosine similarity between query and all chunks
   - Rank by relevance score
   - Select topK chunks

3. **Prompt Construction** (`rag/prompt_builder.py`)
   - Combine selected chunks into context
   - Inject query and instructions
   - Format according to template

4. **LLM Generation** (`llm/gemini_client.py`)
   - Send prompt to Gemini Generation API
   - Receive response

5. **Response Parsing** (`rag/response_parser.py`)
   - Extract answer from LLM response
   - Identify cited chunk IDs
   - Structure response with sources

### Pipeline Integration

```python
# app/services/rag/pipeline.py
class RAGPipeline:
    def __init__(
        self,
        embedding_service: EmbeddingService,
        search_service: VectorSearchService,
        llm_client: LLMClient,
        session_manager: SessionManager
    ):
        self.embedding_service = embedding_service
        self.search_service = search_service
        self.llm_client = llm_client
        self.session_manager = session_manager
    
    async def process_query(
        self, 
        query: str, 
        session_id: str,
        top_k: int = 8
    ) -> RAGResponse:
        # 1. Get session
        session = self.session_manager.get_session(session_id)
        if not session:
            raise SessionNotFoundError(session_id)
        
        # 2. Generate query embedding
        query_embedding = await self.embedding_service.generate_embedding(query)
        
        # 3. Search relevant chunks
        results = self.search_service.search(
            query_embedding=query_embedding,
            document_embeddings=session.embeddings,
            chunks=session.chunks,
            top_k=top_k
        )
        
        # 4. Build prompt
        prompt = self.prompt_builder.build_prompt(
            query=query,
            chunks=[r.chunk for r in results]
        )
        
        # 5. Generate response
        llm_response = await self.llm_client.generate(prompt)
        
        # 6. Parse response
        parsed_response = self.response_parser.parse(
            llm_response, 
            cited_chunks=[r.chunk for r in results]
        )
        
        return RAGResponse(
            answer=parsed_response.answer,
            sources=parsed_response.sources,
            confidence=parsed_response.confidence
        )
```

---

## API Endpoints Structure

### Endpoint Definitions

#### 1. Session Management

```
POST   /api/session/create
GET    /api/session/{session_id}
DELETE /api/session/{session_id}
```

#### 2. Document Processing

```
POST   /api/chunk          # Chunk text with metadata
POST   /api/embed          # Generate embeddings for chunks
```

#### 3. Vector Search

```
POST   /api/search         # Vector similarity search
```

#### 4. RAG Pipeline

```
POST   /api/rag/chat       # Complete RAG query
```

### Endpoint Examples

**Create Session:**
```python
# app/api/routes/session.py
@router.post("/create", response_model=SessionResponse)
async def create_session(request: SessionCreateRequest):
    session_id = generate_session_id()
    session = session_manager.create_session(
        session_id=session_id,
        source_type=request.source_type
    )
    return SessionResponse(session_id=session.session_id)
```

**RAG Chat:**
```python
# app/api/routes/rag.py
@router.post("/chat", response_model=RAGResponse)
async def rag_chat(
    request: RAGRequest,
    pipeline: RAGPipeline = Depends(get_rag_pipeline)
):
    response = await pipeline.process_query(
        query=request.query,
        session_id=request.session_id,
        top_k=request.top_k
    )
    return response
```

---

## Environment Configuration

### `.env` File Structure

```env
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true

# Gemini API
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-pro
GEMINI_EMBEDDING_MODEL=models/embedding-001

# Session Configuration
SESSION_TTL_MINUTES=25
MAX_SESSIONS=100

# Chunking Configuration
DEFAULT_CHUNK_SIZE=1000
DEFAULT_OVERLAP=0.25

# Vector Search Configuration
DEFAULT_TOP_K=8

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# Logging
LOG_LEVEL=INFO
```

---

## Dependencies Structure

### `requirements.txt` (Production)

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
pydantic-settings==2.1.0
numpy==1.24.3
google-generativeai==0.3.0
python-docx==1.1.0
PyPDF2==3.0.1
python-multipart==0.0.6
```

### `requirements-dev.txt` (Development)

```txt
-r requirements.txt
pytest==7.4.3
pytest-asyncio==0.21.1
pytest-cov==4.1.0
black==23.11.0
flake8==6.1.0
mypy==1.7.0
httpx==0.25.1  # For testing FastAPI endpoints
```

---

## Testing Structure

### Unit Tests

Test individual components in isolation:

```python
# tests/unit/test_chunker.py
import pytest
from app.services.chunking.chunker import ChunkerService

def test_chunker_basic():
    chunker = ChunkerService()
    text = "A" * 2000  # 2000 characters
    chunks = chunker.chunk(text, max_size=1000, overlap=0.25)
    assert len(chunks) > 1
    assert all(len(chunk.text) <= 1000 for chunk in chunks)
```

### Integration Tests

Test complete workflows:

```python
# tests/integration/test_rag_pipeline.py
import pytest
from app.services.rag.pipeline import RAGPipeline

@pytest.mark.asyncio
async def test_rag_pipeline_end_to_end():
    # Create session, add chunks, test query
    pipeline = RAGPipeline(...)
    response = await pipeline.process_query(
        query="Test question",
        session_id="test_session"
    )
    assert response.answer is not None
    assert len(response.sources) > 0
```

---

## Development Workflow

### 1. Setup Environment

```bash
cd python-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements-dev.txt
cp .env.example .env
# Edit .env with your API keys
```

### 2. Run Development Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Run Tests

```bash
pytest tests/
pytest tests/unit/
pytest tests/integration/
```

### 4. Code Formatting

```bash
black app/ tests/
flake8 app/ tests/
mypy app/
```

---

## Key Architectural Principles

### 1. Separation of Concerns

- **API Layer** (`/app/api`) - HTTP handling, validation
- **Service Layer** (`/app/services`) - Business logic
- **Core Layer** (`/app/core`) - Infrastructure (config, session)
- **LLM Layer** (`/app/llm`) - Provider abstraction

### 2. Dependency Injection

- Services injected via FastAPI dependencies
- Easy to test and swap implementations
- Clear dependency graph

### 3. Type Safety

- Type hints throughout
- Pydantic models for validation
- Dataclasses for data structures

### 4. Learning-First Design

- Minimal abstractions
- Clear, readable code
- Comments explaining RAG concepts
- No heavy frameworks hiding implementation

### 5. Ephemeral Storage

- All data in memory (dict-based)
- TTL-based expiration
- No database, no filesystem persistence
- Clean session lifecycle

---

## Error Handling Strategy

### Custom Exceptions

```python
# app/core/exceptions.py
class ResumeLensException(Exception):
    """Base exception for ResumeLens service."""
    pass

class SessionNotFoundError(ResumeLensException):
    """Raised when session doesn't exist or expired."""
    pass

class EmbeddingGenerationError(ResumeLensException):
    """Raised when embedding generation fails."""
    pass

class LLMGenerationError(ResumeLensException):
    """Raised when LLM generation fails."""
    pass
```

### Error Response Format

```python
# app/api/models/errors.py
class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None
    code: Optional[str] = None
```

---

## Logging Strategy

### Structured Logging

```python
# app/utils/logger.py
import logging
import sys

def setup_logging(level: str = "INFO"):
    logging.basicConfig(
        level=getattr(logging, level),
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[logging.StreamHandler(sys.stdout)]
    )

logger = logging.getLogger("resumelens")
```

### Usage in Services

```python
from app.utils.logger import logger

logger.info(f"Creating session: {session_id}")
logger.error(f"Failed to generate embedding: {error}")
```

---

## Performance Considerations

### Async/Await

- Use async for I/O operations (API calls, LLM requests)
- FastAPI native async support
- Non-blocking operations

### Batch Processing

- Batch embedding generation when possible
- Efficient NumPy operations for vector search

### Memory Management

- Cleanup expired sessions regularly
- Limit concurrent sessions
- Monitor memory usage

---

## Next Steps

1. Initialize Python project structure
2. Set up FastAPI application
3. Implement session manager
4. Build chunking service
5. Integrate Gemini embeddings
6. Implement vector search
7. Build RAG pipeline
8. Create API endpoints
9. Add tests
10. Set up Docker configuration

---

**Note**: This architecture prioritizes learning, transparency, and maintainability. Each component is self-contained and clearly demonstrates RAG concepts without heavy abstractions.

