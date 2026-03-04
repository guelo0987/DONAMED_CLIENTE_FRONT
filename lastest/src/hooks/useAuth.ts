import { useState } from 'react';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import type { LoginData, RegisterData, Usuario } from '../types/auth';
import type { UserProfile } from '../types/user';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (data: LoginData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.login(data);
            if (response.success && response.data) {
                // Preservar la fotoUrl de la base de datos si existe, en la respuesta del backend
                // authController.ts no retorna foto_url, pero se llenará después de llamar a fetchProfile()
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.usuario));
                return response.data;
            } else {
                setError(response.message || 'Error en el inicio de sesión');
            }
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string, error?: { message?: string } } }, message?: string };
            const errorMsg = axiosError.response?.data?.error?.message || axiosError.response?.data?.message;
            setError(errorMsg || axiosError.message || 'Error de conexión');
        } finally {
            setIsLoading(false);
        }
        return null;
    };

    const isVerificationMessage = (msg: string) => {
        const lower = msg?.toLowerCase() || '';
        return /verificar|verifica|verificación|correo.*verif|email.*verif/i.test(lower);
    };

    const isRecoverPasswordSuccessMessage = (msg: string) => {
        const lower = msg?.toLowerCase() || '';
        return /revisa tu correo|revisa.*correo|enviamos.*enlace|correo enviado|enlace.*correo|restablecer|recuperar.*contraseña/i.test(lower);
    };

    const register = async (data: RegisterData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.register(data);
            if (response.success && response.data) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.usuario));
                return response.data;
            } else {
                const msg = response.message || 'Error en el registro';
                if (isVerificationMessage(msg)) {
                    return true;
                }
                setError(msg);
            }
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string, error?: { message?: string } } }, message?: string };
            const errorMsg = axiosError.response?.data?.error?.message || axiosError.response?.data?.message || axiosError.message || 'Error de conexión';
            if (isVerificationMessage(errorMsg)) {
                return true;
            }
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
        return null;
    };

    const recuperarContrasena = async (correo: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await authService.recuperarContrasena(correo);
            if (response.success) {
                return true;
            }
            const msg = response.message || 'Error al recuperar contraseña';
            if (isRecoverPasswordSuccessMessage(msg)) {
                return true;
            }
            setError(msg);
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string, error?: { message?: string } } }, message?: string };
            const errorMsg = axiosError.response?.data?.error?.message || axiosError.response?.data?.message || axiosError.message || 'Error de conexión';
            if (isRecoverPasswordSuccessMessage(errorMsg)) {
                return true;
            }
            setError(errorMsg);
        } finally {
            setIsLoading(false);
        }
        return null;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return true;
    };

    const getUser = (): Usuario | null => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return null;
        try {
            return JSON.parse(userStr) as Usuario;
        } catch {
            return null;
        }
    };

    const fetchProfile = async (): Promise<UserProfile | null> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await userService.getProfile();
            if (response.success && response.data) {
                const updatedUser: Usuario = {
                    id: response.data.idusuario,
                    correo: response.data.correo,
                    cedula: response.data.cedula_usuario,
                    nombre_completo: `${response.data.persona.nombre} ${response.data.persona.apellidos}`,
                    rol: response.data.rol.nombre,
                    estado: response.data.estado,
                    foto_url: response.data.foto_url
                };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                return response.data;
            } else {
                setError(response.message || 'Error al obtener perfil');
            }
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string, error?: { message?: string } } }, message?: string };
            const errorMsg = axiosError.response?.data?.error?.message || axiosError.response?.data?.message;
            setError(errorMsg || axiosError.message || 'Error al conectar con el servidor');
        } finally {
            setIsLoading(false);
        }
        return null;
    };

    const checkCedulaAndEmail = async (cedula: string, correo: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const resCedula = await authService.verificarCedula(cedula);
            if (resCedula.data?.exists) {
                setError("La cédula ya se encuentra registrada en el sistema.");
                setIsLoading(false);
                return false;
            }
            const resCorreo = await authService.verificarCorreo(correo);
            if (resCorreo.data?.exists) {
                setError("El correo electrónico ya se encuentra registrado.");
                setIsLoading(false);
                return false;
            }
            setIsLoading(false);
            return true;
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string } }, message?: string };
            setError(axiosError.response?.data?.message || axiosError.message || 'Error de conexión');
            setIsLoading(false);
            return false;
        }
    };

    const updateProfile = async (data: FormData | Partial<UserProfile['persona']> & { foto_url?: string | null }) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await userService.updateProfile(data);
            if (response.success && response.data) {
                // Actualizar el local storage
                const currentUser = getUser();
                if (currentUser) {
                    const updatedUser: Usuario = {
                        ...currentUser,
                        nombre_completo: `${response.data.persona.nombre} ${response.data.persona.apellidos}`,
                        foto_url: response.data.foto_url
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                }
                return response.data;
            } else {
                setError(response.message || 'Error al actualizar perfil');
            }
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string, error?: { message?: string } } }, message?: string };
            const errorMsg = axiosError.response?.data?.error?.message || axiosError.response?.data?.message;
            setError(errorMsg || axiosError.message || 'Error al conectar con el servidor');
        } finally {
            setIsLoading(false);
        }
        return null;
    };

    const changePassword = async (contrasena_actual: string, nueva_contrasena: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await userService.changePassword(contrasena_actual, nueva_contrasena);
            if (!response.success) {
                setError(response.message || 'Error al cambiar contraseña');
                return false;
            }
            return true;
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string, error?: { message?: string } } }, message?: string };
            const errorMsg = axiosError.response?.data?.error?.message || axiosError.response?.data?.message;
            setError(errorMsg || axiosError.message || 'Error al conectar con el servidor');
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const deactivateAccount = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await userService.deactivateAccount();
            if (response.success) {
                logout();
                return true;
            }
            return false;
        } catch (err: unknown) {
            console.error(err);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteAccount = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await userService.deleteAccount();
            if (response.success) {
                logout();
                return true;
            }
            return false;
        } catch (err: unknown) {
            console.error(err);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        register,
        recuperarContrasena,
        checkCedulaAndEmail,
        fetchProfile,
        updateProfile,
        changePassword,
        deactivateAccount,
        deleteAccount,
        logout,
        getUser,
        isLoading,
        error,
        setError
    };
};
