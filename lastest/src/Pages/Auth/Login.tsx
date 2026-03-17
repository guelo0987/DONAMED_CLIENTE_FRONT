import { Eye, EyeOff, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../components/ui/buttons";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import LandingPage from "../Landing/LandingPage";
import { useAuth } from "../../hooks/useAuth";
import { validarCorreo, validarContrasena } from "../../utils/validators";

export const Login = () => {
    const navigate = useNavigate();
    const { login, isLoading, error, setError } = useAuth();
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [showContrasena, setShowContrasena] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validarCorreo(correo)) {
            setError("El formato del correo electrónico no es válido.");
            return;
        }

        if (!validarContrasena(contrasena)) {
            setError("La contraseña ingresada no es válida.");
            return;
        }

        const success = await login({ correo, contrasena });
        if (success) {
            navigate("/dashboard"); // Ajustar la ruta si es necesario (ej: /, /home o /dashboard)
        }
    };

    return (
        <div className="relative min-h-screen">
            <LandingPage />
            <div className="fixed inset-0 z-[100] w-full flex items-center justify-center p-5 sm:p-6 md:p-8 bg-black/40 backdrop-blur-[2px] font-['Poppins']">
                <div className="relative w-full max-w-[1200px] h-[88vh] lg:h-[86vh] bg-white rounded-[24px] lg:rounded-[38px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                    <Link
                        to="/"
                        className="absolute top-6 right-6 lg:top-8 lg:right-10 z-50 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 lg:w-8 lg:h-8 text-[#5F6368] hover:text-black" />
                    </Link>

                    <div className="hidden lg:block w-[40%] h-full relative bg-[#40C9DB]">
                        <div className="absolute top-12 left-12 z-30">
                            <img
                                src="/logos/donamed_logo_auth.png"
                                alt="Donamed Logo"
                                className="w-[280px] xl:w-[350px] h-auto object-contain"
                            />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 h-[70%] z-10 flex items-end justify-center overflow-hidden">
                            <img
                                src="/banners/iniciar%20sesion%20banner.png"
                                alt="Doctora"
                                className="w-auto h-full object-cover object-bottom translate-y-2"
                            />
                        </div>

                        <div
                            className="absolute bottom-0 w-full h-[40%] z-20 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(0deg, #40C9DB -10%, rgba(64, 201, 219, 0) 100%)",
                            }}
                        />
                    </div>

                    <div className="w-full lg:w-[58%] h-full flex flex-col justify-center items-center relative px-12 md:px-14 xl:px-16 py-10 lg:pt-14 overflow-y-auto">
                        <form onSubmit={handleLogin} className="w-full max-w-[620px] space-y-5 flex flex-col items-center text-center">
                            <div className="space-y-3 w-full">
                                <h1 className="text-[#404040] text-[20px] md:text-[24px] xl:text-[26px] font-medium leading-[1.2] tracking-normal text-center">
                                    Iniciar Sesión
                                </h1>
                                {error && (
                                    <p className="text-red-500 text-sm mt-2">{error}</p>
                                )}
                            </div>

                            <div className="w-full max-w-[360px] mx-auto space-y-3.5 text-left">
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                            Correo Electrónico
                                        </Label>
                                        <img
                                            src="/assets/plus_icon.png"
                                            alt="required"
                                            className="w-2 h-2 lg:w-3 lg:h-3"
                                        />
                                    </div>
                                    <Input
                                        type="email"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        required
                                        placeholder="Dirección de correo electrónico"
                                        className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                            Contraseña
                                        </Label>
                                        <img
                                            src="/assets/plus_icon.png"
                                            alt="required"
                                            className="w-2 h-2 lg:w-3 lg:h-3"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Input
                                            type={showContrasena ? "text" : "password"}
                                            value={contrasena}
                                            onChange={(e) => setContrasena(e.target.value)}
                                            required
                                            placeholder="Tu contraseña"
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowContrasena((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c] transition-colors"
                                            aria-label={showContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                                        >
                                            {showContrasena ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 w-full max-w-[360px] mx-auto">
                                <div className="flex justify-center lg:justify-center">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] disabled:opacity-50 rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                                    >
                                        {isLoading ? "Ingresando..." : "Ingresar"}
                                    </Button>
                                </div>

                                <p className="text-center text-[#404040] text-[11px] xl:text-[12px] font-medium">
                                    ¿Olvidaste tu Contraseña?{" "}
                                    <Link
                                        to="/forgot-password"
                                        className="text-[#34A4B3] hover:underline"
                                    >
                                        Recuperar Contraseña
                                    </Link>
                                </p>

                                <p className="text-center text-[#404040] text-[11px] xl:text-[12px] font-medium">
                                    ¿No tienes una cuenta?{" "}
                                    <Link
                                        to="/crear-cuenta"
                                        className="text-[#34A4B3] hover:underline"
                                    >
                                        Crea una cuenta
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
