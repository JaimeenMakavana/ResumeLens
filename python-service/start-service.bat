@echo off
REM Start script for ResumeLens Python Service (Windows)

echo ========================================
echo ResumeLens Python Service Startup
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "venv\Scripts\activate.bat" (
    echo [ERROR] Virtual environment not found!
    echo Please create it first:
    echo   python -m venv venv
    echo   venv\Scripts\activate
    echo   pip install -r requirements.txt
    echo.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo [WARNING] .env file not found!
    echo.
    echo Creating .env file from template...
    echo Please add your GEMINI_API_KEY to the .env file.
    echo.
    (
        echo # Python Service Configuration
        echo GEMINI_API_KEY=your_gemini_api_key_here
        echo API_HOST=0.0.0.0
        echo API_PORT=8000
        echo CORS_ORIGINS=http://localhost:3000
    ) > .env
    echo .env file created. Please edit it and add your GEMINI_API_KEY.
    echo.
    pause
    exit /b 1
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Check if dependencies are installed
python -c "import fastapi" 2>nul
if errorlevel 1 (
    echo [WARNING] Dependencies not installed!
    echo Installing dependencies...
    pip install -r requirements.txt
    echo.
)

echo.
echo Starting Python service on http://localhost:8000
echo Press Ctrl+C to stop the service
echo.
echo ========================================
echo.

REM Start the service
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

