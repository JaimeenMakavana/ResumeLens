"""Document text extraction (server-side fallback)."""
import io
from typing import BinaryIO

import PyPDF2
from docx import Document

from app.core.exceptions import DocumentProcessingError
from app.utils.logger import logger


def extract_text_from_pdf(file_content: bytes) -> str:
    """Extract text from PDF file."""
    try:
        pdf_file = io.BytesIO(file_content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        text_parts = []

        for page in pdf_reader.pages:
            text = page.extract_text()
            if text:
                text_parts.append(text)

        return "\n".join(text_parts)
    except Exception as e:
        logger.error(f"PDF extraction error: {e}")
        raise DocumentProcessingError(f"Failed to extract text from PDF: {e}")


def extract_text_from_docx(file_content: bytes) -> str:
    """Extract text from DOCX file."""
    try:
        docx_file = io.BytesIO(file_content)
        doc = Document(docx_file)
        text_parts = []

        for paragraph in doc.paragraphs:
            if paragraph.text.strip():
                text_parts.append(paragraph.text)

        return "\n".join(text_parts)
    except Exception as e:
        logger.error(f"DOCX extraction error: {e}")
        raise DocumentProcessingError(f"Failed to extract text from DOCX: {e}")

