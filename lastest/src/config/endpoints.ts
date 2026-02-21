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
        CIUDADES: '/api/v1/geo/ciudades',
    },
    USER: {
        PROFILE: '/api/v1/perfil',
        CHANGE_PASSWORD: '/api/v1/perfil/password',
        DEACTIVATE: '/api/v1/perfil/desactivar',
    }
} as const;
