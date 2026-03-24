import { X } from "lucide-react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/buttons";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import LandingPage from "../Landing/LandingPage";
import { authService } from "../../services/authService";
import { useI18n } from "../../i18n/language-context";

type Estado = "cargando" | "exito" | "ya_verificado" | "error" | "sin_token";

export const VerificarEmail = () => {
    const { t } = useI18n();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [estado, setEstado] = useState<Estado>("cargando");
    const [mensaje, setMensaje] = useState<string>("");
    const [correoReenviar, setCorreoReenviar] = useState("");
    const [isReenviando, setIsReenviando] = useState(false);
    const [mensajeReenviar, setMensajeReenviar] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setEstado("sin_token");
            setMensaje(t("auth.verify.noToken"));
            return;
        }

        const verificar = async () => {
            try {
                const response = await authService.verificarEmail(token);
                if (response.success && response.message) {
                    setMensaje(response.message);
                    if (response.message.includes("ya fue verificado")) {
                        setEstado("ya_verificado");
                    } else {
                        setEstado("exito");
                    }
                } else {
                    setEstado("error");
                    setMensaje(response.message || t("auth.verify.errorChecking"));
                }
            } catch (err: unknown) {
                const axiosError = err as { response?: { data?: { message?: string }; status?: number } };
                setEstado("error");
                setMensaje(
                    axiosError.response?.data?.message ||
                        t("auth.verify.expiredLink")
                );
            }
        };

        verificar();
    }, [token, t]);

    const handleReenviar = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensajeReenviar(null);
        if (!correoReenviar.trim()) {
            setMensajeReenviar(t("auth.verify.enterEmail"));
            return;
        }

        setIsReenviando(true);
        try {
            const response = await authService.reenviarVerificacion(correoReenviar.trim());
            if (response.success) {
                setMensajeReenviar(response.message || t("auth.verify.resent"));
            } else {
                setMensajeReenviar(response.message || t("auth.verify.resendError"));
            }
        } catch (err: unknown) {
            const axiosError = err as { response?: { data?: { message?: string } } };
            setMensajeReenviar(
                axiosError.response?.data?.message || t("auth.verify.resendErrorTryAgain")
            );
        } finally {
            setIsReenviando(false);
        }
    };

    useEffect(() => {
        if (estado === "sin_token") {
            const t = setTimeout(() => navigate("/iniciar-sesion", { replace: true }), 4000);
            return () => clearTimeout(t);
        }
    }, [estado, navigate]);

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
                            {estado === "cargando" && (
                                <>
                                    <h1 className="text-[#404040] text-[22px] md:text-[28px] xl:text-[32px] font-medium leading-[1.2] tracking-normal">
                                        {t("auth.verify.loadingTitle")}
                                    </h1>
                                    <p className="text-[#2D3748] text-[13px] md:text-[14px] xl:text-[15px] font-medium leading-relaxed">
                                        {t("auth.verify.loadingSubtitle")}
                                    </p>
                                </>
                            )}

                            {(estado === "exito" || estado === "ya_verificado") && (
                                <>
                                    <div className="space-y-3 w-full">
                                        <h1 className="text-[#404040] text-[22px] md:text-[28px] xl:text-[32px] font-medium leading-[1.2] tracking-normal">
                                            {estado === "exito" ? t("auth.verify.verified") : t("auth.verify.alreadyVerified")}
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
                                            <Link to="/iniciar-sesion">{t("auth.goToSignIn")}</Link>
                                        </Button>
                                    </div>
                                </>
                            )}

                            {estado === "error" && (
                                <>
                                    <div className="space-y-3 w-full">
                                        <h1 className="text-[#404040] text-[22px] md:text-[28px] xl:text-[32px] font-medium leading-[1.2] tracking-normal">
                                            {t("auth.verify.errorTitle")}
                                        </h1>
                                        <p className="text-red-500 text-[13px] md:text-[14px] xl:text-[15px] font-medium leading-relaxed">
                                            {mensaje}
                                        </p>
                                        <p className="text-[#2D3748] text-[12px] xl:text-[13px] font-medium leading-relaxed">
                                            {t("auth.verify.expiredHint")}
                                        </p>
                                    </div>

                                    <form onSubmit={handleReenviar} className="w-full max-w-[360px] mx-auto space-y-4 mt-4">
                                        <div className="space-y-1.5 text-left">
                                            <div className="flex items-center gap-2">
                                                <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                                    {t("auth.email")}
                                                </Label>
                                                <img
                                                    src="/assets/plus_icon.png"
                                                    alt="required"
                                                    className="w-2 h-2 lg:w-3 lg:h-3"
                                                />
                                            </div>
                                            <Input
                                                type="email"
                                                value={correoReenviar}
                                                onChange={(e) => setCorreoReenviar(e.target.value)}
                                                placeholder={t("auth.emailPlaceholder")}
                                                className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                            />
                                        </div>
                                        {mensajeReenviar && (
                                            <p className={`text-sm ${mensajeReenviar.includes("enviado") ? "text-green-600" : "text-red-500"}`}>
                                                {mensajeReenviar}
                                            </p>
                                        )}
                                        <div className="flex justify-center pt-2">
                                            <Button
                                                type="submit"
                                                disabled={isReenviando}
                                                className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] disabled:opacity-50 rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                                            >
                                                {isReenviando ? t("auth.sending") : t("auth.verify.resendButton")}
                                            </Button>
                                        </div>
                                    </form>

                                    <p className="text-center text-[#404040] text-[11px] xl:text-[12px] font-medium pt-2">
                                        <Link to="/iniciar-sesion" className="text-[#34A4B3] hover:underline">
                                            {t("auth.verify.backToSignIn")}
                                        </Link>
                                    </p>
                                </>
                            )}

                            {estado === "sin_token" && (
                                <>
                                    <div className="space-y-3 w-full">
                                        <h1 className="text-[#404040] text-[22px] md:text-[28px] xl:text-[32px] font-medium leading-[1.2] tracking-normal">
                                            {t("auth.verify.invalidLink")}
                                        </h1>
                                        <p className="text-red-500 text-[13px] md:text-[14px] xl:text-[15px] font-medium leading-relaxed">
                                            {mensaje}
                                        </p>
                                        <p className="text-[#2D3748] text-[12px] xl:text-[13px] font-medium leading-relaxed">
                                            {t("auth.verify.redirecting")}
                                        </p>
                                    </div>
                                    <Button
                                        asChild
                                        className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                                    >
                                        <Link to="/iniciar-sesion">{t("auth.goToSignIn")}</Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
