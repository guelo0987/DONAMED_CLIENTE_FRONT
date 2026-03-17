import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { medicamentoService } from "../../services/medicamentoService";
import { MedicationDetailModal } from "../ui/medication-detail-modal";
import { getStoragePublicUrl } from "../../utils/storageUrl";
import type { MedicamentoDetalle, MedicamentoListItem } from "../../types/medicamento";

const PLACEHOLDER_IMAGE = "/assets/Rectangulo%20Medicamentos.png";

interface MedicationCardProps {
    name: string;
    image: string;
    categories?: string;
    isCenter?: boolean;
    position?: -1 | 0 | 1;
    onSelect?: () => void;
    onClick?: () => void;
}

export const MedicationCard = ({ name, image, categories, isCenter = false, position = 0, onSelect, onClick }: MedicationCardProps) => {
    const cardTransform =
        position === 0
            ? "translate3d(0, -12px, 0) scale(1.04)"
            : position === -1
                ? "translate3d(-36px, 0, 0) scale(0.96)"
                : "translate3d(36px, 0, 0) scale(0.96)";

    return (
        <div
            className={`
                bg-white rounded-[13px] shadow-[0px_3.5px_21px_-0.8px_rgba(0,0,0,0.2)]
                relative flex flex-col items-center pb-8 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform cursor-pointer
                ${isCenter
                    ? "w-[290px] lg:w-[320px] min-h-[400px] z-20 opacity-100 shadow-[0px_18px_42px_rgba(0,0,0,0.22)]"
                    : "w-[290px] lg:w-[320px] min-h-[400px] z-10 opacity-100 shadow-[0px_8px_20px_rgba(0,0,0,0.12)]"
                }
            `}
            onClick={onSelect}
            style={{
                transform: cardTransform,
                transformStyle: "preserve-3d",
            }}
        >
            {/* Availability Badge */}
            <div className="absolute top-5 left-5 z-20">
                <div className="inline-flex items-center gap-2 bg-[#DEDEDE] rounded-full px-3 py-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#40C9DB]"></div>
                    <span className="text-[#2D3748] text-[12px] font-medium [font-family:'Poppins',sans-serif]">
                        Disponible
                    </span>
                </div>
            </div>

            {/* Image Container & Shelf */}
            <div className="relative w-full flex flex-col items-center mb-3 mt-9">
                <div className="relative z-10 w-full flex justify-center px-8">
                    <img
                        src={image}
                        alt={name}
                        className={`
                            object-contain drop-shadow-lg transition-all duration-300
                            h-[180px] translate-y-7
                        `}
                        onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                    />
                </div>

                {/* Shelf Image */}
                <div className="relative z-0 -mt-4 w-full flex justify-center">
                    <img
                        src="/assets/rectangle_landing.png"
                        alt=""
                        className="object-contain opacity-90 w-[75%]"
                    />
                </div>
            </div>

            {/* Name & Categories */}
            <div className="px-4 mt-2 mb-6 text-center">
                <p className={`
                    text-[#404040] font-medium leading-[30px] [font-family:'Poppins',sans-serif]
                    text-[18px] lg:text-[20px]
                `}>
                    {name}
                </p>
                {categories && (
                    <p className="text-[#A0AEC0] text-[12px] lg:text-[13px] [font-family:'Poppins',sans-serif] mt-1">
                        {categories}
                    </p>
                )}
            </div>

            {/* Details Button */}
            <div className="mt-auto px-4 w-full flex justify-center">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick?.();
                    }}
                    className={`
                    border-2 border-[#34A4B3] text-[#34A4B3] border-solid rounded-[20px] [font-family:'Poppins',sans-serif] font-medium hover:bg-[#34A4B3] hover:text-white transition-colors
                    w-[128px] py-2 text-[14px]
                `}>
                    Ver detalles
                </button>
            </div>
        </div>
    );
};

