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
 * Para uso en login donde solo necesitamos asegurar que no está vacía o cumple el mínimo
 */
export const validarContrasena = (contrasena: string): boolean => {
    return contrasena.length >= 8;
};

/**
 * Valida que una contraseña cumpla con estándares de seguridad:
 * - Mínimo 8 caracteres
 * - Al menos una letra mayúscula
 * - Al menos una letra minúscula
 * - Al menos un número
 * - Al menos un carácter especial
 */
export const esContrasenaSegura = (contrasena: string): boolean => {
    const minLength = contrasena.length >= 8;
    const hasUpperCase = /[A-Z]/.test(contrasena);
    const hasLowerCase = /[a-z]/.test(contrasena);
    const hasNumbers = /\d/.test(contrasena);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(contrasena);
    
    return minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};
