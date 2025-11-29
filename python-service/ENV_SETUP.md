# Environment Setup Guide

## Quick Start

1. **Copy the example file:**

   ```bash
   cp .env.example .env
   ```

2. **Get your Gemini API Key:**

   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key
   - Copy the key

3. **Update `.env` file:**

   - Open `.env` file
   - Replace `your_gemini_api_key_here` with your actual API key

4. **Verify configuration:**
   - Check that `API_PORT=8000` (default)
   - Ensure `CORS_ORIGINS` includes your frontend URL (default: `http://localhost:3000`)

## Required Variables

### Must Set:

- `GEMINI_API_KEY` - Your Google Gemini API key (required for embeddings and LLM)

### Optional (have defaults):

- `API_HOST` - Server host (default: `0.0.0.0`)
- `API_PORT` - Server port (default: `8000`)
- `SESSION_TTL_MINUTES` - Session expiration time (default: `25`)
- `DEFAULT_CHUNK_SIZE` - Text chunk size (default: `1000`)
- `DEFAULT_OVERLAP` - Chunk overlap ratio (default: `0.25`)
- `DEFAULT_TOP_K` - Number of chunks to retrieve (default: `8`)
- `CORS_ORIGINS` - Allowed frontend origins (default: `http://localhost:3000`)

## Testing Your Setup

After setting up `.env`, test the service:

```bash
# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Run the service
uvicorn app.main:app --reload
```

You should see:

```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

Visit `http://localhost:8000/health` to verify the service is running.

## Troubleshooting

### "GEMINI_API_KEY is required"

- Make sure you've set `GEMINI_API_KEY` in your `.env` file
- Check that the `.env` file is in the `python-service/` directory
- Restart the server after updating `.env`

### CORS Errors

- Ensure `CORS_ORIGINS` includes your frontend URL
- Default is `http://localhost:3000` for Next.js
- Add multiple origins separated by commas if needed

### Port Already in Use

- Change `API_PORT` to a different port (e.g., `8001`)
- Update frontend `.env.local` to match the new port
