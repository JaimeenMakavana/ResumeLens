export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  pythonServiceUrl:
    process.env.NEXT_PUBLIC_PYTHON_SERVICE_URL || "http://localhost:8000",
  enableChunkPreview:
    process.env.NEXT_PUBLIC_ENABLE_CHUNK_PREVIEW === "true",
} as const;

