import { apiClient, endpoints } from "@/lib/api";
import {
  CreateSessionRequest,
  CreateSessionResponse,
} from "@/types";

export const sessionService = {
  async createSession(
    sourceType: CreateSessionRequest["sourceType"]
  ): Promise<CreateSessionResponse> {
    return apiClient.post<CreateSessionResponse>(
      endpoints.session.create,
      { sourceType }
    );
  },

  async deleteSession(sessionId: string): Promise<void> {
    await apiClient.delete(endpoints.session.delete(sessionId));
  },
};