export const MedicationsSection = () => {
    const [medicamentos, setMedicamentos] = useState<MedicamentoListItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMedicamento, setSelectedMedicamento] = useState<MedicamentoDetalle | null>(null);
    const [activeIndex, setActiveIndex] = useState(1);

    useEffect(() => {
        const fetchMeds = async () => {
            try {
                const res = await medicamentoService.buscarMedicamentos({ limit: 3 });
                setMedicamentos(res.data?.medicamentos ?? []);
            } catch {
                setMedicamentos([]);
            } finally {
                setLoading(false);
            }
        };
        fetchMeds();
    }, []);

    useEffect(() => {
        if (medicamentos.length === 0) return;
        setActiveIndex((prev) => {
            if (medicamentos.length === 1) return 0;
            return prev >= medicamentos.length ? 1 : prev;
        });
    }, [medicamentos.length]);

    useEffect(() => {
        if (medicamentos.length <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % medicamentos.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [medicamentos.length]);

    const handleVerDetalles = async (med: MedicamentoListItem) => {
        try {
            const res = await medicamentoService.obtenerMedicamento(med.codigo);
            setSelectedMedicamento(res.data ?? null);
        } catch {
            setSelectedMedicamento(null);
        }
    };

    const getOrderedIndices = (): number[] => {
        if (medicamentos.length === 0) return [];
        if (medicamentos.length === 1) return [0];
        if (medicamentos.length === 2) {
            const other = activeIndex === 0 ? 1 : 0;
            return [other, activeIndex];
        }

        const left = (activeIndex - 1 + medicamentos.length) % medicamentos.length;
        const right = (activeIndex + 1) % medicamentos.length;
        return [left, activeIndex, right];
    };

    return (
        <section className="relative w-full py-16 px-4 bg-white overflow-hidden">
            <div className="max-w-[1440px] mx-auto">
                {/* Title */}
                <h2 className="text-center text-[32px] lg:text-[50px] font-bold mb-3 [font-family:'Merienda',cursive]">
                    <span className="text-[#40C9DB]">Medicamentos </span>
                    <span className="text-[#404040]">Disponibles</span>
                </h2>

                {/* Subtitle */}
                <p className="text-center text-[#2D3748] text-[13px] lg:text-[15px] max-w-[850px] mx-auto mb-16 [font-family:'Poppins',sans-serif]">
                    "Cada donación de medicamentos es una oportunidad de vida. Juntos, podemos hacer la diferencia
                    en la salud de quienes más lo necesitan."
                </p>

                {/* Medication Cards */}
                {loading ? (
                    <div className="flex justify-center py-16">
                        <Loader2 className="w-10 h-10 text-[#34A4B3] animate-spin" />
                    </div>
                ) : medicamentos.length === 0 ? (
                    <div className="text-center py-16 text-[#718096] [font-family:'Poppins',sans-serif]">
                        No hay medicamentos disponibles en este momento.
                    </div>
                ) : (
                    <div
                        className="flex justify-center gap-8 lg:gap-10 mb-12 lg:h-[500px] items-end pb-4"
                        style={{ perspective: "1200px" }}
                    >
                        {getOrderedIndices().map((medIndex, slot) => {
                            const med = medicamentos[medIndex];
                            const position: -1 | 0 | 1 = slot === 0 ? -1 : slot === 1 ? 0 : 1;
                            return (
                            <MedicationCard
                                key={med.codigo}
                                name={med.nombre}
                                image={getStoragePublicUrl(med.foto_url) || PLACEHOLDER_IMAGE}
                                categories={med.categorias?.join(", ") || undefined}
                                isCenter={position === 0}
                                position={position}
                                onSelect={() => setActiveIndex(medIndex)}
                                onClick={() => handleVerDetalles(med)}
                            />
                            );
                        })}
                    </div>
                )}

                {/* Pagination Dots */}
                {medicamentos.length > 0 && (
                    <div className="flex items-center justify-center gap-2">
                        {medicamentos.map((_, dot) => (
                            <button
                                key={dot}
                                type="button"
                                aria-label={`Ir al medicamento ${dot + 1}`}
                                onClick={() => setActiveIndex(dot)}
                                className={`h-3 rounded-full transition-all duration-300 ${dot === activeIndex ? "w-7 bg-[#40C9DB]" : "w-3 bg-[#D9D9D9] hover:bg-[#bfc7cf]"}`}
                            />
                        ))}
                    </div>
                )}
            </div>
            <MedicationDetailModal
                open={!!selectedMedicamento}
                onClose={() => setSelectedMedicamento(null)}
                name={selectedMedicamento?.nombre ?? ""}
                image={getStoragePublicUrl(selectedMedicamento?.foto_url) ?? PLACEHOLDER_IMAGE}
                compuesto={selectedMedicamento?.compuesto_principal ?? undefined}
                viaAdministracion={selectedMedicamento?.via_administracion ?? undefined}
                formaFarmaceutica={selectedMedicamento?.forma_farmaceutica ?? undefined}
                itemCode={selectedMedicamento?.codigo}
                categorias={selectedMedicamento?.categorias}
                enfermedades={selectedMedicamento?.enfermedades}
                description={selectedMedicamento?.descripcion ?? undefined}
                proveedor={selectedMedicamento?.proveedor}
            />
        </section>
    );
};
