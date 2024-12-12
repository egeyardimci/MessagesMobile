import { Chat, Group, UserDetails } from "../context/ContextTypes";
import { publicApi, secureApi } from "./Api";

export const gruopsService = {
    async fetchGroupMembers(id:string): Promise<UserDetails[]> {
      const api = await secureApi();
      const response = await api?.get(`/groups/${id}/members`);
      return response?.data.members;
    },

    async addGroupMember(id:string,email:string): Promise<UserDetails[]> {
      const body = {email: email}
      const api = await secureApi();
      const response = await api?.post(`/groups/${id}/add-member`,body);
      return response?.data.members;
    },

};