import { Chat, Group, UserDetails } from "../context/ContextTypes";
import { publicApi, secureApi } from "./Api";

export const gruopsService = {
    async fetchGroupMembers(id:string): Promise<UserDetails[]> {

      const api = await secureApi();
      const response = await api?.get(`/groups/${id}/members`);
      return response?.data.members;
    },

};