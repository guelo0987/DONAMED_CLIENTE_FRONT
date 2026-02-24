import { apiClient } from '../api/client';
import { ENDPOINTS } from '../config/endpoints';
import type { ApiResponse } from '../types/auth';
import type {
    SolicitudDetalle,
    SolicitudListResponse,
    EstadoSolicitud
} from '../types/solicitud';

export const solicitudService = {
    /**
     * RF-11: Crear solicitud (Paso 1)
     * Envía { codigotiposolicitud, centroMedico, patologia, documentos[] }
     * usando FormData para soportar carga de archivos.
     */
    crearSolicitud: async (data: FormData): Promise<ApiResponse<SolicitudDetalle>> => {
        const response = await apiClient.post<ApiResponse<SolicitudDetalle>>(
            ENDPOINTS.SOLICITUDES.BASE,
            data,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
    },

    /**
     * RF-12: Agregar medicamentos a solicitud (Paso 2)
     */
    agregarMedicamentos: async (idSolicitud: number, medicamentos: { nombre: string }[]): Promise<ApiResponse<any>> => {
        const response = await apiClient.post<ApiResponse<any>>(
            ENDPOINTS.SOLICITUDES.MEDICAMENTOS(idSolicitud),
            { medicamentos }
        );
        return response.data;
    },

    /**
     * RF-16: Confirmar solicitud (Paso 3)
     */
    confirmarSolicitud: async (idSolicitud: number): Promise<ApiResponse<any>> => {
        const response = await apiClient.post<ApiResponse<any>>(
            ENDPOINTS.SOLICITUDES.CONFIRMAR(idSolicitud)
        );
        return response.data;
    },

    /**
     * RF-19: Historial de solicitudes (con filtros y paginación)
     */
    obtenerHistorial: async (estado?: EstadoSolicitud, page = 1, limit = 10): Promise<ApiResponse<SolicitudListResponse>> => {
        const params = new URLSearchParams();
        if (estado) params.append('estado', estado);
        params.append('page', page.toString());
        params.append('limit', limit.toString());

        const response = await apiClient.get<ApiResponse<SolicitudListResponse>>(
            `${ENDPOINTS.SOLICITUDES.BASE}?${params.toString()}`
        );
        return response.data;
    },

    /**
     * RF-19: Detalle de solicitud
     */
    obtenerDetalle: async (idSolicitud: number): Promise<ApiResponse<SolicitudDetalle>> => {
        const response = await apiClient.get<ApiResponse<SolicitudDetalle>>(
            `${ENDPOINTS.SOLICITUDES.BASE}/${idSolicitud}`
        );
        return response.data;
    },

    /**
     * RF-17: Editar solicitud pendiente
     */
    editarSolicitud: async (idSolicitud: number, data: Record<string, string | undefined>): Promise<ApiResponse<SolicitudDetalle>> => {
        const response = await apiClient.put<ApiResponse<SolicitudDetalle>>(
            `${ENDPOINTS.SOLICITUDES.BASE}/${idSolicitud}`,
            data
        );
        return response.data;
    },

    /**
     * RF-18: Cancelar solicitud
     */
    cancelarSolicitud: async (idSolicitud: number): Promise<ApiResponse<any>> => {
        const response = await apiClient.post<ApiResponse<any>>(
            ENDPOINTS.SOLICITUDES.CANCELAR(idSolicitud)
        );
        return response.data;
    },

    /**
     * RF-15: Agregar documentos a solicitud pendiente
     */
    agregarDocumentos: async (idSolicitud: number, formData: FormData): Promise<ApiResponse<any>> => {
        const response = await apiClient.post<ApiResponse<any>>(
            ENDPOINTS.SOLICITUDES.DOCUMENTOS(idSolicitud),
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return response.data;
    },

    /**
     * RF-15: Eliminar documento de solicitud
     */
    eliminarDocumento: async (idSolicitud: number, docId: string): Promise<ApiResponse<any>> => {
        const response = await apiClient.delete<ApiResponse<any>>(
            `${ENDPOINTS.SOLICITUDES.DOCUMENTOS(idSolicitud)}/${docId}`
        );
        return response.data;
    }
};
