import axiosClient from "./axiosClient";


interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axiosClient.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },
};

export default authService;
