import { apiClient } from '../api/client';
import { ENDPOINTS } from '../config/endpoints';
import type { RegisterData, LoginData, AuthResponse, ApiResponse } from '../types/auth';

export const authService = {
    login: async (data: LoginData): Promise<ApiResponse<AuthResponse>> => {
        const response = await apiClient.post<ApiResponse<AuthResponse>>(ENDPOINTS.AUTH.LOGIN, data);
        return response.data;
    },

    register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
        const response = await apiClient.post<ApiResponse<AuthResponse>>(ENDPOINTS.AUTH.REGISTER, data);
        return response.data;
    },

    verificarCedula: async (cedula: string): Promise<ApiResponse<{ exists: boolean }>> => {
        const response = await apiClient.post<ApiResponse<{ exists: boolean }>>(ENDPOINTS.AUTH.VERIFY_CEDULA, { cedula });
        return response.data;
    },

    verificarCorreo: async (correo: string): Promise<ApiResponse<{ exists: boolean }>> => {
        const response = await apiClient.post<ApiResponse<{ exists: boolean }>>(ENDPOINTS.AUTH.VERIFY_EMAIL, { correo });
        return response.data;
    },

    recuperarContrasena: async (correo: string): Promise<ApiResponse> => {
        const response = await apiClient.post<ApiResponse>(ENDPOINTS.AUTH.RECOVER_PASSWORD, { correo });
        return response.data;
    }
};
