"""Gemini LLM client implementation."""
import google.generativeai as genai

from app.core.config import settings
from app.llm.client import LLMClient
from app.utils.logger import logger


class GeminiClient(LLMClient):
    """Gemini implementation of LLM client."""

    def __init__(self, api_key: str | None = None, model: str | None = None):
        # CRITICAL FIX: Use available model - gemini-1.5-flash doesn't exist!
        # Available models: gemini-2.5-flash, gemini-2.0-flash, gemini-flash-latest
        self.model_name = "gemini-2.5-flash"
        
        # Print to stdout to ensure we see it
        print(f"=== GeminiClient.__init__ called - Model: {self.model_name} ===")
        import sys
        sys.stdout.flush()
        
        self.api_key = api_key or settings.gemini_api_key
        
        logger.info(f"=== GeminiClient initialized with HARDCODED model: {self.model_name} ===")
        logger.info(f"Config model was: {settings.gemini_model}")
        logger.info(f"Parameter model was: {model}")
        
        # Skip all validation since we're hardcoding
        genai.configure(api_key=self.api_key)
        print(f"=== Creating GenerativeModel with: {self.model_name} ===")
        sys.stdout.flush()
        self.model = genai.GenerativeModel(self.model_name)
        print(f"=== GenerativeModel created successfully ===")
        sys.stdout.flush()
        logger.info(f"GenerativeModel created with: {self.model_name}")
        return
        
        # OLD CODE BELOW (commented out for debugging)
        raw_model_name = model or settings.gemini_model
        
        # Validate and clean model name (remove "models/" prefix if present)
        if self.model_name.startswith("models/"):
            self.model_name = self.model_name.replace("models/", "")
            logger.warning(f"Removed 'models/' prefix, now: {self.model_name}")
        
        # Fix common typos and normalize
        original_name = self.model_name
        
        # Fix double 'g' first (ggemini -> gemini) - use regex to avoid partial matches
        import re
        if re.search(r'gg+emini', self.model_name, re.IGNORECASE):
            self.model_name = re.sub(r'gg+emini', 'gemini', self.model_name, flags=re.IGNORECASE)
            logger.warning(f"Fixed double 'g' typo from '{original_name}' to '{self.model_name}'")
        
        # Fix missing 'g' (emini -> gemini) but only if "gemini" is not already present
        if "gemini" not in self.model_name.lower() and re.search(r'\bemini\b', self.model_name, re.IGNORECASE):
            self.model_name = re.sub(r'\bemini\b', 'gemini', self.model_name, flags=re.IGNORECASE)
            logger.warning(f"Fixed missing 'g' typo from '{original_name}' to '{self.model_name}'")
        
        # Reject known invalid model names FIRST (like gemini-2.5-flash which doesn't exist)
        invalid_models = ["2.5-flash", "2.5-pro", "3.0"]
        if any(invalid in self.model_name.lower() for invalid in invalid_models):
            logger.error(f"Invalid model name detected: {self.model_name}. This model does not exist.")
            self.model_name = "gemini-1.5-flash"
            logger.warning(f"Using fallback model: {self.model_name}")
        
        # Validate model name - ensure it starts with "gemini"
        if not self.model_name.lower().startswith("gemini"):
            logger.error(f"Invalid model name: {self.model_name}. Must start with 'gemini'")
            # Fallback to default valid model
            self.model_name = "gemini-1.5-flash"
            logger.warning(f"Using fallback model: {self.model_name}")
        
        # Final validation - ensure it's a valid model name
        valid_models = ["gemini-pro", "gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.0-flash-exp"]
        if self.model_name.lower() not in [m.lower() for m in valid_models]:
            # Check if it's close to a valid model
            if "1.5" not in self.model_name and "2.0" not in self.model_name and "pro" not in self.model_name.lower():
                logger.error(f"Model name '{self.model_name}' doesn't match known valid models. Using fallback.")
                self.model_name = "gemini-1.5-flash"
                logger.warning(f"Using fallback model: {self.model_name}")
        
        logger.info(f"Final model name: {self.model_name}")
        
        # CRITICAL: Double-check before creating model
        if "2.5" in self.model_name or "ggemini" in self.model_name.lower():
            logger.error(f"CRITICAL: Invalid model still present: {self.model_name} - FORCING FIX")
            self.model_name = "gemini-1.5-flash"
        
        # Ensure it's a valid model
        valid_models = ["gemini-pro", "gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.0-flash-exp"]
        if self.model_name.lower() not in [m.lower() for m in valid_models]:
            logger.error(f"CRITICAL: Model {self.model_name} not in valid list - FORCING gemini-1.5-flash")
            self.model_name = "gemini-1.5-flash"
        
        logger.info(f"Creating GenerativeModel with: {self.model_name}")
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(self.model_name)
        logger.info(f"Model created successfully. Model object: {self.model}")

    async def generate(self, prompt: str, **kwargs) -> str:
        """Generate text response from prompt."""
        # CRITICAL: Double-check and fix model before generating
        print(f"=== generate() called - self.model_name: {self.model_name} ===")
        import sys
        sys.stdout.flush()
        
        # Force check the model object
        if hasattr(self.model, '_model_name'):
            actual_model = self.model._model_name
            print(f"=== Model object _model_name: {actual_model} ===")
            sys.stdout.flush()
            # Remove "models/" prefix for comparison
            model_clean = actual_model.replace("models/", "") if actual_model.startswith("models/") else actual_model
            # Fix invalid models: ggemini (typo) or 1.5 (doesn't exist)
            if 'ggemini' in model_clean.lower() or '1.5' in model_clean:
                print(f"=== ERROR: Invalid model in object! Recreating with gemini-2.5-flash... ===")
                sys.stdout.flush()
                self.model_name = "gemini-2.5-flash"
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel(self.model_name)
                print(f"=== Recreated model with: {self.model_name} ===")
                sys.stdout.flush()
        
        # Also check self.model_name - fix if it's invalid
        if 'ggemini' in self.model_name.lower() or '1.5' in self.model_name:
            print(f"=== ERROR: Invalid model in self.model_name! Fixing to gemini-2.5-flash... ===")
            sys.stdout.flush()
            self.model_name = "gemini-2.5-flash"
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel(self.model_name)
            print(f"=== Fixed and recreated model ===")
            sys.stdout.flush()
        
        logger.info(f"Generating with model: {self.model_name}")
        logger.info(f"Model object name: {self.model._model_name if hasattr(self.model, '_model_name') else 'unknown'}")
        try:
            response = await self.model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            logger.error(f"Gemini generation error: {e}")
            logger.error(f"Model name being used: {self.model_name}")
            logger.error(f"Model object: {self.model}")
            # Try to get the actual model name from the error
            error_str = str(e)
            if "models/" in error_str:
                import re
                match = re.search(r'models/([^\s"]+)', error_str)
                if match:
                    logger.error(f"ERROR: Model name from error message: models/{match.group(1)}")
            raise

