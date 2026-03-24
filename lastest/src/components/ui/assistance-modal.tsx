import { X } from "lucide-react";
import { useI18n } from "../../i18n/language-context";

interface AssistanceModalProps {
    open: boolean;
    onClose: () => void;
}

export const AssistanceModal = ({ open, onClose }: AssistanceModalProps) => {
    const { t } = useI18n();
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-6 md:p-10">
            <div className="relative w-full max-w-[940px] h-[62vh] bg-white rounded-[26px] shadow-2xl overflow-hidden flex flex-col md:flex-row mx-auto">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label={t("common.cerrar")}
                >
                    <X className="w-5 h-5 text-[#5F6368]" />
                </button>

                <div className="w-full md:w-[44%] bg-[#40C9DB] flex items-end justify-center p-0">
                    <img
                        src="/banners/popup-Ayuda.png"
                        alt={t("landing.assistance.title2")}
                        className="max-h-[520px] md:max-h-[590px] object-contain self-end"
                    />
                </div>

                <div className="w-full md:w-[56%] px-8 md:px-12 py-10 flex flex-col justify-center">
                    <h2 className="text-[#2D3748] text-[24px] md:text-[30px] font-semibold leading-tight mb-3">
                        <span className="text-[#34A4B3] font-['Merienda']">
                            {t("help.title.main")}
                        </span>{" "}
                        {t("help.modalSuffix", "We're Here for You")}
                    </h2>
                    <p className="text-[#4A5568] text-[14px] md:text-[15px] font-medium [font-family:'Poppins',sans-serif] mb-6 max-w-[360px]">
                        {t("landing.assistance.subtitle")}
                    </p>
                    <a
                        href="tel:+18298291829"
                        className="inline-flex items-center justify-center bg-[#34A4B3] text-white px-10 py-3 rounded-[10px] text-[14px] md:text-[15px] font-medium [font-family:'Poppins',sans-serif] hover:bg-[#2B93A1] transition-all self-start"
                    >
                        +1 829-829-1829
                    </a>
                </div>
            </div>
        </div>
    );
};
