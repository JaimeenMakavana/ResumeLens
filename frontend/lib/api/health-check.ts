import { config } from "@/lib/constants";

export interface HealthCheckResult {
  isHealthy: boolean;
  message: string;
  serviceUrl: string;
}

/**
 * Check if the Python service is running and accessible.
 * @param timeout - Request timeout in milliseconds (default: 5000)
 * @returns Health check result
 */
export async function checkPythonServiceHealth(
  timeout: number = 5000
): Promise<HealthCheckResult> {
  const serviceUrl = config.pythonServiceUrl;
  const healthUrl = `${serviceUrl}/health`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(healthUrl, {
      method: "GET",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        isHealthy: true,
        message: "Python service is running",
        serviceUrl,
      };
    } else {
      return {
        isHealthy: false,
        message: `Python service returned status ${response.status}`,
        serviceUrl,
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    // Check for specific error types
    if (error instanceof Error && error.name === "AbortError") {
      return {
        isHealthy: false,
        message: `Connection timeout: Python service did not respond within ${timeout}ms`,
        serviceUrl,
      };
    }

    if (
      errorMessage.includes("ECONNREFUSED") ||
      errorMessage.includes("Failed to fetch") ||
      errorMessage.includes("network")
    ) {
      return {
        isHealthy: false,
        message: `Cannot connect to Python service at ${serviceUrl}. Please ensure it's running on port 8000.`,
        serviceUrl,
      };
    }

    return {
      isHealthy: false,
      message: `Health check failed: ${errorMessage}`,
      serviceUrl,
    };
  }
}

