#!/bin/bash

# Test script for ResumeLens RAG Pipeline
# This script tests the complete flow: create session -> upload -> embed -> chat

set -e  # Exit on error

FRONTEND_URL="http://localhost:3000"
PYTHON_URL="http://localhost:8000"

echo "🚀 Testing ResumeLens RAG Pipeline"
echo "===================================="
echo ""

# Step 1: Create Session
echo "📝 Step 1: Creating session..."
SESSION_RESPONSE=$(curl -s -X POST "${FRONTEND_URL}/api/session/create" \
  -H "Content-Type: application/json" \
  -d '{"sourceType":"resume"}')

SESSION_ID=$(echo $SESSION_RESPONSE | grep -o '"sessionId":"[^"]*' | cut -d'"' -f4)

if [ -z "$SESSION_ID" ]; then
  echo "❌ Failed to create session"
  echo "Response: $SESSION_RESPONSE"
  exit 1
fi

echo "✅ Session created: $SESSION_ID"
echo ""

# Step 2: Upload Document (chunk + embed)
echo "📄 Step 2: Uploading document..."
SAMPLE_RESUME="Vivek Kumar
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
Bachelor of Science in Computer Science | University | 2018"

UPLOAD_RESPONSE=$(curl -s -X POST "${FRONTEND_URL}/api/session/upload" \
  -H "Content-Type: application/json" \
  -d "{
    \"sessionId\": \"$SESSION_ID\",
    \"text\": \"$SAMPLE_RESUME\",
    \"sourceType\": \"resume\"
  }")

if echo "$UPLOAD_RESPONSE" | grep -q "error"; then
  echo "❌ Failed to upload document"
  echo "Response: $UPLOAD_RESPONSE"
  exit 1
fi

echo "✅ Document uploaded and processed"
echo ""

# Wait a moment for processing
sleep 2

# Step 3: Chat Query
echo "💬 Step 3: Sending chat query..."
CHAT_RESPONSE=$(curl -s -X POST "${FRONTEND_URL}/api/session/chat" \
  -H "Content-Type: application/json" \
  -d "{
    \"sessionId\": \"$SESSION_ID\",
    \"query\": \"How many years of experience does Vivek have?\"
  }")

if echo "$CHAT_RESPONSE" | grep -q "error"; then
  echo "❌ Chat query failed"
  echo "Response: $CHAT_RESPONSE"
  exit 1
fi

echo "✅ Chat response received:"
echo "$CHAT_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$CHAT_RESPONSE"
echo ""

echo "🎉 All tests passed!"
echo ""
echo "Session ID: $SESSION_ID"
echo "You can use this session ID for more queries:"
echo "curl -X POST '${FRONTEND_URL}/api/session/chat' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"sessionId\":\"$SESSION_ID\",\"query\":\"your question here\"}'"

