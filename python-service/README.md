# ResumeLens Python RAG Service

FastAPI service for document processing, embeddings, vector search, and RAG pipeline.

## Setup

1. Create virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements-dev.txt
```

3. Create `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
API_HOST=0.0.0.0
API_PORT=8000
```

## Running

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

- `POST /api/session/create` - Create session
- `GET /api/session/{session_id}` - Get session
- `DELETE /api/session/{session_id}` - Delete session
- `POST /api/chunk` - Chunk text
- `POST /api/embed` - Generate embeddings
- `POST /api/search` - Vector search
- `POST /api/rag/chat` - RAG query
