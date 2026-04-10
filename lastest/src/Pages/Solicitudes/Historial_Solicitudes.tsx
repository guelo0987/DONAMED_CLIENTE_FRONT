import { ChevronRight, Loader2 } from "lucide-react";
import { MainLayout } from "../../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSolicitudes } from "../../hooks/useSolicitudes";
import type { SolicitudResumen, EstadoSolicitud } from "../../types/solicitud";
import { useI18n } from "../../i18n/language-context";

const HISTORIAL_GUIDE_STORAGE_KEY = "donamed.historial.guide.dismissed";
const HISTORIAL_ONBOARDING_STORAGE_KEY = "donamed.historial.onboarding.completed";

// Helper to translate backend states to human-readable badges
const getStatusLabel = (estado: EstadoSolicitud, isEnglish: boolean) => {
    const labels: Record<EstadoSolicitud, string> = isEnglish ? {
        PENDIENTE: "Pending",
        EN_REVISION: "In Review",
        APROBADA: "Approved",
        RECHAZADA: "Rejected",
        DESPACHADA: "Dispatched",
        CANCELADA: "Cancelled",
        INCOMPLETA: "Incomplete"
    } : {
        PENDIENTE: "Pendiente",
        EN_REVISION: "En Revisión",
        APROBADA: "Aprobada",
        RECHAZADA: "Rechazada",
        DESPACHADA: "Despachada",
        CANCELADA: "Cancelada",
        INCOMPLETA: "Incompleta"
    };
    return labels[estado] || estado;
};

