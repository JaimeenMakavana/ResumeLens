import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/constants";
import { EmbedRequest } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: EmbedRequest = await request.json();

    // Transform camelCase to snake_case for Python service
    const pythonRequestBody = {
      session_id: body.sessionId,
      chunks: body.chunks,
    };

    const response = await fetch(`${config.pythonServiceUrl}/api/embed`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pythonRequestBody),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: `HTTP ${response.status}: ${response.statusText}`,
      }));
      return NextResponse.json(
        { error: error.error || "Failed to generate embeddings" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Embedding generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

