import { NextResponse } from "next/server";
import { checkPythonServiceHealth } from "@/lib/api/health-check";

/**
 * Health check endpoint to verify Python service connectivity.
 * GET /api/health
 */
export async function GET() {
  try {
    const healthResult = await checkPythonServiceHealth();
    
    return NextResponse.json(
      {
        ...healthResult,
        timestamp: new Date().toISOString(),
      },
      { status: healthResult.isHealthy ? 200 : 503 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        isHealthy: false,
        message: error instanceof Error ? error.message : "Unknown error",
        serviceUrl: process.env.NEXT_PUBLIC_PYTHON_SERVICE_URL || "http://localhost:8000",
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

