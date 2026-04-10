import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationHeaderSection as LandingHeader } from "../../components/header";
import { FooterSection } from "../../components/footer";
import { useI18n } from "../../i18n/language-context";
import {
    HeroSection,
    PartnersSection,
    MedicationsSection,
    AssistanceSection,
} from "../../components/landing";

const LANDING_HEADER_GUIDE_STORAGE_KEY = "donamed.landingHeader.guide.dismissed";
const LANDING_HEADER_ONBOARDING_STORAGE_KEY = "donamed.landingHeader.onboarding.completed";

const LandingPage = () => {
    const { t } = useI18n();
    const [showGuide, setShowGuide] = useState<boolean>(() => {
        try {
            return localStorage.getItem(LANDING_HEADER_GUIDE_STORAGE_KEY) !== "1";
        } catch {
            return true;
        }
    });
    const [onboardingStep, setOnboardingStep] = useState<number>(() => {
        try {
            return localStorage.getItem(LANDING_HEADER_ONBOARDING_STORAGE_KEY) === "1" ? -1 : 0;
        } catch {
            return 0;
        }
    });

    const onboardingSteps = [
        { target: "consultas", title: t("landing.headerGuide.onboarding.step1Title"), description: t("landing.headerGuide.onboarding.step1Desc") },
        { target: "solicitudes", title: t("landing.headerGuide.onboarding.step2Title"), description: t("landing.headerGuide.onboarding.step2Desc") },
        { target: "ayuda", title: t("landing.headerGuide.onboarding.step3Title"), description: t("landing.headerGuide.onboarding.step3Desc") },
        { target: "perfil", title: t("landing.headerGuide.onboarding.step4Title"), description: t("landing.headerGuide.onboarding.step4Desc") },
    ] as const;

    const isOnboardingActive = onboardingStep >= 0;
    const currentOnboarding = isOnboardingActive ? onboardingSteps[onboardingStep] : null;

    const navCards = [
        {
            id: "consultas",
            title: t("nav.consultas"),
            description: t("landing.headerGuide.cards.consultas"),
            to: "/consultas",
        },
        {
            id: "solicitudes",
            title: t("nav.solicitudes"),
            description: t("landing.headerGuide.cards.solicitudes"),
            to: "/solicitudes",
        },
        {
            id: "ayuda",
            title: t("nav.ayuda"),
            description: t("landing.headerGuide.cards.ayuda"),
            to: "/preguntas-frecuentes",
        },
        {
            id: "perfil",
            title: t("nav.miPerfil"),
            description: t("landing.headerGuide.cards.perfil"),
            to: "/dashboard",
        },
    ] as const;

    const handleHideGuide = () => {
        setShowGuide(false);
        localStorage.setItem(LANDING_HEADER_GUIDE_STORAGE_KEY, "1");
    };

    const handleShowGuide = () => {
        setShowGuide(true);
        localStorage.removeItem(LANDING_HEADER_GUIDE_STORAGE_KEY);
    };

    const finishOnboarding = () => {
        setOnboardingStep(-1);
        localStorage.setItem(LANDING_HEADER_ONBOARDING_STORAGE_KEY, "1");
    };

    const nextOnboardingStep = () => {
        if (onboardingStep >= onboardingSteps.length - 1) {
            finishOnboarding();
            return;
        }
        setOnboardingStep((prev) => prev + 1);
    };

    return (
        <div className="min-h-screen bg-white font-['Poppins'] flex flex-col">
            {/* Header with Auth Buttons */}
            <LandingHeader />

            <section className="w-full px-4 md:px-6 py-2 md:py-3">
                <div className="max-w-[1200px] mx-auto space-y-2">
                    <div className="flex justify-end">
                        {showGuide ? (
                            <button
                                type="button"
                                onClick={handleHideGuide}
                                className="inline-flex items-center rounded-full border border-[#BFEAF2] bg-[#EBFAFD] px-3 py-1 text-[#34A4B3] text-[12px] font-medium hover:bg-[#E1F6FB] transition-colors"
                            >
                                {t("landing.headerGuide.hide")}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleShowGuide}
                                className="inline-flex items-center rounded-full border border-[#BFEAF2] bg-[#EBFAFD] px-3 py-1 text-[#34A4B3] text-[12px] font-medium hover:bg-[#E1F6FB] transition-colors"
                            >
                                {t("landing.headerGuide.show")}
                            </button>
                        )}
                    </div>

                    {isOnboardingActive && currentOnboarding && (
                        <div className="rounded-[12px] border border-[#BFEAF2] bg-[#EBFAFD] p-3 shadow-[0_6px_16px_rgba(52,164,179,0.12)]">
                            <p className="text-[#34A4B3] text-[11px] font-semibold uppercase tracking-wide">
                                {t("landing.headerGuide.onboarding.badge")} {onboardingStep + 1}/{onboardingSteps.length}
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
                                    {t("landing.headerGuide.onboarding.skip")}
                                </button>
                                <button
                                    type="button"
                                    onClick={nextOnboardingStep}
                                    className="text-[#34A4B3] text-[11px] font-semibold hover:underline"
                                >
                                    {onboardingStep === onboardingSteps.length - 1
                                        ? t("landing.headerGuide.onboarding.finish")
                                        : t("landing.headerGuide.onboarding.next")}
                                </button>
                            </div>
                        </div>
                    )}

                    {showGuide && (
                        <div className="rounded-[14px] border border-[#CFEFF4] bg-[#F1FBFD] p-4">
                            <p className="text-[#2D3748] text-[14px] font-semibold">
                                {t("landing.headerGuide.title")}
                            </p>
                            <p className="text-[#64748B] text-[12px] mt-1 mb-3">
                                {t("landing.headerGuide.subtitle")}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                {navCards.map((card) => (
                                    <Link
                                        key={card.id}
                                        to={card.to}
                                        className={`rounded-[12px] border p-3 bg-white transition-all hover:border-[#40C9DB] hover:shadow-sm ${currentOnboarding?.target === card.id ? "border-[#9EDDEA] ring-2 ring-[#40C9DB]/30" : "border-[#E5EDF3]"
                                            }`}
                                    >
                                        <p className="text-[#2D3748] text-[13px] font-semibold">{card.title}</p>
                                        <p className="text-[#64748B] text-[11px] mt-1 leading-snug">{card.description}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Hero Section */}
            <HeroSection />

            {/* Partners Section */}
            <PartnersSection />

            {/* Medications Section */}
            <MedicationsSection />

            {/* Assistance Section */}
            <AssistanceSection />

            {/* Footer */}
            <FooterSection />
        </div>
    );
};

export default LandingPage;
