import { publicApi, secureApi } from "./Api";
  
export const messagesService = {
    async getUserMessages(): Promise<MessageData|null> {
      const api = await secureApi();
      const response = await api?.get<MessageData>('/messages');
      return response?.data || null;
    }
};