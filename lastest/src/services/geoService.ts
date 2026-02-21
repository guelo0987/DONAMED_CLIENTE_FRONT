import { apiClient } from '../api/client';
import { ENDPOINTS } from '../config/endpoints';
import type { ApiResponse } from '../types/auth';
import type { Provincia, Ciudad } from '../types/geo';

export const geoService = {
    /**
     * Obtiene la lista completa de provincias.
     */
    getProvincias: async (): Promise<ApiResponse<Provincia[]>> => {
        const response = await apiClient.get<ApiResponse<Provincia[]>>(ENDPOINTS.GEO.PROVINCIAS);
        return response.data;
    },

    /**
     * Obtiene la lista completa de ciudades.
     */
    getCiudades: async (): Promise<ApiResponse<Ciudad[]>> => {
        const response = await apiClient.get<ApiResponse<Ciudad[]>>(ENDPOINTS.GEO.CIUDADES);
        return response.data;
    },
};
