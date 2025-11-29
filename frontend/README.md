# ResumeLens Frontend

Next.js frontend application for ResumeLens RAG assistant.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_PYTHON_SERVICE_URL=http://localhost:8000
```

## Running

```bash
npm run dev
```

## Features

- Role selection (Recruiter/Job Seeker)
- Document upload and processing
- Chat interface with RAG
- Session management
