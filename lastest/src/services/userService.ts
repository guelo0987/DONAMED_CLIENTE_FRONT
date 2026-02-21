import { apiClient } from '../api/client';
import { ENDPOINTS } from '../config/endpoints';
import type { ApiResponse, AuthResponse } from '../types/auth';
import type { UserProfile } from '../types/user';

export const userService = {
    /**
     * Obtiene el perfil completo del usuario autenticado actual.
     */
    getProfile: async (): Promise<ApiResponse<UserProfile>> => {
        const response = await apiClient.get<ApiResponse<UserProfile>>(ENDPOINTS.USER.PROFILE);
        return response.data;
    },

    /**
     * Actualiza la información personal del usuario, incluyendo foto de perfil.
     * Usa FormData automáticamente si hay un archivo.
     */
    updateProfile: async (data: FormData | Partial<UserProfile['persona']> & { foto_url?: string | null }): Promise<ApiResponse<UserProfile>> => {
        const isFormData = data instanceof FormData;
        const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined;
        const response = await apiClient.put<ApiResponse<UserProfile>>(ENDPOINTS.USER.PROFILE, data, config);
        return response.data;
    },

    /**
     * Cambia la contraseña actual por una nueva.
     */
    changePassword: async (contrasena_actual: string, nueva_contrasena: string): Promise<ApiResponse<null>> => {
        const response = await apiClient.put<ApiResponse<null>>(ENDPOINTS.USER.CHANGE_PASSWORD, {
            contrasena_actual,
            nueva_contrasena
        });
        return response.data;
    },

    /**
     * Elimina permanentemente la foto de perfil.
     */
    deleteProfilePhoto: async (): Promise<ApiResponse<null>> => {
        const response = await apiClient.delete<ApiResponse<null>>(ENDPOINTS.USER.PROFILE + '/foto');
        return response.data;
    },

    /**
     * Desactiva temporalmente la cuenta.
     */
    deactivateAccount: async (): Promise<ApiResponse<null>> => {
        const response = await apiClient.post<ApiResponse<null>>(ENDPOINTS.USER.DEACTIVATE);
        return response.data;
    },

    /**
     * Elimina permanentemente la cuenta.
     */
    deleteAccount: async (): Promise<ApiResponse<null>> => {
        const response = await apiClient.delete<ApiResponse<null>>(ENDPOINTS.USER.PROFILE);
        return response.data;
    },

    /**
     * Reactiva la cuenta.
     */
    reactivateAccount: async (): Promise<ApiResponse<AuthResponse>> => {
        const response = await apiClient.post<ApiResponse<AuthResponse>>(ENDPOINTS.USER.PROFILE + '/reactivar');
        return response.data;
    }
};
