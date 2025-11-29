"""Document processing orchestrator."""
from typing import BinaryIO

from app.services.document.cleaner import clean_text
from app.services.document.extractor import (
    extract_text_from_docx,
    extract_text_from_pdf,
)


def process_document(file_content: bytes, file_type: str) -> str:
    """Process document and extract cleaned text."""
    if file_type == "application/pdf":
        text = extract_text_from_pdf(file_content)
    elif file_type in [
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/msword",
    ]:
        text = extract_text_from_docx(file_content)
    elif file_type == "text/plain":
        text = file_content.decode("utf-8")
    else:
        raise ValueError(f"Unsupported file type: {file_type}")

    # Clean the text
    cleaned_text = clean_text(text)
    return cleaned_text

