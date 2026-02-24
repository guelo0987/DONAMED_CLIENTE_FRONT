export interface RolInfo {
    codigorol: number;
    nombre: string;
}

export interface ProvinciaInfo {
    codigoprovincia: string;
    nombre: string;
}

export interface CiudadInfo {
    codigociudad: string;
    nombre: string;
    codigoprovincia: string;
    provincia?: ProvinciaInfo;
}

export interface PersonaInfo {
    cedula: string;
    nombre: string;
    apellidos: string;
    sexo: string;
    fecha_nacimiento: string;
    telefono: string;
    telefono_alternativo: string | null;
    direccion: string;
    codigociudad: string;
    ciudad?: CiudadInfo;
}

export interface UserProfile {
    idusuario: number;
    correo: string;
    cedula_usuario: string;
    codigo_rol: number;
    estado: string;
    foto_url: string | null;
    creado_en?: string;
    persona: PersonaInfo;
    rol: RolInfo;
}
