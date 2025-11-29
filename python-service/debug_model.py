#!/usr/bin/env python3
"""Debug script to check what model name is actually being used."""
import sys
import os

# Add the app directory to path
sys.path.insert(0, os.path.dirname(__file__))

from app.core.config import settings
from app.llm.gemini_client import GeminiClient

print("=" * 60)
print("DEBUG: Model Configuration")
print("=" * 60)
print(f"GEMINI_MODEL from .env: {settings.gemini_model}")
print(f"GEMINI_API_KEY set: {'Yes' if settings.gemini_api_key else 'No'}")
print()

# Check environment variables
env_model = os.getenv("GEMINI_MODEL")
if env_model:
    print(f"⚠️  WARNING: GEMINI_MODEL environment variable is set to: {env_model}")
    print(f"   This will override .env file!")
else:
    print("✓ No GEMINI_MODEL environment variable (using .env file)")

print()
print("Creating GeminiClient instance...")
print("-" * 60)

try:
    client = GeminiClient()
    print(f"✓ Client created successfully")
    print(f"✓ Final model name: {client.model_name}")
    print(f"✓ Model object: {client.model}")
except Exception as e:
    print(f"✗ Error creating client: {e}")
    import traceback
    traceback.print_exc()

print("=" * 60)

