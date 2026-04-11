import { Eye, EyeOff, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "../../components/ui/buttons";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import LandingPage from "../Landing/LandingPage";
import { useI18n } from "../../i18n/language-context";

export const ResetPass = () => {
    const { t } = useI18n();
    const [showNuevaContrasena, setShowNuevaContrasena] = useState(false);
    const [showConfirmarContrasena, setShowConfirmarContrasena] = useState(false);

    return (
        <div className="relative min-h-screen">
            <LandingPage />
            <div className="fixed inset-0 z-[100] w-full flex items-center justify-center p-5 sm:p-6 md:p-8 bg-black/40 backdrop-blur-[2px] font-['Poppins']">
                <div className="relative w-full max-w-[1200px] h-[88vh] lg:h-[86vh] bg-white rounded-[24px] lg:rounded-[38px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">

                    {/* Close Button */}
                    <Link
                        to="/"
                        className="absolute top-6 right-6 lg:top-8 lg:right-10 z-50 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 lg:w-8 lg:h-8 text-[#5F6368] hover:text-black" />
                    </Link>

                    {/* Left Side - Banner */}
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

                    {/* Right Side - Form */}
                    <div className="w-full lg:w-[60%] h-full flex flex-col justify-center items-center relative px-8 md:px-14 xl:px-20 py-10 lg:pt-14 overflow-y-auto">
                        <div className="w-full max-w-[500px] space-y-6 flex flex-col items-center text-center">
                            {/* Header */}
                            <div className="space-y-3 w-full">
                                <h1 className="text-[#404040] text-[22px] md:text-[28px] xl:text-[32px] font-medium leading-[1.2] tracking-normal">
                                    {t("auth.resetTitle")}
                                </h1>
                                <p className="text-[#2D3748] text-[13px] md:text-[14px] xl:text-[15px] font-medium leading-relaxed">
                                    {t("auth.resetSubtitle")}
                                </p>
                            </div>

                            {/* Form */}
                            <div className="w-full max-w-[360px] mx-auto space-y-4 mt-4">
                                {/* New Password */}
                                <div className="space-y-1.5 text-left">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                            {t("auth.newPassword")}
                                        </Label>
                                        <img
                                            src="/assets/plus_icon.png"
                                            alt="required"
                                            className="w-2 h-2 lg:w-3 lg:h-3"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Input
                                            type={showNuevaContrasena ? "text" : "password"}
                                            placeholder={t("auth.newPassword")}
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNuevaContrasena((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c] transition-colors"
                                            aria-label={showNuevaContrasena ? t("auth.hidePassword") : t("auth.showPassword")}
                                        >
                                            {showNuevaContrasena ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Repeat Password */}
                                <div className="space-y-1.5 text-left">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                            {t("auth.repeatPassword")}
                                        </Label>
                                        <img
                                            src="/assets/plus_icon.png"
                                            alt="required"
                                            className="w-2 h-2 lg:w-3 lg:h-3"
                                        />
                                    </div>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmarContrasena ? "text" : "password"}
                                            placeholder={t("auth.repeatPassword")}
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmarContrasena((prev) => !prev)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c] transition-colors"
                                            aria-label={showConfirmarContrasena ? t("auth.hidePassword") : t("auth.showPassword")}
                                        >
                                            {showConfirmarContrasena ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-center pt-2">
                                    <Button
                                        className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                                    >
                                        {t("auth.confirmPasswordButton")}
                                    </Button>
                                </div>

                                <p className="text-center text-[#404040] text-[11px] xl:text-[12px] font-medium pt-2">
                                    {t("auth.rememberedPasswordQ")}{" "}
                                    <Link
                                        to="/iniciar-sesion"
                                        className="text-[#34A4B3] hover:underline"
                                    >
                                        {t("auth.iniciarSesion")}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
