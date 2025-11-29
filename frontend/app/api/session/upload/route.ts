import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/constants";
import { UploadDocumentRequest } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: UploadDocumentRequest = await request.json();

    // First, chunk the text
    const chunkResponse = await fetch(
      `${config.pythonServiceUrl}/api/chunk`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: body.text,
          session_id: body.sessionId,
          source_type: body.sourceType,
        }),
      }
    );

    if (!chunkResponse.ok) {
      const error = await chunkResponse.json().catch(() => ({
        error: `HTTP ${chunkResponse.status}: ${chunkResponse.statusText}`,
      }));
      return NextResponse.json(
        { error: error.error || "Failed to chunk document" },
        { status: chunkResponse.status }
      );
    }

    const chunkData = await chunkResponse.json();

    // Transform chunks to match frontend types (camelCase)
    const transformedChunks = chunkData.chunks.map((chunk: any) => ({
      id: chunk.id,
      text: chunk.text,
      index: chunk.index,
      metadata: {
        section: chunk.metadata.section,
        pageNumber: chunk.metadata.page_number,
        sourceType: chunk.metadata.source_type,
      },
    }));

    // Then, generate embeddings
    // Ensure chunks are in the correct format (snake_case for Python service)
    const chunksForEmbedding = chunkData.chunks.map((chunk: any) => ({
      id: chunk.id,
      text: chunk.text,
      index: chunk.index,
      metadata: {
        section: chunk.metadata?.section || null,
        page_number: chunk.metadata?.page_number || chunk.metadata?.pageNumber || null,
        source_type: chunk.metadata?.source_type || chunk.metadata?.sourceType || body.sourceType,
      },
    }));

    const embedResponse = await fetch(
      `${config.pythonServiceUrl}/api/embed`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: body.sessionId,
          chunks: chunksForEmbedding,
        }),
      }
    );

    if (!embedResponse.ok) {
      const errorData = await embedResponse.json().catch(() => ({
        error: `HTTP ${embedResponse.status}: ${embedResponse.statusText}`,
        detail: "Could not parse error response",
      }));
      
      // Log detailed error for debugging
      console.error("Embedding generation failed:", {
        status: embedResponse.status,
        error: errorData.error || errorData.detail,
        detail: errorData.detail,
        chunksCount: chunksForEmbedding.length,
      });
      
      // Provide user-friendly error message for quota errors
      let errorMessage = errorData.error || errorData.detail || "Failed to generate embeddings";
      if (embedResponse.status === 429 || errorMessage.includes("quota")) {
        errorMessage = 
          "API quota exceeded. The Gemini API free tier has limited embedding requests. " +
          "Please wait a few minutes and try again, or check your API plan at https://ai.google.dev/pricing";
      }
      
      return NextResponse.json(
        { 
          error: errorMessage,
          detail: errorData.detail || errorData.message,
        },
        { status: embedResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      chunkCount: chunkData.total_chunks,
    });
  } catch (error) {
    console.error("Document upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

