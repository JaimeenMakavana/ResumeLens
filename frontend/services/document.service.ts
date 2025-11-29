import { apiClient, endpoints } from "@/lib/api";
import {
  UploadDocumentRequest,
  UploadDocumentResponse,
} from "@/types";

export const documentService = {
  async uploadDocument(
    request: UploadDocumentRequest
  ): Promise<UploadDocumentResponse> {
    return apiClient.post<UploadDocumentResponse>(
      endpoints.session.upload,
      request
    );
  },
};

