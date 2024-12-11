import { Chat, Group, UserDetails } from "../context/ContextTypes";
import { publicApi, secureApi } from "./Api";

export const userService = {
    async fetchUserDetails(): Promise<UserDetails> {
      const api = await secureApi();
      const response = await api?.get('/user/details');
      return response?.data;
    },

    async fetchUserGroups(): Promise<Group[]> {
      const api = await secureApi();
      const response = await api?.get('/user/groups');
      return response?.data.groups;
    },

    async fetchUserChats(): Promise<Chat[]> {
      const api = await secureApi();
      const response = await api?.get('/user/chats');
      return response?.data.uniqueChats;
    },
};