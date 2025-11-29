# Quick Start Guide - Python Service

## 🚀 Fastest Way to Start (Windows)

### Option 1: Use the Startup Script (Recommended)

**PowerShell:**
```powershell
.\start-service.ps1
```

**Command Prompt:**
```cmd
start-service.bat
```

### Option 2: Manual Steps

1. **Open PowerShell or Command Prompt** in the `python-service` directory

2. **Activate the virtual environment:**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
   Or in Command Prompt:
   ```cmd
   venv\Scripts\activate.bat
   ```

3. **Verify .env file exists** (should already exist, but check it has your `GEMINI_API_KEY`)

4. **Start the service:**
   ```powershell
   python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

5. **Verify it's running:**
   - Open browser: http://localhost:8000/health
   - Should see: `{"status":"healthy"}`

## ✅ Verification

Once started, you should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## 🔧 Troubleshooting

### "GEMINI_API_KEY is required"
- Check your `.env` file in `python-service/` directory
- Make sure it contains: `GEMINI_API_KEY=your_actual_key_here`
- Restart the service after updating `.env`

### "Port 8000 already in use"
- Another service is using port 8000
- Change port in `.env`: `API_PORT=8001`
- Update frontend `.env.local`: `NEXT_PUBLIC_PYTHON_SERVICE_URL=http://localhost:8001`

### "Module not found" errors
- Activate virtual environment first
- Install dependencies: `pip install -r requirements.txt`

### Virtual environment not found
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## 📝 Next Steps

After the service is running:
1. Go back to your Next.js frontend
2. Try creating a session again
3. The connection error should be resolved!

