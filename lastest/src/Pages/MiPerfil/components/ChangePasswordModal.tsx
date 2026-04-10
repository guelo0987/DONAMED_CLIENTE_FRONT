import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useI18n } from "../../../i18n/language-context";
import { Button } from "../../../components/ui/buttons";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

interface ChangePasswordModalProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const ChangePasswordModal = ({ onClose, onSuccess }: ChangePasswordModalProps) => {
    const { t } = useI18n();
    const { changePassword, error, setError } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Form states
    const [contrasenaActual, setContrasenaActual] = useState("");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    // Visibility toggles
    const [showActual, setShowActual] = useState(false);
    const [showNueva, setShowNueva] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Validation
    const isValid = nuevaContrasena.length >= 8 && nuevaContrasena === confirmarContrasena && contrasenaActual.length > 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (nuevaContrasena !== confirmarContrasena) {
            setError(t("profile.changePassword.notMatch"));
            return;
        }

        setIsLoading(true);
        const result = await changePassword(contrasenaActual, nuevaContrasena);

        if (result) {
            onSuccess();
        }
        setIsLoading(false);
    };

    return (
        <div className="grid w-full h-full min-h-0 grid-cols-1 md:grid-cols-[40%_60%] bg-white overflow-hidden">
            <aside className="relative hidden md:block h-full min-h-0 bg-[#40C9DB] overflow-hidden">
                <img
                    src="/logos/donamed_logo_auth.png"
                    alt="Donamed Logo"
                    className="absolute top-8 left-8 lg:top-10 lg:left-10 z-30 w-[220px] lg:w-[255px] xl:w-[290px] h-auto object-contain"
                />

                <div className="absolute inset-x-0 bottom-0 h-[68%] lg:h-[72%] z-10 flex items-end justify-start pl-4 lg:pl-8 overflow-hidden">
                    <img
                        src="/banners/restablecer_pass_banner.png"
                        alt="Doctora"
                        className="w-auto h-full object-contain object-bottom"
                    />
                </div>

                <div
                    className="absolute bottom-0 w-full h-[40%] z-20 pointer-events-none"
                    style={{
                        background: "linear-gradient(0deg, #40C9DB -10%, rgba(64, 201, 219, 0) 100%)",
                    }}
                />
            </aside>

            <section className="min-h-0 h-full bg-white flex items-start justify-center px-8 md:px-10 lg:px-14 xl:px-20 py-10 md:py-14 overflow-y-auto">
                <div className="w-full max-w-[420px] flex flex-col items-center">
                    <div className="w-full text-center space-y-2 mb-5">
                        <h1 className="text-[#2D3748] text-[20px] md:text-[24px] xl:text-[26px] font-medium leading-[1.2]">
                            {t("profile.changePassword.modalPrefix")}{" "}
                            <span className="block text-[#34A4B3] italic font-semibold">{t("profile.changePassword.modalHighlight")}</span>
                        </h1>
                        <p className="text-[#2D3748] text-[13px] md:text-[14px] font-medium leading-relaxed">
                            {t("profile.changePassword.min8Hint")}
                        </p>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>

                    <form onSubmit={handleSubmit} className="w-full max-w-[360px] mx-auto space-y-3.5 text-left">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                    {t("profile.changePassword.current")}
                                </Label>
                                <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                            </div>
                            <div className="relative">
                                <Input
                                    required
                                    type={showActual ? "text" : "password"}
                                    value={contrasenaActual}
                                    onChange={(e) => setContrasenaActual(e.target.value)}
                                    placeholder={t("profile.changePassword.currentPlaceholder")}
                                    className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowActual((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c] transition-colors"
                                    aria-label={showActual ? t("auth.hidePassword") : t("auth.showPassword")}
                                >
                                    {showActual ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                    {t("profile.changePassword.new")}
                                </Label>
                                <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                            </div>
                            <div className="relative">
                                <Input
                                    required
                                    type={showNueva ? "text" : "password"}
                                    value={nuevaContrasena}
                                    onChange={(e) => setNuevaContrasena(e.target.value)}
                                    placeholder={t("profile.changePassword.newPlaceholder")}
                                    className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNueva((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c] transition-colors"
                                    aria-label={showNueva ? t("auth.hidePassword") : t("auth.showPassword")}
                                >
                                    {showNueva ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                    {t("profile.changePassword.confirmNew")}
                                </Label>
                                <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                            </div>
                            <div className="relative">
                                <Input
                                    required
                                    type={showConfirm ? "text" : "password"}
                                    value={confirmarContrasena}
                                    onChange={(e) => setConfirmarContrasena(e.target.value)}
                                    placeholder={t("profile.changePassword.confirmPlaceholder")}
                                    className={`h-[36px] xl:h-[40px] w-full rounded-[10px] border outline-none transition-all text-left text-[12px] xl:text-[13px] font-medium px-3 pr-10 ${
                                        confirmarContrasena.length > 0 && nuevaContrasena !== confirmarContrasena
                                            ? "border-red-300 focus:border-red-500 bg-red-50 text-red-500 placeholder:text-red-300"
                                            : "bg-[#F8F7F7] border-[#DCD7D7] text-[#9A9A9A] placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB]"
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c] transition-colors"
                                    aria-label={showConfirm ? t("auth.hidePassword") : t("auth.showPassword")}
                                >
                                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center pt-2">
                            <Button
                                type="submit"
                                disabled={isLoading || !isValid}
                                className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] disabled:opacity-50 rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("profile.changePassword.updateButton")}
                            </Button>
                        </div>

                        <p className="text-center text-[#404040] text-[11px] xl:text-[12px] font-medium pt-1">
                            <button type="button" onClick={onClose} className="text-[#34A4B3] hover:underline">
                                {t("detail.cancel")}
                            </button>
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
};
