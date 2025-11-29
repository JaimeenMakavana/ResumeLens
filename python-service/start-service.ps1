# Start script for ResumeLens Python Service (PowerShell)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ResumeLens Python Service Startup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if virtual environment exists
if (-not (Test-Path "venv\Scripts\Activate.ps1")) {
    Write-Host "[ERROR] Virtual environment not found!" -ForegroundColor Red
    Write-Host "Please create it first:" -ForegroundColor Yellow
    Write-Host "  python -m venv venv" -ForegroundColor White
    Write-Host "  .\venv\Scripts\Activate.ps1" -ForegroundColor White
    Write-Host "  pip install -r requirements.txt" -ForegroundColor White
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "[WARNING] .env file not found!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Write-Host "Please add your GEMINI_API_KEY to the .env file." -ForegroundColor Yellow
    Write-Host ""
    
    @"
# Python Service Configuration
GEMINI_API_KEY=your_gemini_api_key_here
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:3000
"@ | Out-File -FilePath ".env" -Encoding utf8
    
    Write-Host ".env file created. Please edit it and add your GEMINI_API_KEY." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Activate virtual environment
Write-Host "Activating virtual environment..." -ForegroundColor Green
& "venv\Scripts\Activate.ps1"

# Check if dependencies are installed
try {
    python -c "import fastapi" 2>$null
    if ($LASTEXITCODE -ne 0) {
        throw "FastAPI not installed"
    }
} catch {
    Write-Host "[WARNING] Dependencies not installed!" -ForegroundColor Yellow
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    pip install -r requirements.txt
    Write-Host ""
}

Write-Host ""
Write-Host "Starting Python service on http://localhost:8000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the service" -ForegroundColor Yellow
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start the service
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

