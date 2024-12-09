import { publicApi } from "./Api";

type LoginData = {
    email: string;
    password: string;
  };
  
type RegisterData = {
    name: string;
    email: string;
    password: string;
};

type LoginResponse = {
    token: string;
};

type RegisterResponse = {
    message: string;
};

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