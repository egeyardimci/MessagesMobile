import { publicApi, secureApi } from "./Api";
  
export const messagesService = {
    async getUserMessages(): Promise<MessageData|null> {
      const api = await secureApi();
      const response = await api?.get<MessageData>('/messages');
      return response?.data || null;
    },

    async getUserChat(participant:string): Promise<MessageData|null> {
      const body = {participant: participant};
      const api = await secureApi();
      const response = await api?.post<MessageData>('/messages/get',body);
      return response?.data || null;
    },
};