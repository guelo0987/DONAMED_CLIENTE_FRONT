export type EstadoSolicitud =
    | 'PENDIENTE'
    | 'EN_REVISION'
    | 'APROBADA'
    | 'RECHAZADA'
    | 'DESPACHADA'
    | 'CANCELADA'
    | 'INCOMPLETA';

export interface TipoSolicitud {
    codigotiposolicitud: string;
    descripcion: string;
}

export interface DocumentoSolicitud {
    id: string;
    url: string;
    nombre: string;
    idusuario: number;
    subido_en: string;
}

export interface MedicamentoSolicitado {
    id: number;
    numerosolicitud: number;
    nombre: string;
    creado_en: string;
}

export interface SolicitudResumen {
    numerosolicitud: number;
    estado: EstadoSolicitud;
    creada_en: string;
    patologia: string;
    centroMedico: string;
    tipoSolicitud: {
        descripcion: string;
    };
    _count: {
        medicamento_solicitado: number;
    };
    almacen_retiro?: AlmacenRetiro;
}

export interface AlmacenRetiro {
    idalmacen: number;
    nombre: string;
    direccion: string;
    telefono: string;
    correo: string;
    ciudad: {
        codigociudad: string;
        nombre: string;
    };
}

export interface SolicitudListResponse {
    solicitudes: SolicitudResumen[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface Representante {
    cedula: string;
    nombre: string;
    apellidos: string;
    telefono: string;
}

export interface DetalleDespacho {
    cantidad: number;
    lote: {
        medicamento: {
            nombre: string;
            codigomedicamento: string;
        };
    };
}

export interface SolicitudDetalle {
    numerosolicitud: number;
    idusuario: number;
    estado: EstadoSolicitud;
    creada_en: string;
    actualizado_en: string;
    patologia: string;
    observaciones: string | null;
    codigotiposolicitud: string;
    centroMedico: string;
    cedularepresentante: string | null;
    relacion_solicitante: string | null;
    documentos: DocumentoSolicitud[];
    tipoSolicitud: TipoSolicitud;
    representante: Representante | null;
    medicamento_solicitado: MedicamentoSolicitado[];
    detalles: DetalleDespacho[];
    almacen_retiro?: AlmacenRetiro;
}

export interface CreateSolicitudInput {
    codigotiposolicitud: string;
    centroMedico: string;
    patologia: string;
    cedularepresentante?: string;
    relacion_solicitante?: string;
    // FormData expects files in 'documentos'
}
