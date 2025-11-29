/**
 * PDF text extraction using PDF.js
 * Uses dynamic imports to prevent SSR issues with browser-only APIs
 */

export async function extractTextFromPDF(file: File): Promise<string> {
  // Ensure we're in the browser environment
  if (typeof window === "undefined") {
    throw new Error("PDF extraction is only available in the browser");
  }

  try {
    // Dynamically import PDF.js only on the client side
    const pdfjsLib = await import("pdfjs-dist");

    // Set worker source - use a reliable CDN or local worker
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;
    const textParts: string[] = [];

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(" ");
      textParts.push(pageText);
    }

    return textParts.join("\n");
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw new Error("Failed to extract text from PDF");
  }
}
