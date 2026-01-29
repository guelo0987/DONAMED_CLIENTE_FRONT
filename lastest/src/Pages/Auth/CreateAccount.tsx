import { Calendar, ChevronDown, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../components/ui/buttons";
import { ConfirmationCard } from "../../components/ui/confirmation-card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import LandingPage from "../Landing/LandingPage";

export const CreateAccount = () => {
    const [showConfirmation, setShowConfirmation] = useState(false);

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

                        <div className="absolute inset-x-0 bottom-0 h-[70%] z-10 flex items-end justify-center overflow-hidden">
                            <img
                                src="/banners/crear%20cuenta%20banner.png"
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

                    <div className="w-full lg:w-[58%] h-full flex flex-col justify-center items-center relative px-12 md:px-14 xl:px-16 py-10 lg:pt-36 overflow-y-auto">
                        <div className="w-full max-w-[620px] space-y-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className="space-y-3 w-full">
                                <h1 className="text-[#404040] text-[20px] md:text-[24px] xl:text-[26px] font-medium leading-[1.2] tracking-normal">
                                    Crea tu cuenta
                                </h1>
                            </div>

                            <div className="w-full space-y-3.5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                Nombres
                                            </Label>
                                            <img
                                                src="/assets/plus_icon.png"
                                                alt="required"
                                                className="w-2 h-2 lg:w-3 lg:h-3"
                                            />
                                        </div>
                                        <Input
                                            placeholder="Tus nombres"
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                Apellidos
                                            </Label>
                                            <img
                                                src="/assets/plus_icon.png"
                                                alt="required"
                                                className="w-2 h-2 lg:w-3 lg:h-3"
                                            />
                                        </div>
                                        <Input
                                            placeholder="Tus apellidos"
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                Cédula
                                            </Label>
                                            <img
                                                src="/assets/plus_icon.png"
                                                alt="required"
                                                className="w-2 h-2 lg:w-3 lg:h-3"
                                            />
                                        </div>
                                        <Input
                                            placeholder="Documento de identidad"
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                Fecha de Nacimiento
                                            </Label>
                                            <img
                                                src="/assets/plus_icon.png"
                                                alt="required"
                                                className="w-2 h-2 lg:w-3 lg:h-3"
                                            />
                                        </div>
                                        <div className="relative">
                                            <Input
                                                type="date"
                                                className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3 pr-9 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                                            />
                                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A] pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                Sexo
                                            </Label>
                                            <img
                                                src="/assets/plus_icon.png"
                                                alt="required"
                                                className="w-2 h-2 lg:w-3 lg:h-3"
                                            />
                                        </div>
                                        <div className="relative">
                                            <select className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium focus:border-[#40C9DB] transition-all px-3 pr-9 appearance-none">
                                                <option value="">Sexo</option>
                                                <option value="femenino">Femenino</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="otro">Otro</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A] pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                Provincia
                                            </Label>
                                            <img
                                                src="/assets/plus_icon.png"
                                                alt="required"
                                                className="w-2 h-2 lg:w-3 lg:h-3"
                                            />
                                        </div>
                                        <div className="relative">
                                            <select className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium focus:border-[#40C9DB] transition-all px-3 pr-9 appearance-none">
                                                <option value="">Provincia</option>
                                            </select>
                                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A] pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                Ciudad
                                            </Label>
                                            <img
                                                src="/assets/plus_icon.png"
                                                alt="required"
                                                className="w-2 h-2 lg:w-3 lg:h-3"
                                            />
                                        </div>
                                        <Input
                                            placeholder="Ciudad"
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                            Dirección
                                        </Label>
                                        <img
                                            src="/assets/plus_icon.png"
                                            alt="required"
                                            className="w-2 h-2 lg:w-3 lg:h-3"
                                        />
                                    </div>
                                    <Input
                                        placeholder="Dirección"
                                        className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                Teléfono
                                            </Label>
                                            <img
                                                src="/assets/plus_icon.png"
                                                alt="required"
                                                className="w-2 h-2 lg:w-3 lg:h-3"
                                            />
                                        </div>
                                        <Input
                                            placeholder="Teléfono Celular"
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                Teléfono Adicional
                                            </Label>
                                        </div>
                                        <Input
                                            placeholder="Teléfono Secundario"
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>
                                </div>

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
                                        placeholder="Dirección de correo electrónico"
                                        className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
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
                                        <Input
                                            type="password"
                                            placeholder="Tu contraseña"
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
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
                                            placeholder="Confirmar tu contraseña"
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="flex items-center gap-3 text-[#404040] text-[11px] xl:text-[12px] font-medium">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 border-[#DCD7D7] text-[#34A4B3] focus:ring-[#34A4B3]"
                                        />
                                        <span>
                                            Acepto los{" "}
                                            <Link
                                                to="/"
                                                className="text-[#34A4B3] hover:underline"
                                            >
                                                términos y condiciones
                                            </Link>
                                        </span>
                                    </label>

                                    <div className="flex justify-center lg:justify-center">
                                        <Button
                                            onClick={() => setShowConfirmation(true)}
                                            className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                                        >
                                            Registrarme
                                        </Button>
                                    </div>

                                    <p className="text-center text-[#404040] text-[11px] xl:text-[12px] font-medium">
                                        ¿Ya tienes una cuenta?{" "}
                                    <Link
                                        to="/iniciar-sesion"
                                        className="text-[#34A4B3] hover:underline"
                                    >
                                        Inicia Sesión
                                    </Link>
                                    </p>
                                </div>

                            </div>

                            <ConfirmationCard
                                open={showConfirmation}
                                title="Su cuenta se ha creado"
                                highlight="satisfactoriamente"
                                buttonLabel="Continuar"
                                to="/iniciar-sesion"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
