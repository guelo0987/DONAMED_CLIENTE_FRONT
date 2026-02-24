export interface CategoriaItem {
    id: number;
    nombre: string;
}

export interface EnfermedadItem {
    id: number;
    nombre: string;
}

export interface ProveedorResumen {
    rnc: string;
    nombre: string;
}

export interface MedicamentoListItem {
    codigo: string;
    nombre: string;
    compuesto_principal: string | null;
    categorias: string[];
    foto_url: string | null;
}

export interface MedicamentoDetalle {
    codigo: string;
    nombre: string;
    descripcion: string | null;
    compuesto_principal: string | null;
    via_administracion: string | null;
    forma_farmaceutica: string | null;
    categorias: string[];
    enfermedades: string[];
    foto_url: string | null;
    proveedor: ProveedorResumen | null;
}

export interface MedicamentoListResponse {
    medicamentos: MedicamentoListItem[];
    total: number;
    page: number;
    limit: number;
}
