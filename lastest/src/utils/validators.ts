const PESOS = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];

/**
 * Valida si una cédula dominicana es válida usando el algoritmo de Luhn
 * @param cedula - Cédula comprobada, solo 11 dígitos
 * @returns true si la cédula es válida
 */
export const validarCedulaDominicana = (cedula: string): boolean => {
    // Remover guiones si los hay y verificar formato
    const cedulaLimpia = cedula.replace(/-/g, '');
    if (!/^\d{11}$/.test(cedulaLimpia)) {
        return false;
    }

    const digitos = cedulaLimpia.split('').map(Number);
    const digitoVerificador = digitos[10];

    let suma = 0;
    for (let i = 0; i < 10; i++) {
        const digito = digitos[i];
        const peso = PESOS[i];
        let resultado = digito * peso;
        if (resultado > 9) {
            resultado = Math.floor(resultado / 10) + (resultado % 10);
        }
        suma += resultado;
    }

    const digitoEsperado = (10 - (suma % 10)) % 10;
    return digitoVerificador === digitoEsperado;
};

/**
 * Valida formato de correo electrónico
 */
export const validarCorreo = (correo: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(correo);
};

/**
 * Valida contraseña (mínimo 8 caracteres)
 * Puedes agregar más validaciones si es necesario (mayúscula, números, etc.)
 */
export const validarContrasena = (contrasena: string): boolean => {
    return contrasena.length >= 8;
};
