import { apiClient } from '../api/client';
import { ENDPOINTS } from '../config/endpoints';
import type { ApiResponse } from '../types/auth';
import type {
    MedicamentoListResponse,
    MedicamentoDetalle,
    CategoriaItem,
    EnfermedadItem
} from '../types/medicamento';

export const medicamentoService = {
    /**
     * GET /api/v1/medicamentos
     * Buscar medicamentos (filtra por 'q', 'categoria', 'enfermedad', etc)
     */
    buscarMedicamentos: async (params?: { q?: string; categoria?: number; enfermedad?: number; page?: number; limit?: number }) => {
        const query = new URLSearchParams();
        if (params?.q) query.append('q', params.q);
        if (params?.categoria) query.append('categoria', params.categoria.toString());
        if (params?.enfermedad) query.append('enfermedad', params.enfermedad.toString());
        if (params?.page) query.append('page', params.page.toString());
        if (params?.limit) query.append('limit', params.limit.toString());

        const stringQuery = query.toString();
        const url = stringQuery ? `${ENDPOINTS.CATALOGO.MEDICAMENTOS}?${stringQuery}` : ENDPOINTS.CATALOGO.MEDICAMENTOS;

        const response = await apiClient.get<ApiResponse<MedicamentoListResponse>>(url);
        return response.data;
    },

    /**
     * GET /api/v1/medicamentos/:codigo
     * Detalle específico
     */
    obtenerMedicamento: async (codigo: string) => {
        const response = await apiClient.get<ApiResponse<MedicamentoDetalle>>(
            `${ENDPOINTS.CATALOGO.MEDICAMENTOS}/${codigo}`
        );
        return response.data;
    },

    /**
     * GET /api/v1/categorias
     */
    listarCategorias: async () => {
        const response = await apiClient.get<ApiResponse<CategoriaItem[]>>(ENDPOINTS.CATALOGO.CATEGORIAS);
        return response.data;
    },

    /**
     * GET /api/v1/enfermedades
     */
    listarEnfermedades: async () => {
        const response = await apiClient.get<ApiResponse<EnfermedadItem[]>>(ENDPOINTS.CATALOGO.ENFERMEDADES);
        return response.data;
    }
};
