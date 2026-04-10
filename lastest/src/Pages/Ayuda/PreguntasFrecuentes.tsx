import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { MainLayout } from "../../components/layout/MainLayout";
import { AssistanceModal } from "../../components/ui/assistance-modal";
import { useI18n } from "../../i18n/language-context";

const AYUDA_GUIDE_STORAGE_KEY = "donamed.ayuda.guide.dismissed";
const AYUDA_ONBOARDING_STORAGE_KEY = "donamed.ayuda.onboarding.completed";

export const PreguntasFrecuentes = () => {
    const { t, language } = useI18n();
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [isAssistanceOpen, setIsAssistanceOpen] = useState(false);
    const [showGuide, setShowGuide] = useState<boolean>(() => {
        try {
            return localStorage.getItem(AYUDA_GUIDE_STORAGE_KEY) !== "1";
        } catch {
            return true;
        }
    });
    const [onboardingStep, setOnboardingStep] = useState<number>(() => {
        try {
            return localStorage.getItem(AYUDA_ONBOARDING_STORAGE_KEY) === "1" ? -1 : 0;
        } catch {
            return 0;
        }
    });

    const onboardingSteps = [
        {
            target: "assistance",
            title: t("help.onboarding.step1Title"),
            description: t("help.onboarding.step1Desc"),
        },
        {
            target: "faq",
            title: t("help.onboarding.step2Title"),
            description: t("help.onboarding.step2Desc"),
        },
    ] as const;
    const isOnboardingActive = onboardingStep >= 0;
    const currentOnboarding = isOnboardingActive ? onboardingSteps[onboardingStep] : null;

    const handleHideGuide = () => {
        setShowGuide(false);
        localStorage.setItem(AYUDA_GUIDE_STORAGE_KEY, "1");
    };

    const handleShowGuide = () => {
        setShowGuide(true);
        localStorage.removeItem(AYUDA_GUIDE_STORAGE_KEY);
    };

    const finishOnboarding = () => {
        setOnboardingStep(-1);
        localStorage.setItem(AYUDA_ONBOARDING_STORAGE_KEY, "1");
    };

    const nextOnboardingStep = () => {
        if (onboardingStep >= onboardingSteps.length - 1) {
            finishOnboarding();
            return;
        }
        setOnboardingStep((prev) => prev + 1);
    };
    const faqs = language !== "es"
        ? [
            {
                question: "How can I request a high-cost medicine?",
                answer: "After signing in, go to requests, choose the medicine you need, attach the required medical documents, and confirm your request.",
            },
            {
                question: "What documents are required to request a medicine?",
                answer: "You need a valid medical prescription, specialist diagnosis, and identity document. Additional studies may be required in some cases.",
            },
            {
                question: "How can I set medicine availability alerts?",
                answer: "From your profile, you can enable notifications to receive alerts when a medicine is available.",
            },
        ]
        : [
            {
                question: "¿Cómo puedo solicitar un medicamento de alto costo?",
                answer: "Después de iniciar sesión, dirígete a la sección de solicitudes, elige el medicamento que necesitas, adjunta los documentos médicos necesarios y confirma tu solicitud.",
            },
            {
                question: "¿Qué documentos son necesarios para solicitar un medicamento?",
                answer: "Necesitas tu receta médica vigente, diagnóstico del especialista y documento de identidad. En algunos casos se solicitarán estudios adicionales.",
            },
            {
                question: "¿Cómo puedo configurar alertas de disponibilidad de medicamentos?",
                answer: "Desde tu perfil puedes activar notificaciones para recibir alertas cuando un medicamento esté disponible.",
            },
        ];

    return (
        <MainLayout className="bg-white">
            <section className="w-full px-4 py-8 lg:py-10">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-10 items-center">
                    <div className="space-y-5">
                        <div className="flex justify-end">
                            {showGuide ? (
                                <button
                                    type="button"
                                    onClick={handleHideGuide}
                                    className="inline-flex items-center rounded-full border border-[#BFEAF2] bg-[#EBFAFD] px-3 py-1 text-[#34A4B3] text-[12px] font-medium hover:bg-[#E1F6FB] transition-colors"
                                >
                                    {t("help.guide.hide")}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleShowGuide}
                                    className="inline-flex items-center rounded-full border border-[#BFEAF2] bg-[#EBFAFD] px-3 py-1 text-[#34A4B3] text-[12px] font-medium hover:bg-[#E1F6FB] transition-colors"
                                >
                                    {t("help.guide.show")}
                                </button>
                            )}
                        </div>

                        {isOnboardingActive && currentOnboarding && (
                            <div className="rounded-[12px] border border-[#BFEAF2] bg-[#EBFAFD] p-3 shadow-[0_6px_16px_rgba(52,164,179,0.12)]">
                                <p className="text-[#34A4B3] text-[11px] font-semibold uppercase tracking-wide">
                                    {t("help.onboarding.badge")} {onboardingStep + 1}/{onboardingSteps.length}
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
                                        {t("help.onboarding.skip")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextOnboardingStep}
                                        className="text-[#34A4B3] text-[11px] font-semibold hover:underline"
                                    >
                                        {onboardingStep === onboardingSteps.length - 1
                                            ? t("help.onboarding.finish")
                                            : t("help.onboarding.next")}
                                    </button>
                                </div>
                            </div>
                        )}

                        {showGuide && (
                            <div className="rounded-[12px] border border-[#CFEFF4] bg-[#F1FBFD] p-3">
                                <p className="text-[#2D3748] text-[13px] font-semibold">
                                    {t("help.guide.title")}
                                </p>
                                <p className="text-[#64748B] text-[11px] mt-0.5">
                                    {t("help.guide.subtitle")}
                                </p>
                                <div className="mt-2.5 space-y-1.5">
                                    <p className="text-[#2D3748] text-[12px] font-medium">1. {t("help.guide.step1")}</p>
                                    <p className="text-[#2D3748] text-[12px] font-medium">2. {t("help.guide.step2")}</p>
                                </div>
                            </div>
                        )}

                        <h1 className="text-[#2D3748] text-[40px] md:text-[46px] lg:text-[48px] font-semibold leading-tight">
                            <span className="text-[#34A4B3] font-['Merienda']">
                                {t("help.title.greeting")}
                            </span>{" "}
                            {t("help.title.main")}
                        </h1>
                        <p className="text-[#4A5568] text-[16px] lg:text-[17px] font-medium [font-family:'Poppins',sans-serif] max-w-[420px]">
                            {t("help.description")}
                        </p>
                        <button
                            onClick={() => setIsAssistanceOpen(true)}
                            className={`bg-[#34A4B3] text-white px-6 py-2.5 rounded-[10px] text-[13px] lg:text-[14px] font-medium [font-family:'Poppins',sans-serif] hover:bg-[#2B93A1] transition-all ${currentOnboarding?.target === "assistance" ? "ring-2 ring-[#40C9DB]/35" : ""}`}
                        >
                            {t("help.requestAssistance")}
                        </button>
                    </div>

                    <div className="w-full flex justify-center lg:justify-end">
                        <img
                            src="/banners/BannerAyuda.png"
                            alt="Banner ayuda"
                            className="w-full max-w-[380px] lg:max-w-[420px] h-auto object-contain"
                        />
                    </div>
                </div>
            </section>

            <AssistanceModal
                open={isAssistanceOpen}
                onClose={() => setIsAssistanceOpen(false)}
            />

            <section className="w-full px-4 pb-12">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-[#2D3748] text-[30px] lg:text-[32px] font-semibold mb-12">
                        {t("help.faqTitle")}
                    </h2>

                    <div className={`space-y-6 max-w-[700px] ${currentOnboarding?.target === "faq" ? "rounded-[12px] ring-2 ring-[#40C9DB]/30 p-2" : ""}`}>
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;
                            return (
                                <div
                                    key={faq.question}
                                    className="bg-white rounded-[14px] border border-[#EFEFEF] px-4 py-3 shadow-[0px_3px_10px_rgba(0,0,0,0.06)]"
                                >
                                    <button
                                        className="w-full flex items-center justify-between text-left gap-3"
                                        onClick={() =>
                                            setOpenIndex(isOpen ? null : index)
                                        }
                                    >
                                        <span className="text-[#404040] text-[14px] lg:text-[15px] font-medium [font-family:'Poppins',sans-serif]">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-4 h-4 text-[#6B7280] transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <p className="mt-3 text-[#4A5568] text-[13px] lg:text-[14px] leading-relaxed [font-family:'Poppins',sans-serif]">
                                            {faq.answer}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};
