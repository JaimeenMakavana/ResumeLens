import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/constants";
import { CreateSessionRequest } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: CreateSessionRequest = await request.json();

    // Transform camelCase to snake_case for Python service
    const pythonRequestBody = {
      source_type: body.sourceType,
    };

    const response = await fetch(
      `${config.pythonServiceUrl}/api/session/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pythonRequestBody),
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        error: `HTTP ${response.status}: ${response.statusText}`,
      }));
      return NextResponse.json(
        { error: error.error || "Failed to create session" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform Python service response (snake_case) to frontend format (camelCase)
    return NextResponse.json({
      sessionId: data.session_id,
      expiresAt: data.expires_at,
      sourceType: data.source_type,
      createdAt: data.created_at,
    });
  } catch (error) {
    // Log full error details for debugging
    console.error("Session creation error:", error);
    console.error(
      "Error type:",
      error instanceof Error ? error.constructor.name : typeof error
    );
    console.error(
      "Error message:",
      error instanceof Error ? error.message : String(error)
    );
    console.error("Python service URL:", config.pythonServiceUrl);

    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : String(error);
    const isNetworkError =
      errorMessage.includes("fetch") ||
      errorMessage.includes("ECONNREFUSED") ||
      errorMessage.includes("ECONNRESET") ||
      errorMessage.includes("network") ||
      errorMessage.includes("Failed to fetch");

    return NextResponse.json(
      {
        error: isNetworkError
          ? `Failed to connect to Python service at ${config.pythonServiceUrl}. Please ensure it's running on port 8000.`
          : `Internal server error: ${errorMessage}`,
        detail: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
