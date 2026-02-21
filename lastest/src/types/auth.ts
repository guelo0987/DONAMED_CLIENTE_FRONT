export interface RegisterData {
    cedula: string;
    nombre: string;
    apellidos: string;
    sexo: string;
    fecha_nacimiento: string; // YYYY-MM-DD
    telefono: string;
    telefono_alternativo?: string;
    codigoprovincia: string;
    codigociudad: string;
    direccion: string;
    correo: string;
    contrasena: string;
}

export interface LoginData {
    correo: string;
    contrasena: string;
}

export interface Usuario {
    id: number;
    correo: string;
    cedula: string;
    nombre_completo: string;
    rol: string | null;
    estado: string;
    foto_url?: string | null;
}

export interface AuthResponse {
    usuario: Usuario;
    token: string;
}

export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
}
