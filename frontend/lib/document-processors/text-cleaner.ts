/**
 * Text cleaning and normalization utilities
 */

export function removeEmptyLines(text: string): string {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");
}

export function normalizeWhitespace(text: string): string {
  // Replace multiple spaces with single space
  text = text.replace(/ +/g, " ");
  // Replace multiple newlines with double newline
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

export function cleanText(text: string): string {
  // Remove empty lines
  text = removeEmptyLines(text);
  // Normalize whitespace
  text = normalizeWhitespace(text);
  return text;
}

