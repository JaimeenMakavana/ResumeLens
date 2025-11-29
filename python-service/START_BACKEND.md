# 🚀 How to Start the Backend - Step by Step

## Quick Start (Easiest Method)

### Option 1: Use the Startup Script ⚡

1. **Open PowerShell** in the `python-service` directory

2. **Run the startup script:**
   ```powershell
   .\start-service.ps1
   ```

   That's it! The script will:
   - ✅ Check if virtual environment exists
   - ✅ Check if .env file exists
   - ✅ Activate the virtual environment
   - ✅ Install dependencies if needed
   - ✅ Start the FastAPI server

---

## Manual Method (If you prefer step-by-step control)

### Step 1: Navigate to Python Service Directory
```powershell
cd python-service
```

### Step 2: Activate Virtual Environment
```powershell
.\venv\Scripts\Activate.ps1
```

You should see `(venv)` appear in your terminal prompt.

### Step 3: Verify Environment Variables
Check that your `.env` file has `GEMINI_API_KEY` set:
```powershell
Get-Content .env | Select-String "GEMINI_API_KEY"
```

### Step 4: Install Dependencies (if needed)
```powershell
pip install -r requirements.txt
```

### Step 5: Start the Server
```powershell
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## ✅ Verify It's Running

1. **Check the terminal output** - You should see:
   ```
   INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
   INFO:     Started reloader process
   INFO:     Started server process
   INFO:     Waiting for application startup.
   INFO:     Application startup complete.
   ```

2. **Test in browser** - Open: http://localhost:8000/health
   - Should return: `{"status":"healthy"}`

3. **Check API docs** - Open: http://localhost:8000/docs
   - You should see the FastAPI interactive documentation

---

## 🔧 Troubleshooting

### Port 8000 Already in Use
If port 8000 is already taken, you can:
- **Option A**: Change the port in `.env`:
  ```
  API_PORT=8001
  ```
  Then update frontend `.env.local`:
  ```
  NEXT_PUBLIC_PYTHON_SERVICE_URL=http://localhost:8001
  ```

- **Option B**: Stop the process using port 8000:
  ```powershell
  netstat -ano | findstr :8000
  taskkill /PID <PID_NUMBER> /F
  ```

### "GEMINI_API_KEY is required" Error
- Check your `.env` file in `python-service/` directory
- Make sure it contains: `GEMINI_API_KEY=your_actual_key_here`
- Restart the service after updating `.env`

### Virtual Environment Not Found
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### Module Not Found Errors
```powershell
# Make sure virtual environment is activated
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt
```

---

## 📝 Next Steps

Once the backend is running:
1. ✅ Backend is running on http://localhost:8000
2. ✅ Go to your frontend directory
3. ✅ Start the Next.js frontend: `npm run dev`
4. ✅ Test the full application!

---

## 🛑 Stopping the Server

Press `Ctrl + C` in the terminal where the server is running.

---

## 📚 Additional Commands

### Run without auto-reload (production mode):
```powershell
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Run with custom port:
```powershell
python -m uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
```

### Check what's running on port 8000:
```powershell
netstat -ano | findstr :8000
```

