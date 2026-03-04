import { X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/buttons";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import LandingPage from "../Landing/LandingPage";
import { authService } from "../../services/authService";
import { validarContrasena } from "../../utils/validators";

type Estado = "formulario" | "exito" | "error" | "sin_token";

export const RestablecerContrasena = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [estado, setEstado] = useState<Estado>("formulario");
    const [mensaje, setMensaje] = useState<string>("");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [errorForm, setErrorForm] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            setEstado("sin_token");
            setMensaje("No se encontró el token. Por favor, utiliza el enlace que recibiste por correo para restablecer tu contraseña.");
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorForm(null);

        if (!token) {
            setEstado("sin_token");
            return;
        }

        if (!validarContrasena(nuevaContrasena)) {
            setErrorForm("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        if (nuevaContrasena !== confirmarContrasena) {
            setErrorForm("Las contraseñas no coinciden.");
            return;
        }

        setIsLoading(true);
        try {
            const response = await authService.restablecerContrasena(token, nuevaContrasena);
            if (response.success) {
                setMensaje(response.message || "Contraseña actualizada exitosamente. Ya puedes iniciar sesión.");
                setEstado("exito");
            } else {
                setErrorForm(response.message || "Error al restablecer la contraseña.");
            }
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string }; status?: number } };
            const msg = axiosError.response?.data?.message || "El enlace ha expirado o no es válido. Solicita uno nuevo.";
            if (axiosError.response?.status === 403) {
                setEstado("error");
                setMensaje(msg);
            } else {
                setErrorForm(msg);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen">
            <LandingPage />
            <div className="fixed inset-0 z-50 w-full flex items-center justify-center p-5 sm:p-6 md:p-8 bg-black/40 backdrop-blur-[2px] font-['Poppins']">
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

                        <div className="absolute inset-x-0 bottom-0 h-[85%] z-10 flex items-end justify-center overflow-hidden">
                            <img
                                src="/banners/restablecer_pass_banner.png"
                                alt="Doctora"
                                className="w-auto h-full object-cover object-bottom translate-y-2"
                            />
                        </div>

                        <div
                            className="absolute bottom-0 w-full h-[40%] z-20 pointer-events-none"
                            style={{
                                background: "linear-gradient(0deg, #40C9DB -10%, rgba(64, 201, 219, 0) 100%)"
                            }}
                        />
                    </div>

                    <div className="w-full lg:w-[60%] h-full flex flex-col justify-center items-center relative px-8 md:px-14 xl:px-20 py-10 lg:pt-14 overflow-y-auto">
                        <div className="w-full max-w-[500px] space-y-6 flex flex-col items-center text-center">
                            {estado === "formulario" && token && (
                                <>
                                    <div className="space-y-3 w-full">
                                        <h1 className="text-[#404040] text-[22px] md:text-[28px] xl:text-[32px] font-medium leading-[1.2] tracking-normal">
                                            Restablecer Contraseña
                                        </h1>
                                        <p className="text-[#2D3748] text-[13px] md:text-[14px] xl:text-[15px] font-medium leading-relaxed">
                                            Ingrese su nueva contraseña (mínimo 8 caracteres)
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="w-full max-w-[360px] mx-auto space-y-4 mt-4">
                                        <div className="space-y-1.5 text-left">
                                            <div className="flex items-center gap-2">
                                                <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                    Nueva Contraseña
                                                </Label>
                                                <img
                                                    src="/assets/plus_icon.png"
                                                    alt="required"
                                                    className="w-2 h-2 lg:w-3 lg:h-3"
                                                />
                                            </div>
                                            <Input
                                                type="password"
                                                value={nuevaContrasena}
                                                onChange={(e) => setNuevaContrasena(e.target.value)}
                                                placeholder="Nueva Contraseña"
                                                className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                            />
                                        </div>

                                        <div className="space-y-1.5 text-left">
                                            <div className="flex items-center gap-2">
                                                <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                    Confirmar Contraseña
                                                </Label>
                                                <img
                                                    src="/assets/plus_icon.png"
                                                    alt="required"
                                                    className="w-2 h-2 lg:w-3 lg:h-3"
                                                />
                                            </div>
                                            <Input
                                                type="password"
                                                value={confirmarContrasena}
                                                onChange={(e) => setConfirmarContrasena(e.target.value)}
                                                placeholder="Confirmar Contraseña"
                                                className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                            />
                                        </div>

                                        {errorForm && (
                                            <p className="text-red-500 text-sm">{errorForm}</p>
                                        )}

                                        <div className="flex justify-center pt-2">
                                            <Button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] disabled:opacity-50 rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                                            >
                                                {isLoading ? "Restableciendo..." : "Restablecer contraseña"}
                                            </Button>
                                        </div>
                                    </form>

                                    <p className="text-center text-[#404040] text-[11px] xl:text-[12px] font-medium pt-2">
                                        ¿Recordaste tu contraseña?{" "}
                                        <Link
                                            to="/iniciar-sesion"
                                            className="text-[#34A4B3] hover:underline"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                    </p>
                                </>
                            )}

                            {estado === "exito" && (
                                <>
                                    <div className="space-y-3 w-full">
                                        <h1 className="text-[#404040] text-[22px] md:text-[28px] xl:text-[32px] font-medium leading-[1.2] tracking-normal">
                                            Contraseña actualizada
                                        </h1>
                                        <p className="text-[#2D3748] text-[13px] md:text-[14px] xl:text-[15px] font-medium leading-relaxed">
                                            {mensaje}
                                        </p>
                                    </div>
                                    <div className="flex justify-center pt-2">
                                        <Button
                                            asChild
                                            className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                                        >
                                            <Link to="/iniciar-sesion">Ir al inicio de sesión</Link>
                                        </Button>
                                    </div>
                                </>
                            )}

                            {(estado === "error" || estado === "sin_token") && (
                                <>
                                    <div className="space-y-3 w-full">
                                        <h1 className="text-[#404040] text-[22px] md:text-[28px] xl:text-[32px] font-medium leading-[1.2] tracking-normal">
                                            {estado === "sin_token" ? "Enlace inválido" : "Error"}
                                        </h1>
                                        <p className="text-red-500 text-[13px] md:text-[14px] xl:text-[15px] font-medium leading-relaxed">
                                            {mensaje}
                                        </p>
                                        {estado === "sin_token" && (
                                            <p className="text-[#2D3748] text-[12px] xl:text-[13px] font-medium leading-relaxed">
                                                Solicita un nuevo enlace desde la opción de recuperar contraseña.
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Button
                                            asChild
                                            className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                                        >
                                            <Link to="/iniciar-sesion">Ir al inicio de sesión</Link>
                                        </Button>
                                        {estado === "sin_token" && (
                                            <Button
                                                asChild
                                                className="w-full md:w-[220px] h-[38px] bg-white border border-[#34A4B3] text-[#34A4B3] hover:bg-[#F8F7F7] rounded-[10px] text-[12px] font-medium transition-all"
                                            >
                                                <Link to="/forgot-password">Solicitar nuevo enlace</Link>
                                            </Button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
