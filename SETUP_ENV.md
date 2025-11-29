# Environment Variables Setup Guide

This guide will help you set up the environment variables for both the Python service and the frontend.

## Quick Setup Steps

### 1. Python Service (.env)

1. Navigate to `python-service` directory
2. Create `.env` file (copy from example):
   ```bash
   # On Windows PowerShell:
   Copy-Item .env.example .env
   
   # On Linux/Mac:
   cp .env.example .env
   ```

3. **REQUIRED: Add your Gemini API Key**
   - Get your API key from: https://makersuite.google.com/app/apikey
   - Open `.env` file
   - Replace `your_gemini_api_key_here` with your actual API key

### 2. Frontend (.env.local)

1. Navigate to `frontend` directory
2. Create `.env.local` file (copy from example):
   ```bash
   # On Windows PowerShell:
   Copy-Item .env.local.example .env.local
   
   # On Linux/Mac:
   cp .env.local.example .env.local
   ```

3. **Optional:** Update values if your services run on different ports

---

## Python Service Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | `AIzaSy...` |

**Get your API key:** https://makersuite.google.com/app/apikey

### Optional Variables (with defaults)

| Variable | Default | Description |
|----------|---------|-------------|
| `API_HOST` | `0.0.0.0` | Server host address |
| `API_PORT` | `8000` | Server port |
| `API_RELOAD` | `true` | Auto-reload on code changes |
| `GEMINI_MODEL` | `gemini-pro` | Gemini model for generation |
| `GEMINI_EMBEDDING_MODEL` | `models/embedding-001` | Gemini embedding model |
| `SESSION_TTL_MINUTES` | `25` | Session expiration time (minutes) |
| `MAX_SESSIONS` | `100` | Maximum concurrent sessions |
| `DEFAULT_CHUNK_SIZE` | `1000` | Default text chunk size (characters) |
| `DEFAULT_OVERLAP` | `0.25` | Chunk overlap ratio (25%) |
| `DEFAULT_TOP_K` | `8` | Default number of chunks to retrieve |
| `CORS_ORIGINS` | `http://localhost:3000` | Allowed frontend origins |
| `LOG_LEVEL` | `INFO` | Logging level (DEBUG, INFO, WARNING, ERROR) |

### Example .env file:

```env
# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true

# Gemini API (REQUIRED - Replace with your key)
GEMINI_API_KEY=AIzaSyYourActualApiKeyHere
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

# CORS Configuration
CORS_ORIGINS=http://localhost:3000

# Logging Configuration
LOG_LEVEL=INFO
```

---

## Frontend Environment Variables

### Required Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:3000` | Next.js API URL |
| `NEXT_PUBLIC_PYTHON_SERVICE_URL` | `http://localhost:8000` | Python RAG service URL |

### Optional Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_ENABLE_CHUNK_PREVIEW` | `false` | Enable chunk preview in UI |

### Example .env.local file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_PYTHON_SERVICE_URL=http://localhost:8000

# Feature Flags
NEXT_PUBLIC_ENABLE_CHUNK_PREVIEW=false
```

---

## Verification

### Test Python Service:

1. Start the service:
   ```bash
   cd python-service
   uvicorn app.main:app --reload
   ```

2. Check health endpoint:
   - Visit: http://localhost:8000/health
   - Should return: `{"status": "healthy"}`

### Test Frontend:

1. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

2. Check the app:
   - Visit: http://localhost:3000
   - Should show the role selection page

---

## Troubleshooting

### "GEMINI_API_KEY is required" Error

- Make sure you've created `.env` file in `python-service/` directory
- Verify the API key is set correctly (no quotes, no extra spaces)
- Restart the Python service after updating `.env`

### CORS Errors

- Ensure `CORS_ORIGINS` in Python `.env` includes your frontend URL
- Default is `http://localhost:3000`
- If Next.js runs on a different port, add it to `CORS_ORIGINS`

### Connection Refused

- Verify Python service is running on port 8000
- Check `NEXT_PUBLIC_PYTHON_SERVICE_URL` matches the Python service URL
- Ensure no firewall is blocking the connection

### Port Already in Use

- Change `API_PORT` in Python `.env` to a different port (e.g., `8001`)
- Update `NEXT_PUBLIC_PYTHON_SERVICE_URL` in frontend `.env.local` to match

---

## Security Notes

⚠️ **Important:**
- Never commit `.env` or `.env.local` files to git
- These files are already in `.gitignore`
- Keep your `GEMINI_API_KEY` secret
- Use different API keys for development and production

---

## Next Steps

After setting up environment variables:

1. Install Python dependencies:
   ```bash
   cd python-service
   pip install -r requirements-dev.txt
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Start both services and test the application!

