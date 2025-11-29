"""Unit tests for text cleaning utilities."""
from app.utils.text_utils import clean_text, remove_empty_lines, normalize_whitespace


def test_remove_empty_lines():
    """Test removing empty lines."""
    text = "Line 1\n\n\nLine 2\n  \nLine 3"
    result = remove_empty_lines(text)
    assert "\n\n" not in result
    assert "Line 1" in result
    assert "Line 2" in result
    assert "Line 3" in result


def test_normalize_whitespace():
    """Test whitespace normalization."""
    text = "Multiple    spaces   here"
    result = normalize_whitespace(text)
    assert "  " not in result


def test_clean_text():
    """Test complete text cleaning."""
    text = "Line 1\n\n\nLine 2\n   Multiple    spaces"
    result = clean_text(text)
    assert "\n\n" not in result
    assert "  " not in result

