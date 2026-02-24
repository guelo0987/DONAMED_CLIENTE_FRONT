import { useState, useCallback } from 'react';
import { solicitudService } from '../services/solicitudService';
import type {
    EstadoSolicitud,
    SolicitudDetalle
} from '../types/solicitud';

export const useSolicitudes = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Búsqueda de historial
    const fetchHistorial = useCallback(async (estado?: EstadoSolicitud, page = 1, limit = 10) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await solicitudService.obtenerHistorial(estado, page, limit);
            if (response.success && response.data) {
                return response.data;
            }
            throw new Error(response.message || 'Error al obtener historial');
        } catch (err: any) {
            const msg = err.response?.data?.error?.message || err.message || 'Error desconocido';
            setError(msg);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Traer detalle específico
    const fetchDetalle = useCallback(async (id: number): Promise<SolicitudDetalle | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await solicitudService.obtenerDetalle(id);
            if (response.success && response.data) {
                return response.data;
            }
            throw new Error(response.message || 'Error al cargar detalle');
        } catch (err: any) {
            const msg = err.response?.data?.error?.message || err.message || 'Error cargando solicitud';
            setError(msg);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Crear solicitud (queda en PENDIENTE, sin confirmar)
    // Solo hace: Paso 1 (Crear con docs) + Paso 2 (Agregar medicamentos)
    const submitCompleto = async (
        formData: FormData,
        medicamentos: { nombre: string }[]
    ): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            // PASO 1: Crear la solicitud (estado PENDIENTE) mandando Documentos Archivos en FormData
            const step1Response = await solicitudService.crearSolicitud(formData);

            if (!step1Response.success || !step1Response.data) {
                throw new Error(step1Response.message || 'Fallo el Paso 1: Crear Solicitud');
            }

            const numSolicitudNuevo = step1Response.data.numerosolicitud;

            // PASO 2: Agregar lista de Medicamentos en string a la Solicitud Pendiente
            const step2Response = await solicitudService.agregarMedicamentos(
                numSolicitudNuevo,
                medicamentos
            );

            if (!step2Response.success) {
                throw new Error(step2Response.message || 'Fallo el Paso 2: Guardar medicamentos');
            }

            // Éxito: La solicitud queda en PENDIENTE para que el usuario la revise/edite/confirme
            return true;

        } catch (err: any) {
            console.error("Error en cadena de Subida:", err);
            const msg = err.response?.data?.error?.message || err.message || 'Ha ocurrido un error en la subida.';
            setError(msg);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // Editar solicitud pendiente (PUT /solicitudes/:id)
    const editarSolicitud = useCallback(async (
        id: number,
        data: Record<string, string | undefined>
    ): Promise<SolicitudDetalle | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await solicitudService.editarSolicitud(id, data);
            if (response.success && response.data) {
                return response.data;
            }
            throw new Error(response.message || 'Error al editar solicitud');
        } catch (err: any) {
            const msg = err.response?.data?.error?.message || err.message || 'Error editando solicitud';
            setError(msg);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Confirmar solicitud (PENDIENTE → EN_REVISION)
    const confirmarSolicitud = useCallback(async (id: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await solicitudService.confirmarSolicitud(id);
            if (!response.success) {
                throw new Error(response.message || 'Error al confirmar solicitud');
            }
            return true;
        } catch (err: any) {
            const msg = err.response?.data?.error?.message || err.message || 'Error confirmando solicitud';
            setError(msg);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Cancelar solicitud
    const cancelarSolicitud = useCallback(async (id: number): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await solicitudService.cancelarSolicitud(id);
            if (!response.success) {
                throw new Error(response.message || 'Error intentando cancelar la solicitud');
            }
            return true;
        } catch (err: any) {
            const msg = err.response?.data?.error?.message || err.message || 'Error desconocido';
            setError(msg);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Eliminar documento de una solicitud pendiente
    const eliminarDocumento = useCallback(async (idSolicitud: number, docId: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await solicitudService.eliminarDocumento(idSolicitud, docId);
            if (!response.success) {
                throw new Error(response.message || 'Error al eliminar documento');
            }
            return true;
        } catch (err: any) {
            const msg = err.response?.data?.error?.message || err.message || 'Error eliminando documento';
            setError(msg);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Agregar documentos a una solicitud pendiente
    const agregarDocumentos = useCallback(async (idSolicitud: number, formData: FormData): Promise<boolean> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await solicitudService.agregarDocumentos(idSolicitud, formData);
            if (!response.success) {
                throw new Error(response.message || 'Error al agregar documentos');
            }
            return true;
        } catch (err: any) {
            const msg = err.response?.data?.error?.message || err.message || 'Error agregando documentos';
            setError(msg);
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        // State
        isLoading,
        error,
        setError,

        // Actions
        submitCompleto,
        fetchHistorial,
        fetchDetalle,
        editarSolicitud,
        confirmarSolicitud,
        cancelarSolicitud,
        eliminarDocumento,
        agregarDocumentos
    };
};
