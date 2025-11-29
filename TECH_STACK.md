# Tech Stack Guide - ResumeLens

**Purpose**: This document defines the technology stack for ResumeLens and should guide all development decisions and code implementation.

---

## Architecture Overview

- **Frontend**: Next.js (App Router) with React + TypeScript
- **Backend API**: Next.js API Routes (Node.js/TypeScript)
- **RAG Pipeline**: Python FastAPI service (background tasks)
- **Communication**: HTTP REST API between Next.js and Python service

---

## Frontend Stack

### Core Framework

- **Next.js** latest
- **React** latest
- **TypeScript**

### Document Processing (Client-Side)

- **PDF.js** - PDF text extraction
- **mammoth.js** - DOCX text extraction

### UI/UX

- **Tailwind CSS** - Styling
- **React Components** - Chat interface, document upload

### State Management

- **React Hooks** (useState, useEffect, useReducer) or **Zustand** (if needed)

### Development

- **npm/yarn/pnpm**
- **ESLint** + **Prettier**

---

## Backend API Layer (Next.js)

### Runtime

- **Node.js** (via Next.js API Routes)
- **TypeScript**

### API Endpoints

```
/session/create    - Create new ephemeral session
/session/upload    - Upload/process document
/session/embed     - Generate embeddings
/session/chat      - Chat with RAG pipeline
/session/delete    - Clear session
```

### Session Storage

- **In-memory Map/Store** (Node.js runtime)
- TTL-based expiration (20-30 minutes default)
- No database, no persistent storage

### Responsibilities

- Session management
- Proxy requests to Python service
- Handle file uploads (if server-side extraction needed)

---

## Python RAG Service (Background Tasks)

### Framework

- **FastAPI** - Lightweight async Python web framework
- **Python 3.10+**

### Core Dependencies (Minimal - For Learning)

- **numpy** - Vector operations, cosine similarity
- **requests** - HTTP calls to Gemini API
- **python-docx** - DOCX parsing
- **PyPDF2** or **pdfplumber** - PDF parsing

### Custom Implementation (No Heavy Frameworks)

- **Custom text chunker** - Character-based (800-1200 chars, 20-30% overlap)
- **Custom cosine similarity** - NumPy-based brute-force search
- **Custom prompt builder** - String templates for RAG prompts
- **Custom session manager** - In-memory dict with TTL

### Why No LangChain?

- **Too heavy** - Many abstractions hide implementation details
- **Not ideal for learning** - Prevents understanding of core RAG concepts
- **Minimal approach** - Build chunking, embedding, retrieval from scratch

### Embeddings & LLM

- **google-generativeai** (Python SDK) - Gemini API client
- **Gemini Embeddings API** - For document chunks
- **Gemini Generation API** - For RAG responses

### Vector Search

- **NumPy cosine similarity** - Simple brute-force approach
- TopK retrieval (default 6-10 chunks)
- Relevance scores attached to results

### Python Service Endpoints

```
POST /chunk        - Chunk text with metadata
POST /embed        - Generate embeddings for chunks
POST /search       - Vector similarity search
POST /rag/chat     - Full RAG pipeline (query → chunks → LLM response)
```

---

## Document Processing

### Client-Side (Preferred)

- **PDF.js** - Extract text from PDFs in browser
- **mammoth.js** - Extract text from DOCX in browser
- Text cleaning: remove empty lines, headers/footers, normalize spacing

### Server-Side (Fallback)

- **python-docx** - DOCX parsing
- **PyPDF2/pdfplumber** - PDF parsing

### Text Processing

- Remove empty lines
- Remove headers/footers
- Normalize spacing
- Preserve metadata (section, page number, source type)

---

## Chunking Strategy

### Rules

- **Max characters**: 800-1200 per chunk
- **Overlap**: 20-30% between chunks
- **Metadata preserved**: section, page number, source type (resume/JD)

### Implementation

- Custom Python function (not LangChain)
- Character-based splitting with overlap
- Store chunks in session memory

---

## Embeddings & Vector Search

### Embedding Generation

- **Gemini Embeddings API** (via google-generativeai SDK)
- Store embeddings in session memory only
- No caching beyond session lifetime

