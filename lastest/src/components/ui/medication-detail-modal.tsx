import { X } from "lucide-react";

interface MedicationDetailModalProps {
    open: boolean;
    onClose: () => void;
    name: string;
    image: string;
    subtitle?: string;
    treatment?: string;
    itemCode?: string;
    category?: string;
    description?: string;
}

export const MedicationDetailModal = ({
    open,
    onClose,
    name,
    image,
    subtitle,
    treatment,
    itemCode,
    category,
    description,
}: MedicationDetailModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
            <div className="relative w-full max-w-[980px] h-[58vh] bg-white rounded-[26px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Cerrar"
                >
                    <X className="w-5 h-5 text-[#5F6368]" />
                </button>

                <div className="w-full md:w-[42%] bg-[#40C9DB] flex items-center justify-center p-4">
                    <img
                        src={image}
                        alt={name}
                        className="max-h-[360px] md:max-h-[460px] object-contain"
                    />
                </div>

                <div className="w-full md:w-[58%] px-6 md:px-10 py-8 overflow-y-auto flex flex-col justify-center">
                    <h2 className="text-[#2D3748] text-[28px] md:text-[32px] font-semibold mb-4">
                        {name}
                    </h2>

                    <div className="space-y-2 text-[#2D3748] text-[14px] md:text-[15px]">
                        {subtitle && <p>{subtitle}</p>}
                        {treatment && <p>{treatment}</p>}
                        {itemCode && <p>Item: {itemCode}</p>}
                        {category && <p>Medicamento {category}</p>}
                    </div>

                    <hr className="my-4 border-[#E5E7EB]" />

                    {description && (
                        <p className="text-[#4A5568] text-[14px] md:text-[15px] leading-relaxed">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
