import { X } from "lucide-react";

interface MedicationDetailModalProps {
    open: boolean;
    onClose: () => void;
    name: string;
    image: string;
    compuesto?: string;
    viaAdministracion?: string;
    formaFarmaceutica?: string;
    itemCode?: string;
    categorias?: string[];
    enfermedades?: string[];
    description?: string;
    proveedor?: { rnc: string; nombre: string } | null;
}

export const MedicationDetailModal = ({
    open,
    onClose,
    name,
    image,
    compuesto,
    viaAdministracion,
    formaFarmaceutica,
    itemCode,
    categorias,
    enfermedades,
    description,
    proveedor,
}: MedicationDetailModalProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
            <div className="relative w-full max-w-[980px] max-h-[85vh] bg-white rounded-[26px] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Cerrar"
                >
                    <X className="w-5 h-5 text-[#5F6368]" />
                </button>

                {/* Image Side */}
                <div className="w-full md:w-[42%] bg-[#40C9DB] flex items-center justify-center p-4 min-h-[200px]">
                    <img
                        src={image}
                        alt={name}
                        className="max-h-[300px] md:max-h-[420px] object-contain"
                        onError={(e) => {
                            e.currentTarget.src = "/assets/Rectangulo%20Medicamentos.png";
                        }}
                    />
                </div>

                {/* Info Side */}
                <div className="w-full md:w-[58%] px-6 md:px-10 py-8 overflow-y-auto flex flex-col">
                    {/* Name */}
                    <h2 className="text-[#2D3748] text-[26px] md:text-[30px] font-semibold mb-1 leading-tight">
                        {name}
                    </h2>

                    {/* Compuesto Principal */}
                    {compuesto && (
                        <p className="text-[#34A4B3] text-[14px] md:text-[15px] font-medium mb-4">
                            {compuesto}
                        </p>
                    )}

                    {/* Código */}
                    {itemCode && (
                        <p className="text-[#A0AEC0] text-[12px] md:text-[13px] mb-4 [font-family:'Poppins',sans-serif]">
                            Código: {itemCode}
                        </p>
                    )}

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {formaFarmaceutica && (
                            <div className="bg-[#F7FAFB] rounded-[12px] px-4 py-3 border border-[#E2E8F0]">
                                <p className="text-[#A0AEC0] text-[11px] font-medium uppercase tracking-wide mb-0.5">Forma Farmacéutica</p>
                                <p className="text-[#2D3748] text-[14px] font-medium">💊 {formaFarmaceutica}</p>
                            </div>
                        )}
                        {viaAdministracion && (
                            <div className="bg-[#F7FAFB] rounded-[12px] px-4 py-3 border border-[#E2E8F0]">
                                <p className="text-[#A0AEC0] text-[11px] font-medium uppercase tracking-wide mb-0.5">Vía de Administración</p>
                                <p className="text-[#2D3748] text-[14px] font-medium">💉 {viaAdministracion}</p>
                            </div>
                        )}
                    </div>

                    {/* Categories */}
                    {categorias && categorias.length > 0 && (
                        <div className="mb-3">
                            <p className="text-[#A0AEC0] text-[11px] font-medium uppercase tracking-wide mb-1.5">Categorías</p>
                            <div className="flex flex-wrap gap-1.5">
                                {categorias.map((cat, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center bg-[#F0FDFF] text-[#2D8A96] text-[12px] font-medium px-3 py-1 rounded-full border border-[#40C9DB]/20"
                                    >
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Enfermedades */}
                    {enfermedades && enfermedades.length > 0 && (
                        <div className="mb-3">
                            <p className="text-[#A0AEC0] text-[11px] font-medium uppercase tracking-wide mb-1.5">Indicado para</p>
                            <div className="flex flex-wrap gap-1.5">
                                {enfermedades.map((enf, i) => (
                                    <span
                                        key={i}
                                        className="inline-flex items-center bg-[#FFF8F0] text-[#B87333] text-[12px] font-medium px-3 py-1 rounded-full border border-[#B87333]/20"
                                    >
                                        {enf}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <hr className="my-3 border-[#E5E7EB]" />

                    {/* Description */}
                    {description && (
                        <div className="mb-3">
                            <p className="text-[#A0AEC0] text-[11px] font-medium uppercase tracking-wide mb-1.5">Descripción</p>
                            <p className="text-[#4A5568] text-[14px] md:text-[15px] leading-relaxed">
                                {description}
                            </p>
                        </div>
                    )}

                    {/* Proveedor */}
                    {proveedor && (
                        <div className="mt-auto pt-3 border-t border-[#E5E7EB]">
                            <p className="text-[#A0AEC0] text-[11px] font-medium uppercase tracking-wide mb-1">Proveedor</p>
                            <p className="text-[#2D3748] text-[14px] font-medium">{proveedor.nombre}</p>

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
