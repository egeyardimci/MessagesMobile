import { UserDetails } from "../context/ContextTypes";
import {secureApi } from "./Api";
  
export const friendsService = {
    async getUserFriends(): Promise<UserDetails[]|null> {
      const api = await secureApi();
      const response = await api?.get<UserDetails[]>('/friends');
      return response?.data || null;
    }
};