### Vector Retrieval

- **Brute-force cosine similarity** using NumPy
- Filter topK results (default 6-10)
- Attach relevance scores to each chunk

### Future Enhancement

- Optional: FAISS or Annoy for faster ANN search (still in-memory)

---

## LLM Integration

### Provider

- **Google Gemini** (Generation API)

### RAG Prompt Template

- Enforces grounding: "Use only the provided snippets"
- Instructions: "If lacking information, say so"
- Returns: Answer, snippet IDs used, confidence hint

### Implementation

- Custom prompt builder (string templates)
- No LangChain abstraction layer

---

## Session Management

### Storage

- **In-memory only** - No database, no filesystem
- Python service: dict/session store
- Node.js API: Map-based session store

### Lifecycle

- Auto-generate sessionId on start
- TTL: 20-30 minutes default
- Explicit delete via API endpoint
- Background cleanup task in Python service

### Session Data Structure

```python
{
  session_id: {
    "chunks": [],
    "embeddings": [],
    "created_at": timestamp,
    "expires_at": timestamp,
    "source_type": "resume" | "jd"
  }
}
```

---

## Communication Between Services

### Protocol

- **HTTP REST API** - Next.js API Routes ↔ Python FastAPI
- JSON request/response format

### Data Flow

1. Frontend → Next.js API Route (document upload)
2. Next.js API → Python Service (chunk + embed)
3. Frontend → Next.js API Route (chat query)
4. Next.js API → Python Service (RAG pipeline)
5. Python Service → Next.js API → Frontend (response)

### Optional Enhancement

- WebSocket for real-time streaming responses

---

## Development Environment

### Frontend

- Node.js 18+
- npm/yarn/pnpm
- VS Code / Cursor recommended

### Python Service

- Python 3.10+
- pip or poetry for dependency management
- Virtual environment (venv)

### Running Services

- Next.js dev server: `npm run dev` (port 3000)
- Python FastAPI: `uvicorn main:app --reload` (port 8000)

---

## Deployment Considerations

### Frontend

- **Vercel** (if compatible with persistent sessions) or self-hosted
- Build: Next.js static/SSR as needed

### Python Service

- **Docker** containerization recommended
- Persistent runtime (not serverless) - to maintain in-memory sessions
- Can deploy on: Railway, Render, Fly.io, or self-hosted

### Important

- Serverless functions will lose in-memory sessions on cold starts
- Use persistent runtime or container with persistent process

---

## Security & Privacy

### Principles

- No persistent storage
- No database
- No S3 or cloud storage
- Session data exists only in RAM

### Implementation

- Client-side document extraction (preferred)
- Only selected chunks sent to Gemini API (not full document)
- No logging of user documents
- Session auto-expiration and cleanup

---

## Testing & Development Tools

### Frontend

- Jest / Vitest
- React Testing Library
- TypeScript strict mode

### Python

- pytest
- Optional: mypy for type checking

---

## Key Design Principles

1. **Learning-First**: Minimal abstractions, build core RAG concepts from scratch
2. **Lightweight**: Avoid heavy frameworks (no LangChain)
3. **Ephemeral**: Zero persistent storage
4. **Transparent**: Code should clearly show RAG pipeline steps
5. **Modular**: Easy to swap components (embeddings, vector search, LLM)

---

## Dependencies Summary

### Frontend (package.json)

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "typescript": "^5.x",
    "pdfjs-dist": "^3.x",
    "mammoth": "^1.x",
    "tailwindcss": "^3.x"
  }
}
```

### Python (requirements.txt)

```txt
fastapi==0.104.1
uvicorn[standard]==0.24.0
numpy==1.24.3
requests==2.31.0
python-docx==1.1.0
PyPDF2==3.0.1
google-generativeai==0.3.0
```

---

## Future Enhancements (When Ready)

- **FAISS** - Faster vector similarity (in-memory ANN)
- **Local embeddings** - WASM-based models for zero upstream transfer
- **WebSocket** - Real-time streaming responses
- **Full client-side RAG** - Remove server dependency entirely

---

**Note**: This stack is intentionally lightweight and educational. Avoid adding heavy frameworks unless absolutely necessary for learning objectives.
