"""Text manipulation utilities."""
import re
from typing import List


def normalize_whitespace(text: str) -> str:
    """Normalize whitespace in text."""
    # Replace multiple spaces with single space
    text = re.sub(r" +", " ", text)
    # Replace multiple newlines with double newline
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def remove_empty_lines(text: str) -> str:
    """Remove empty lines from text."""
    lines = [line.strip() for line in text.split("\n") if line.strip()]
    return "\n".join(lines)


def clean_text(text: str) -> str:
    """Clean and normalize text."""
    # Remove empty lines
    text = remove_empty_lines(text)
    # Normalize whitespace
    text = normalize_whitespace(text)
    return text


def split_into_sentences(text: str) -> List[str]:
    """Split text into sentences."""
    # Simple sentence splitting on periods, exclamation, question marks
    sentences = re.split(r"[.!?]+\s+", text)
    return [s.strip() for s in sentences if s.strip()]

