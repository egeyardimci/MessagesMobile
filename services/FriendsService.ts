import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { UserDetails } from "../context/ContextTypes";
import {secureApi } from "./Api";
  
export const friendsService = {
    async getUserFriends(): Promise<UserDetails[]|null> {
      const api = await secureApi();
      const response = await api?.get<UserDetails[]>('/friends');
      return response?.data || null;
    },

    async sendFriendRequest(friendRequestData: FriendRequestData): Promise<GenericResponse|null> {
      const api = await secureApi();
      const response = await api?.post<GenericResponse>('/friends/add',friendRequestData);
      return response?.data || null;
    },

    async acceptFriendRequest(friendRequestData: FriendRequestData): Promise<GenericResponse|null> {
      const api = await secureApi();
      const response = await api?.post<GenericResponse>('/friends/accept',friendRequestData);
      return response?.data || null;
    },

    async getFriendRequests(): Promise<UserDetails[]|null> {
      const api = await secureApi();
      const response = await api?.get<UserDetails[]>('/friends/requests');
      return response?.data || null;
    },
};