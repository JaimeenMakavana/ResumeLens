# Test script for ResumeLens RAG Pipeline (PowerShell)
# This script tests the complete flow: create session -> upload -> embed -> chat

$ErrorActionPreference = "Stop"

$FRONTEND_URL = "http://localhost:3000"
$PYTHON_URL = "http://localhost:8000"

Write-Host "🚀 Testing ResumeLens RAG Pipeline" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Create Session
Write-Host "📝 Step 1: Creating session..." -ForegroundColor Yellow
$sessionBody = @{
    sourceType = "resume"
} | ConvertTo-Json

try {
    $sessionResponse = Invoke-RestMethod -Uri "$FRONTEND_URL/api/session/create" `
        -Method POST `
        -ContentType "application/json" `
        -Body $sessionBody
    
    $SESSION_ID = $sessionResponse.sessionId
    Write-Host "✅ Session created: $SESSION_ID" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Failed to create session" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}

# Step 2: Upload Document
Write-Host "📄 Step 2: Uploading document..." -ForegroundColor Yellow
$sampleResume = @'
Vivek Kumar
Software Engineer
Email: vivek@example.com
Phone: +1-234-567-8900

EXPERIENCE:
Senior Software Engineer | Tech Corp | 2020 - Present
- Developed React applications with 5+ years of experience
- Led team of 5 developers
- Implemented microservices architecture

Software Engineer | Startup Inc | 2018 - 2020
- Built RESTful APIs using Node.js
- Worked with MongoDB and PostgreSQL
- 2 years of backend development experience

EDUCATION:
Bachelor of Science in Computer Science | University | 2018
'@

$uploadBody = @{
    sessionId = $SESSION_ID
    text = $sampleResume
    sourceType = "resume"
} | ConvertTo-Json

try {
    $uploadResponse = Invoke-RestMethod -Uri "$FRONTEND_URL/api/session/upload" `
        -Method POST `
        -ContentType "application/json" `
        -Body $uploadBody
    
    Write-Host "✅ Document uploaded and processed" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Failed to upload document" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}

# Wait a moment for processing
Start-Sleep -Seconds 2

# Step 3: Chat Query
Write-Host "💬 Step 3: Sending chat query..." -ForegroundColor Yellow
$chatBody = @{
    sessionId = $SESSION_ID
    query = "How many years of experience does Vivek have?"
} | ConvertTo-Json

try {
    $chatResponse = Invoke-RestMethod -Uri "$FRONTEND_URL/api/session/chat" `
        -Method POST `
        -ContentType "application/json" `
        -Body $chatBody
    
    Write-Host "✅ Chat response received:" -ForegroundColor Green
    $chatResponse | ConvertTo-Json -Depth 10
    Write-Host ""
} catch {
    Write-Host "❌ Chat query failed" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 All tests passed!" -ForegroundColor Green
Write-Host ""
Write-Host "Session ID: $SESSION_ID" -ForegroundColor Cyan
Write-Host "You can use this session ID for more queries:" -ForegroundColor Cyan
Write-Host "Invoke-RestMethod -Uri '$FRONTEND_URL/api/session/chat' -Method POST -ContentType 'application/json' -Body (@{sessionId='$SESSION_ID';query='your question here'} | ConvertTo-Json)"

