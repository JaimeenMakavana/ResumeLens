import { apiClient, endpoints } from "@/lib/api";
import { ChatRequest, ChatResponse } from "@/types";

export const chatService = {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    return apiClient.post<ChatResponse>(endpoints.session.chat, request);
  },
};

