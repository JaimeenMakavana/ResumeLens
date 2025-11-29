import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/constants";
import { ChatRequest } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();

    // Transform camelCase to snake_case for Python service
    const pythonRequestBody = {
      session_id: body.sessionId,
      query: body.query,
      top_k: body.topK ?? 8,
    };

    const response = await fetch(`${config.pythonServiceUrl}/api/rag/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pythonRequestBody),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        detail: `HTTP ${response.status}: ${response.statusText}`,
      }));
      // FastAPI returns errors with 'detail' field, not 'error'
      const errorMessage =
        error.detail || error.error || "Failed to process chat query";
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
