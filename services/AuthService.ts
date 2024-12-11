import { publicApi } from "./Api";

export const authService = {
    async login(data: LoginData): Promise<LoginResponse> {
      const response = await publicApi.post<LoginResponse>('/login', data);
      return response.data;
    },
  
    async register(data: RegisterData): Promise<RegisterResponse> {
      const response = await publicApi.post<RegisterResponse>('/register', data);
      return response.data;
    },
};