import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useI18n } from "../../i18n/language-context";
import { OverlayPortal } from "./overlay-portal";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    hideHeader?: boolean;
    panelClassName?: string;
    bodyClassName?: string;
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    hideHeader = false,
    panelClassName = "",
    bodyClassName = "",
}: ModalProps) => {
    const { t } = useI18n();
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <OverlayPortal>
            <div
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200"
                onClick={handleBackdropClick}
            >
                <div
                    ref={modalRef}
                    className={`relative bg-white rounded-[17px] w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl animate-in zoom-in-95 duration-200 flex flex-col ${panelClassName}`}
                >
                    {!hideHeader ? (
                        <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="text-[24px] font-medium text-[#2D3748] font-['Poppins']">
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label={`${t("common.cerrar")} modal`}
                            >
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 p-2 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label={`${t("common.cerrar")} modal`}
                        >
                            <X className="w-6 h-6 text-[#6B7280]" />
                        </button>
                    )}

                    <div className={`font-['Poppins'] flex-1 min-h-0 overflow-y-auto ${bodyClassName || "p-6"}`}>
                        {children}
                    </div>
                </div>
            </div>
        </OverlayPortal>
    );
};
