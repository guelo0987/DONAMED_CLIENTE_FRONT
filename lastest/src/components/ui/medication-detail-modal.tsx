import { X } from "lucide-react";
import { useI18n } from "../../i18n/language-context";

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
    const { t } = useI18n();
    if (!open) return null;

    const categoriasTexto = categorias?.filter(Boolean).join(", ");
    const enfermedadesTexto = enfermedades?.filter(Boolean).join(", ");

    return (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/45 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-[1040px] bg-white rounded-[24px] shadow-[0px_18px_50px_rgba(0,0,0,0.16)] border border-white/60 overflow-hidden flex flex-col md:flex-row">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/90 hover:bg-white transition-colors border border-gray-100 shadow-sm"
                    aria-label={t("common.cerrar")}
                >
                    <X className="w-6 h-6 text-[#5F6368]" />
                </button>

                {/* Image Side */}
                <div className="w-full md:w-[40%] bg-gradient-to-b from-[#50C7D4] to-[#3FB8C7] flex items-center justify-center p-6 md:p-8 min-h-[280px]">
                    <img
                        src={image}
                        alt={name}
                        className="max-h-[280px] md:max-h-[360px] object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)]"
                        onError={(e) => {
                            e.currentTarget.src = "/assets/Rectangulo%20Medicamentos.png";
                        }}
                    />
                </div>

                {/* Info Side */}
                <div className="w-full md:w-[60%] px-7 md:px-10 py-8 md:py-9 overflow-y-auto flex flex-col">
                    {/* Name */}
                    <h2 className="text-[#2D3748] text-[28px] md:text-[36px] font-semibold mb-2 leading-[1.1]">
                        {name}
                    </h2>

                    {compuesto && (
                        <p className="text-[#34A4B3] text-[20px] md:text-[24px] font-semibold mb-2 leading-[1.2]">
                            {compuesto}
                        </p>
                    )}

                    {itemCode && (
                        <p className="text-[#7A8597] text-[14px] md:text-[16px] font-medium mb-5">
                            Código: {itemCode}
                        </p>
                    )}

                    {(formaFarmaceutica || viaAdministracion) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mb-5">
                            {formaFarmaceutica && (
                                <div>
                                    <p className="text-[#7A8597] text-[11px] md:text-[12px] uppercase tracking-[0.06em] font-semibold mb-1">
                                        {t("medicationModal.pharmaceuticalForm")}
                                    </p>
                                    <p className="text-[#2D3748] text-[14px] md:text-[15px] font-medium">
                                        {formaFarmaceutica}
                                    </p>
                                </div>
                            )}
                            {viaAdministracion && (
                                <div>
                                    <p className="text-[#7A8597] text-[11px] md:text-[12px] uppercase tracking-[0.06em] font-semibold mb-1">
                                        {t("medicationModal.administrationRoute")}
                                    </p>
                                    <p className="text-[#2D3748] text-[14px] md:text-[15px] font-medium">
                                        {viaAdministracion}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {categoriasTexto && (
                        <div className="mb-4">
                            <p className="text-[#7A8597] text-[11px] md:text-[12px] uppercase tracking-[0.06em] font-semibold mb-1">
                                {t("medicationModal.categories")}
                            </p>
                            <p className="text-[#2D3748] text-[14px] md:text-[15px] font-medium">
                                {categoriasTexto}
                            </p>
                        </div>
                    )}

                    {enfermedadesTexto && (
                        <div className="mb-4">
                            <p className="text-[#7A8597] text-[11px] md:text-[12px] uppercase tracking-[0.06em] font-semibold mb-1">
                                {t("medicationModal.indicatedFor")}
                            </p>
                            <p className="text-[#2D3748] text-[14px] md:text-[15px] font-medium">
                                {enfermedadesTexto}
                            </p>
                        </div>
                    )}

                    <hr className="my-3 border-[#DCE1E7]" />

                    <p className="text-[#7A8597] text-[11px] md:text-[12px] uppercase tracking-[0.06em] font-semibold mb-2">
                        {t("medicationModal.description")}
                    </p>
                    <p className="text-[#4A5568] text-[13px] md:text-[14px] leading-[1.65] mb-5">
                        {description || t("medicationModal.noDescription")}
                    </p>

                    {proveedor?.nombre && (
                        <>
                            <hr className="my-3 border-[#DCE1E7]" />
                            <p className="text-[#7A8597] text-[11px] md:text-[12px] uppercase tracking-[0.06em] font-semibold mb-1">
                                {t("medicationModal.provider")}
                            </p>
                            <p className="text-[#2D3748] text-[14px] md:text-[15px] font-semibold">
                                {proveedor.nombre}
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
