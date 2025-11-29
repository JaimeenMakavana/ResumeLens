#!/usr/bin/env python3
"""Test script for ResumeLens RAG Pipeline.

This script tests the complete flow:
1. Create session
2. Upload document (chunk + embed)
3. Send chat query
"""

import json
import sys
import time
from typing import Dict, Any

import requests

FRONTEND_URL = "http://localhost:3000"
PYTHON_URL = "http://localhost:8000"


def print_step(step: int, message: str):
    """Print a formatted step message."""
    emoji = ["📝", "📄", "💬", "✅"][step - 1] if step <= 4 else "🔍"
    print(f"{emoji} Step {step}: {message}")


def create_session(source_type: str = "resume") -> str:
    """Create a new session and return the session ID."""
    print_step(1, "Creating session...")
    
    response = requests.post(
        f"{FRONTEND_URL}/api/session/create",
        json={"sourceType": source_type},
        headers={"Content-Type": "application/json"},
    )
    
    if not response.ok:
        print(f"❌ Failed to create session: {response.text}")
        sys.exit(1)
    
    data = response.json()
    session_id = data.get("sessionId")
    
    if not session_id:
        print(f"❌ Invalid session response: {data}")
        sys.exit(1)
    
    print(f"✅ Session created: {session_id}\n")
    return session_id


def upload_document(session_id: str, text: str, source_type: str = "resume") -> None:
    """Upload and process a document (chunk + embed)."""
    print_step(2, "Uploading document...")
    
    response = requests.post(
        f"{FRONTEND_URL}/api/session/upload",
        json={
            "sessionId": session_id,
            "text": text,
            "sourceType": source_type,
        },
        headers={"Content-Type": "application/json"},
    )
    
    if not response.ok:
        error_data = response.json() if response.headers.get("content-type", "").startswith("application/json") else {}
        error_msg = error_data.get("error") or error_data.get("detail") or response.text
        print(f"❌ Failed to upload document: {error_msg}")
        sys.exit(1)
    
    print("✅ Document uploaded and processed\n")


def send_chat_query(session_id: str, query: str) -> Dict[str, Any]:
    """Send a chat query and return the response."""
    print_step(3, "Sending chat query...")
    
    response = requests.post(
        f"{FRONTEND_URL}/api/session/chat",
        json={
            "sessionId": session_id,
            "query": query,
        },
        headers={"Content-Type": "application/json"},
    )
    
    if not response.ok:
        error_data = response.json() if response.headers.get("content-type", "").startswith("application/json") else {}
        error_msg = error_data.get("error") or error_data.get("detail") or response.text
        print(f"❌ Chat query failed: {error_msg}")
        sys.exit(1)
    
    data = response.json()
    print("✅ Chat response received:")
    print(json.dumps(data, indent=2))
    print()
    return data


def main():
    """Run the complete test flow."""
    print("🚀 Testing ResumeLens RAG Pipeline")
    print("=" * 40)
    print()
    
    # Sample resume text
    sample_resume = """Vivek Kumar
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
Bachelor of Science in Computer Science | University | 2018"""
    
    try:
        # Step 1: Create session
        session_id = create_session("resume")
        
        # Step 2: Upload document
        upload_document(session_id, sample_resume, "resume")
        
        # Wait a moment for processing
        time.sleep(2)
        
        # Step 3: Send chat query
        chat_response = send_chat_query(
            session_id,
            "How many years of experience does Vivek have?"
        )
        
        print("🎉 All tests passed!")
        print()
        print(f"Session ID: {session_id}")
        print("You can use this session ID for more queries:")
        print(f"  curl -X POST '{FRONTEND_URL}/api/session/chat' \\")
        print(f"    -H 'Content-Type: application/json' \\")
        print(f"    -d '{{\"sessionId\":\"{session_id}\",\"query\":\"your question here\"}}'")
        
    except requests.exceptions.ConnectionError:
        print("❌ Connection error: Make sure both services are running:")
        print(f"   - Frontend: {FRONTEND_URL}")
        print(f"   - Python Service: {PYTHON_URL}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

