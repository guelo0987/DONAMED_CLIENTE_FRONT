export interface Ciudad {
    codigociudad: string;
    nombre: string;
    codigoprovincia: string;
}

export interface Provincia {
    codigoprovincia: string;
    nombre: string;
    ciudades?: Ciudad[];
}