const RequestCard = ({
    numerosolicitud,
    date,
    medication,
    statusLabel,
    t
}: {
    numerosolicitud: number;
    date: string;
    medication: string;
    statusLabel: string;
    t: (key: string, fallback?: string) => string;
}) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/detalle-solicitud/${numerosolicitud}`)}
            className="w-full bg-white rounded-[12px] shadow-sm border border-gray-100 p-3.5 hover:shadow-md transition-shadow cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >

            {/* Icon & Main Info Wrapper for Mobile alignment */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Icon */}
                <div className="flex-shrink-0">
                    <div className="w-[56px] h-[52px] bg-[#34A4B3]/20 rounded-[12px] flex items-center justify-center">
                        <img
                            src="/medicines/historial.png" // Ensure this asset exists or use a fallback
                            alt="med-icon"
                            className="w-[24px] h-auto opacity-100 mix-blend-normal"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                    const text = document.createElement('span');
                                    text.innerText = "Rx";
                                    text.className = "text-[#34A4B3] font-bold text-xl";
                                    parent.appendChild(text);
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Mobile: Show minimal info next to icon if needed, or keep grid below */}
            </div>

            {/* Info Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 w-full text-left sm:text-center">
                {/* Fecha */}
                <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start">
                    <span className="font-['Poppins'] font-medium text-[#2D3748] text-[13px] sm:text-[14px] sm:hidden">{t("historial.date")}:</span>
                    <div className="flex flex-col items-end sm:items-start text-right sm:text-left">
                        <span className="font-['Poppins'] font-medium text-[#2D3748] text-[14px] hidden sm:block">{t("historial.date")}</span>
                        <span className="font-['Poppins'] font-normal text-[#2D3748] text-[13px] sm:text-[14px]">{date}</span>
                    </div>
                </div>

                {/* Medicamento */}
                <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start">
                    <span className="font-['Poppins'] font-medium text-[#232323] text-[13px] sm:text-[14px] sm:hidden">{t("historial.medication")}:</span>
                    <div className="flex flex-col items-end sm:items-start text-right sm:text-left">
                        <span className="font-['Poppins'] font-medium text-[#232323] text-[14px] hidden sm:block">{t("historial.medication")}</span>
                        <span className="font-['Poppins'] font-normal text-[#2D3748] text-[13px] sm:text-[14px]">{medication}</span>
                    </div>
                </div>

                {/* Estado */}
                <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start">
                    <span className="font-['Poppins'] font-medium text-[#232323] text-[13px] sm:text-[14px] sm:hidden">{t("historial.status")}:</span>
                    <div className="flex flex-col items-end sm:items-start text-right sm:text-left">
                        <span className="font-['Poppins'] font-medium text-[#232323] text-[14px] hidden sm:block">{t("historial.status")}</span>
                        <span className="font-['Poppins'] font-normal text-[#2D3748] text-[13px] sm:text-[14px]">{statusLabel}</span>
                    </div>
                </div>
            </div>

            {/* Arrow */}
            <div className="hidden sm:block pr-2">
                <ChevronRight className="w-5 h-5 text-[#5F6368]" />
            </div>
        </div>
    );
};

export const HistorialSolicitudes = () => {
    const { t, language } = useI18n();
    const { fetchHistorial, isLoading, error } = useSolicitudes();
    const [solicitudes, setSolicitudes] = useState<SolicitudResumen[]>([]);
    const [showGuide, setShowGuide] = useState<boolean>(() => {
        try {
            return localStorage.getItem(HISTORIAL_GUIDE_STORAGE_KEY) !== "1";
        } catch {
            return true;
        }
    });
    const [onboardingStep, setOnboardingStep] = useState<number>(() => {
        try {
            return localStorage.getItem(HISTORIAL_ONBOARDING_STORAGE_KEY) === "1" ? -1 : 0;
        } catch {
            return 0;
        }
    });

    useEffect(() => {
        const loadHistory = async () => {
            const data = await fetchHistorial();
            if (data?.solicitudes) {
                setSolicitudes(data.solicitudes);
            }
        };
        loadHistory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Opcional: Separar recentes vs anteriores bajo alguna logica del front. 
    // Por el momento enviaremos todo en "Recientes" (ya vienen ordenadas desc por Fecha de creación)
    const recentRequests = solicitudes;
    const onboardingSteps = [
        {
            target: "list",
            title: t("historial.onboarding.step1Title"),
            description: t("historial.onboarding.step1Desc"),
        },
        {
            target: "status",
            title: t("historial.onboarding.step2Title"),
            description: t("historial.onboarding.step2Desc"),
        },
        {
            target: "open",
            title: t("historial.onboarding.step3Title"),
            description: t("historial.onboarding.step3Desc"),
        },
    ] as const;
    const isOnboardingActive = onboardingStep >= 0;
    const currentOnboarding = isOnboardingActive ? onboardingSteps[onboardingStep] : null;

    const handleHideGuide = () => {
        setShowGuide(false);
        localStorage.setItem(HISTORIAL_GUIDE_STORAGE_KEY, "1");
    };

    const handleShowGuide = () => {
        setShowGuide(true);
        localStorage.removeItem(HISTORIAL_GUIDE_STORAGE_KEY);
    };

    const finishOnboarding = () => {
        setOnboardingStep(-1);
        localStorage.setItem(HISTORIAL_ONBOARDING_STORAGE_KEY, "1");
    };

    const nextOnboardingStep = () => {
        if (onboardingStep >= onboardingSteps.length - 1) {
            finishOnboarding();
            return;
        }
        setOnboardingStep((prev) => prev + 1);
    };

    return (
        <MainLayout>
            <div className="w-full pb-14 lg:pb-16">
                {/* Banner Section */}
                <div className="relative w-full max-w-[1060px] mx-auto pt-4 sm:pt-6 px-4 sm:px-5 md:px-6 lg:px-7 mb-8 sm:mb-10">
                    <div className="relative w-full h-[150px] sm:h-[200px] rounded-[12px] overflow-hidden bg-[#40C9DB] shadow-md">
                        {/* Background Pattern/Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#40C9DB] to-[#4FD1C5] opacity-90" />
                        <img
                            src="/banners/historial_banner.png"
                            className="absolute inset-0 w-full h-full object-cover opacity-100 mix-blend-overlay"
                            alt="pattern"
                            onError={(e) => e.currentTarget.style.display = 'none'}
                        />

                        {/* Glassmorphism Card Title */}
                        <div className="absolute bottom-0 left-0 sm:left-[4%] w-full sm:w-[56%] md:w-[48%] h-[52px] sm:h-[58%]
                                    bg-white/90 sm:bg-white/80 backdrop-blur-md sm:rounded-t-[12px] border-t border-white/50
                                    flex items-center justify-center sm:justify-start px-5 sm:px-6 shadow-sm">
                            <h1 className="font-['Poppins'] font-normal text-[#2D3748] text-[18px] sm:text-[24px] md:text-[30px]">
                                {t("historial.title")}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="max-w-[1060px] mx-auto px-4 sm:px-5 md:px-6 lg:px-7">
                    <div className="mb-4 space-y-2">
                        <div className="flex justify-end">
                            {showGuide ? (
                                <button
                                    type="button"
                                    onClick={handleHideGuide}
                                    className="inline-flex items-center rounded-full border border-[#BFEAF2] bg-[#EBFAFD] px-3 py-1 text-[#34A4B3] text-[12px] font-medium hover:bg-[#E1F6FB] transition-colors"
                                >
                                    {t("historial.guide.hide")}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleShowGuide}
                                    className="inline-flex items-center rounded-full border border-[#BFEAF2] bg-[#EBFAFD] px-3 py-1 text-[#34A4B3] text-[12px] font-medium hover:bg-[#E1F6FB] transition-colors"
                                >
                                    {t("historial.guide.show")}
                                </button>
                            )}
                        </div>

                        {isOnboardingActive && currentOnboarding && (
                            <div className="rounded-[12px] border border-[#BFEAF2] bg-[#EBFAFD] p-3 shadow-[0_6px_16px_rgba(52,164,179,0.12)]">
                                <p className="text-[#34A4B3] text-[11px] font-semibold uppercase tracking-wide">
                                    {t("historial.onboarding.badge")} {onboardingStep + 1}/{onboardingSteps.length}
                                </p>
                                <p className="text-[#2D3748] text-[13px] font-semibold mt-1">
                                    {currentOnboarding.title}
                                </p>
                                <p className="text-[#64748B] text-[11px] mt-1 leading-snug">
                                    {currentOnboarding.description}
                                </p>
                                <div className="mt-3 flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={finishOnboarding}
                                        className="text-[#64748B] text-[11px] font-medium hover:underline"
                                    >
                                        {t("historial.onboarding.skip")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextOnboardingStep}
                                        className="text-[#34A4B3] text-[11px] font-semibold hover:underline"
                                    >
                                        {onboardingStep === onboardingSteps.length - 1
                                            ? t("historial.onboarding.finish")
                                            : t("historial.onboarding.next")}
                                    </button>
                                </div>
                            </div>
                        )}

                        {showGuide && (
                            <div className="rounded-[12px] border border-[#CFEFF4] bg-[#F1FBFD] p-3">
                                <p className="text-[#2D3748] text-[13px] font-semibold">
                                    {t("historial.guide.title")}
                                </p>
                                <p className="text-[#64748B] text-[11px] mt-0.5">
                                    {t("historial.guide.subtitle")}
                                </p>
                                <div className="mt-2.5 space-y-1.5">
                                    <p className="text-[#2D3748] text-[12px] font-medium">1. {t("historial.guide.step1")}</p>
                                    <p className="text-[#2D3748] text-[12px] font-medium">2. {t("historial.guide.step2")}</p>
                                    <p className="text-[#2D3748] text-[12px] font-medium">3. {t("historial.guide.step3")}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Recientes Section */}
                    <section className={`mb-10 rounded-[12px] ${currentOnboarding?.target === "list" || currentOnboarding?.target === "status" ? "ring-2 ring-[#40C9DB]/30 p-2" : ""}`}>
                        <h2 className="font-['Poppins'] font-normal text-[#2D3748] text-[22px] sm:text-[26px] mb-5 border-b border-[#DCD7D7] pb-2">
                            {t("historial.myRequests")}
                        </h2>

                        {isLoading && (
                            <div className="flex justify-center items-center py-10">
                                <Loader2 className="w-8 h-8 animate-spin text-[#40C9DB]" />
                            </div>
                        )}

                        {error && !isLoading && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                                {error}
                            </div>
                        )}

                        {!isLoading && !error && recentRequests.length === 0 && (
                            <div className="text-center py-10">
                                <p className="text-gray-500 font-['Poppins'] text-base">{t("historial.empty")}</p>
                            </div>
                        )}

                        <div className={`space-y-3 ${currentOnboarding?.target === "open" ? "rounded-[12px] ring-2 ring-[#40C9DB]/30 p-2" : ""}`}>
                            {recentRequests.map((req) => (
                                <RequestCard
                                    key={req.numerosolicitud}
                                    numerosolicitud={req.numerosolicitud}
                                    date={new Date(req.creada_en).toLocaleDateString('es-DO')}
                                    medication={req.patologia} // Use pathology as the main subject string for generic lists
                                    statusLabel={getStatusLabel(req.estado, language !== "es")}
                                    t={t}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
};
