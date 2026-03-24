import { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useI18n } from "../../../i18n/language-context";

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-[12px] border border-red-100 text-sm">
                    {error}
                </div>
            )}

            <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium text-gray-700">{t("profile.changePassword.current")} *</label>
                <div className="relative">
                    <input
                        required
                        type={showActual ? "text" : "password"}
                        value={contrasenaActual}
                        onChange={(e) => setContrasenaActual(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-[#DCD7D7] focus:border-[#40C9DB] focus:ring-1 focus:ring-[#40C9DB] outline-none transition-all placeholder:text-gray-400 font-['Poppins']"
                        placeholder={t("profile.changePassword.currentPlaceholder")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowActual(!showActual)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c]"
                    >
                        {showActual ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium text-gray-700">{t("profile.changePassword.new")} *</label>
                <div className="relative">
                    <input
                        required
                        type={showNueva ? "text" : "password"}
                        value={nuevaContrasena}
                        onChange={(e) => setNuevaContrasena(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-[#DCD7D7] focus:border-[#40C9DB] focus:ring-1 focus:ring-[#40C9DB] outline-none transition-all placeholder:text-gray-400 font-['Poppins']"
                        placeholder={t("profile.changePassword.newPlaceholder")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowNueva(!showNueva)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c]"
                    >
                        {showNueva ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {nuevaContrasena.length > 0 && nuevaContrasena.length < 8 && (
                    <span className="text-xs text-red-500 mt-1">{t("profile.changePassword.min8Hint")}</span>
                )}
            </div>

            <div className="flex flex-col gap-2 relative">
                <label className="text-sm font-medium text-gray-700">{t("profile.changePassword.confirmNew")} *</label>
                <div className="relative">
                    <input
                        required
                        type={showConfirm ? "text" : "password"}
                        value={confirmarContrasena}
                        onChange={(e) => setConfirmarContrasena(e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border focus:ring-1 outline-none transition-all placeholder:text-gray-400 font-['Poppins']
                            ${confirmarContrasena.length > 0 && nuevaContrasena !== confirmarContrasena
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-50'
                                : 'border-[#DCD7D7] focus:border-[#40C9DB] focus:ring-[#40C9DB]'
                            }`}
                        placeholder={t("profile.changePassword.confirmPlaceholder")}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c]"
                    >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 font-['Poppins']"
                >
                    {t("detail.cancel")}
                </button>
                <button
                    type="submit"
                    disabled={isLoading || !isValid}
                    className="px-6 py-2.5 rounded-lg bg-[#40C9DB] text-white font-medium hover:bg-[#34A4B3] transition-colors flex items-center justify-center min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed font-['Poppins']"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : t("profile.changePassword.updateButton")}
                </button>
            </div>
        </form>
    );
};
