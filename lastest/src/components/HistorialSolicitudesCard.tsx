import { useNavigate } from "react-router-dom";
import { useSolicitudes } from "../hooks/useSolicitudes";
import { useState, useEffect } from "react";
import { Loader2, ChevronRight } from "lucide-react";
import type { SolicitudResumen, EstadoSolicitud } from "../types/solicitud";
import { useI18n } from "../i18n/language-context";

const STATUS_LABELS: Record<EstadoSolicitud, string> = {
    PENDIENTE: "Pendiente",
    EN_REVISION: "En Revisión",
    APROBADA: "Aprobada",
    RECHAZADA: "Rechazada",
    DESPACHADA: "Despachada",
    CANCELADA: "Cancelada",
    INCOMPLETA: "Incompleta"
};

const STATUS_LABELS_EN: Record<EstadoSolicitud, string> = {
    PENDIENTE: "Pending",
    EN_REVISION: "In Review",
    APROBADA: "Approved",
    RECHAZADA: "Rejected",
    DESPACHADA: "Dispatched",
    CANCELADA: "Cancelled",
    INCOMPLETA: "Incomplete"
};

const STATUS_LABELS_FR: Record<EstadoSolicitud, string> = {
    PENDIENTE: "En attente",
    EN_REVISION: "En révision",
    APROBADA: "Approuvée",
    RECHAZADA: "Rejetée",
    DESPACHADA: "Expédiée",
    CANCELADA: "Annulée",
    INCOMPLETA: "Incomplète"
};

const STATUS_LABELS_PT: Record<EstadoSolicitud, string> = {
    PENDIENTE: "Pendente",
    EN_REVISION: "Em revisão",
    APROBADA: "Aprovada",
    RECHAZADA: "Rejeitada",
    DESPACHADA: "Despachada",
    CANCELADA: "Cancelada",
    INCOMPLETA: "Incompleta"
};

const STATUS_DOT_COLORS: Record<EstadoSolicitud, string> = {
    PENDIENTE: "bg-[#EAB308]",
    EN_REVISION: "bg-blue-500",
    APROBADA: "bg-green-500",
    RECHAZADA: "bg-red-500",
    DESPACHADA: "bg-purple-500",
    CANCELADA: "bg-gray-400",
    INCOMPLETA: "bg-orange-500",
};

const RequestItem = ({ solicitud }: { solicitud: SolicitudResumen }) => {
    const { t, language } = useI18n();
    const navigate = useNavigate();
    const fecha = solicitud.creada_en
        ? new Date(solicitud.creada_en).toLocaleDateString('es-DO', { day: '2-digit', month: '2-digit', year: 'numeric' })
        : "N/A";

    const statusMap =
        language === "en"
            ? STATUS_LABELS_EN
            : language === "fr"
                ? STATUS_LABELS_FR
                : language === "pt"
                    ? STATUS_LABELS_PT
                    : STATUS_LABELS;
    return (
        <div
            onClick={() => navigate(`/detalle-solicitud/${solicitud.numerosolicitud}`)}
            className="bg-white rounded-[15px] p-4 flex items-center gap-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
        >
            {/* Medicine Icon */}
            <div className="w-[46px] h-[45px] bg-[#34A4B3]/20 rounded-[15px] flex items-center justify-center flex-shrink-0">
                <img src="/medicines/historial.png" alt="Medicine" className="w-[37px] h-[36px] object-contain" />
            </div>

            {/* Date */}
            <div className="flex flex-col min-w-[68px]">
                <span className="text-[#2D3748] font-medium text-[13px] font-['Poppins']">{t("historial.date")}</span>
                <span className="text-[#232323] text-[12px] font-['Poppins']">{fecha}</span>
            </div>

            {/* Medication */}
            <div className="flex flex-col min-w-[90px]">
                <span className="text-[#232323] font-medium text-[13px] font-['Poppins']">{t("historial.medication")}</span>
                <span className="text-[#2D3748] text-[12px] font-['Poppins'] truncate max-w-[120px]">
                    {solicitud.patologia || "N/A"}
                </span>
            </div>

            {/* Status */}
            <div className="flex flex-col ml-auto min-w-[65px]">
                <span className="text-[#232323] font-medium text-[13px] font-['Poppins']">{t("historial.status")}</span>
                <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${STATUS_DOT_COLORS[solicitud.estado]}`}></div>
                    <span className="text-[#2D3748] text-[12px] font-['Poppins']">{statusMap[solicitud.estado]}</span>
                </div>
            </div>

            {/* Arrow */}
            <ChevronRight className="w-4 h-4 text-[#5F6368] flex-shrink-0" />
        </div>
    );
};

export const HistorialSolicitudesCard = () => {
    const { t } = useI18n();
    const { fetchHistorial } = useSolicitudes();
    const [solicitudes, setSolicitudes] = useState<SolicitudResumen[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            const data = await fetchHistorial(undefined, 1, 3); // Últimas 3
            if (data?.solicitudes) setSolicitudes(data.solicitudes);
            setLoading(false);
        };
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="w-full xl:w-[52%] bg-white border border-[#E8EDF3] rounded-[16px] p-5 sm:p-6 min-h-[358px] shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#2D3748] text-[19px] sm:text-[20px] font-semibold font-['Poppins']">
                    {t("historial.title")}
                </h3>
                <button
                    onClick={() => navigate('/historial-solicitudes')}
                    className="text-[#34A4B3] text-[13px] sm:text-sm font-['Poppins'] font-medium hover:underline"
                >
                    {t("detail.goToHistory")}
                </button>
            </div>

            <div className="w-full h-px bg-[#E2E8F0] mb-5"></div>

            {loading ? (
                <div className="flex justify-center items-center h-[200px]">
                    <Loader2 className="w-6 h-6 animate-spin text-[#34A4B3]" />
                </div>
            ) : solicitudes.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {solicitudes.map(sol => (
                        <RequestItem key={sol.numerosolicitud} solicitud={sol} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                    <p className="text-gray-400 font-['Poppins'] text-sm">No tiene solicitudes aún.</p>
                    <button
                        onClick={() => navigate('/solicitudes')}
                        className="mt-3 text-[#34A4B3] font-['Poppins'] text-sm font-medium hover:underline"
                    >
                        {t("nav.nuevaSolicitud")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default HistorialSolicitudesCard;
