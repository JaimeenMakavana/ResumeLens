# Frontend Environment Setup Guide

## Quick Start

1. **Copy the example file:**

   ```bash
   cp .env.local.example .env.local
   ```

2. **Update values if needed:**
   - Default values work for local development
   - Only change if your services run on different ports

## Environment Variables

### Required:

- `NEXT_PUBLIC_API_URL` - Your Next.js API URL (default: `http://localhost:3000`)
- `NEXT_PUBLIC_PYTHON_SERVICE_URL` - Python RAG service URL (default: `http://localhost:8000`)

### Optional:

- `NEXT_PUBLIC_ENABLE_CHUNK_PREVIEW` - Show chunk preview in UI (default: `false`)

## Default Configuration

The default configuration assumes:

- Next.js frontend runs on port `3000`
- Python service runs on port `8000`

If your services run on different ports, update `.env.local` accordingly.

## Testing Your Setup

1. **Start Python service:**

   ```bash
   cd python-service
   uvicorn app.main:app --reload
   ```

2. **Start Next.js frontend:**

   ```bash
   cd frontend
   npm run dev
   ```

3. **Verify:**
   - Frontend: http://localhost:3000
   - Python API: http://localhost:8000/health

## Troubleshooting

### "Failed to connect to Python service"

- Verify Python service is running on port 8000
- Check `NEXT_PUBLIC_PYTHON_SERVICE_URL` matches your Python service URL
- Ensure CORS is configured in Python service

### Port Conflicts

- If port 3000 is in use, Next.js will automatically use the next available port
- Update `NEXT_PUBLIC_API_URL` if Next.js uses a different port
- Or specify port: `npm run dev -- -p 3001`
