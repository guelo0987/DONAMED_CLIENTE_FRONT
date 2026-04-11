import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../../../components/ui/buttons";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useI18n } from "../../../i18n/language-context";

type AccountActionMode = "deactivate" | "delete";

interface AccountActionModalProps {
    mode: AccountActionMode;
    onConfirm: (email: string, password: string) => Promise<void> | void;
}

export const AccountActionModal = ({ mode, onConfirm }: AccountActionModalProps) => {
    const { t } = useI18n();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const isDeleteMode = mode === "delete";
    const highlightKey = isDeleteMode
        ? "dashboard.confirmActionDeleteWord"
        : "dashboard.confirmActionDeactivateWord";
    const buttonLabelKey = isDeleteMode ? "dashboard.deleteAccount" : "dashboard.deactivateAccount";
    const isFormValid = email.trim().length > 0 && password.trim().length > 0;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!isFormValid || isLoading) return;

        setIsLoading(true);
        try {
            await onConfirm(email, password);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid w-full h-full min-h-0 grid-cols-1 md:grid-cols-[40%_60%] bg-white overflow-hidden">
            <aside className="relative hidden md:block h-full min-h-0 bg-[#40C9DB] overflow-hidden">
                <img
                    src="/logos/donamed_logo_auth.png"
                    alt="Donamed Logo"
                    className="absolute top-8 left-8 lg:top-10 lg:left-10 z-30 w-[210px] lg:w-[245px] xl:w-[280px] h-auto object-contain"
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

            <section className="min-h-0 h-full bg-white flex items-center justify-center px-8 md:px-10 lg:px-14 xl:px-20 py-8 overflow-y-auto">
                <div className="w-full max-w-[420px] flex flex-col items-center">
                    <div className="w-full text-center mb-5">
                        <h1 className="text-[#2D3748] text-[24px] leading-[1.15] font-medium">
                            {t("dashboard.confirmActionPrefix")}{" "}
                            <span className="text-[#34A4B3] italic font-semibold font-['Merienda']">{t(highlightKey)}</span>
                            <br />
                            {t("dashboard.confirmActionSuffix")}
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full max-w-[360px] mx-auto space-y-3.5 text-left">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                    {t("auth.email")}
                                </Label>
                                <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                            </div>
                            <Input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t("dashboard.confirmActionEmailPlaceholder")}
                                className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">
                                    {t("auth.password")}
                                </Label>
                                <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                            </div>
                            <div className="relative">
                                <Input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder={t("dashboard.confirmActionPasswordPlaceholder")}
                                    className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c] transition-colors"
                                    aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center pt-2">
                            <Button
                                type="submit"
                                disabled={!isFormValid || isLoading}
                                className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] disabled:opacity-50 rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                            >
                                {isLoading ? "..." : t(buttonLabelKey)}
                            </Button>
                        </div>

                        {isDeleteMode && (
                            <p className="text-center text-[#2D3748] text-[12px] xl:text-[13px] font-medium pt-1">
                                {t("dashboard.deleteConfirmDesc")}{" "}
                                <span className="text-[#34A4B3]">{t("dashboard.deleteConfirmDescHighlight")}</span>
                            </p>
                        )}
                    </form>
                </div>
            </section>
        </div>
    );
};
