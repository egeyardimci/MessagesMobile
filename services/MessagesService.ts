import { publicApi, secureApi } from "./Api";

type MessageData = {
    messageList: [
        {
          id: string,
          timestamp: string,
          content: string,
          sender: string,
          receiver: string,
          groupMessage: boolean
        }
      ]
  };
  
export const messagesService = {
    async getUserMessages(): Promise<MessageData|null> {
      const api = await secureApi();
      const response = await api?.get<MessageData>('/messages');
      return response?.data || null;
    }
};