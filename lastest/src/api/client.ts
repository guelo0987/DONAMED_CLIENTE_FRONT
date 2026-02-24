import axios from 'axios';

// Usar variable de entorno local, si no, fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para inyectar token en futuras peticiones y manejar FormData
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Si la data es FormData, debemos eliminar el Content-Type por defecto 
    // para que el navegador genere uno con el 'boundary' correcto automáticamente.
    if (config.data instanceof FormData && config.headers) {
        delete config.headers['Content-Type'];
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptor de respuestas para manejar errores globales (ej: deslogueo por expiración)
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Token expirado o inválido. Cerrando sesión automáticamente...');
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Check to avoid infinite reload loops on login page
            if (window.location.pathname !== '/iniciar-sesion') {
                window.location.href = '/iniciar-sesion';
            }
        }
        return Promise.reject(error);
    }
);
