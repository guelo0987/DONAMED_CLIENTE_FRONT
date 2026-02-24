export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/v1/auth/login',
        REGISTER: '/api/v1/auth/register',
        VERIFY_CEDULA: '/api/v1/auth/verificar-cedula',
        VERIFY_EMAIL: '/api/v1/auth/verificar-correo',
        RECOVER_PASSWORD: '/api/v1/auth/recuperar-contrasena',
    },
    GEO: {
        PROVINCIAS: '/api/v1/geo/provincias',
        CIUDADES: '/api/v1/geo/ciudades'
    },
    SOLICITUDES: {
        BASE: '/api/v1/solicitudes',
        CANCELAR: (id: number) => `/api/v1/solicitudes/${id}/cancelar`,
        CONFIRMAR: (id: number) => `/api/v1/solicitudes/${id}/confirmar`,
        MEDICAMENTOS: (id: number) => `/api/v1/solicitudes/${id}/medicamentos`,
        DOCUMENTOS: (id: number) => `/api/v1/solicitudes/${id}/documentos`,
        // Documentos no lo definimos directo porque el FormData usa la BASE
    },
    CATALOGO: {
        MEDICAMENTOS: '/api/v1/medicamentos',
        CATEGORIAS: '/api/v1/categorias',
        ENFERMEDADES: '/api/v1/enfermedades'
    },
    USER: {
        PROFILE: '/api/v1/perfil',
        CHANGE_PASSWORD: '/api/v1/perfil/password',
        DEACTIVATE: '/api/v1/perfil/desactivar',
    }
} as const;
