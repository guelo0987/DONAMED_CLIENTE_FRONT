import { useState } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { SolicitudForm } from "./SolicitudForm";
import { useI18n } from "../../i18n/language-context";

const SOLICITUDES_GUIDE_STORAGE_KEY = "donamed.solicitudes.guide.dismissed";
const SOLICITUDES_ONBOARDING_STORAGE_KEY = "donamed.solicitudes.onboarding.completed";

export const HeroBannerSection = () => {
    const { t } = useI18n();
    return (
        <section className="relative w-full py-2 md:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 h-full">
                {/* Text Content */}
                <div className="w-full md:w-[60%] z-10 text-center md:text-left">
                    <h1 className="[font-family:'Poppins',sans-serif] font-medium text-[#2D3748] text-[26px] sm:text-[30px] md:text-[34px] leading-[1.2] md:leading-[1.18]">
                        <span>{t("solicitudes.hero.prefix")}</span>
                        <span className="[font-family:'Merienda',cursive] font-bold text-[#40C9DB] text-[30px] sm:text-[36px] md:text-[40px] block sm:inline">
                            {t("solicitudes.hero.highlight")}
                        </span>
                        <span>{t("solicitudes.hero.suffix")}</span>
                    </h1>
                </div>

                {/* Image Content */}
                <div className="w-full md:w-[36%] flex justify-center md:justify-end mt-1 md:mt-0">
                    <img
                        className="w-[62%] md:w-full h-auto object-contain max-w-[220px] md:max-w-[300px]"
                        alt={t("solicitudes.hero.imageAlt")}
                        src="/banners/solicitud_banner_image.png"
                    />
                </div>
            </div>
        </section>
    );
};

export const Solicitudes = () => {
    const { t } = useI18n();
    const [showGuide, setShowGuide] = useState<boolean>(() => {
        try {
            return localStorage.getItem(SOLICITUDES_GUIDE_STORAGE_KEY) !== "1";
        } catch {
            return true;
        }
    });
    const [onboardingStep, setOnboardingStep] = useState<number>(() => {
        try {
            return localStorage.getItem(SOLICITUDES_ONBOARDING_STORAGE_KEY) === "1" ? -1 : 0;
        } catch {
            return 0;
        }
    });

    const onboardingSteps = [
        {
            title: t("solicitudes.onboarding.step1Title"),
            description: t("solicitudes.onboarding.step1Desc"),
        },
        {
            title: t("solicitudes.onboarding.step2Title"),
            description: t("solicitudes.onboarding.step2Desc"),
        },
        {
            title: t("solicitudes.onboarding.step3Title"),
            description: t("solicitudes.onboarding.step3Desc"),
        },
    ] as const;

    const isOnboardingActive = onboardingStep >= 0;
    const currentOnboarding = isOnboardingActive ? onboardingSteps[onboardingStep] : null;

    const handleHideGuide = () => {
        setShowGuide(false);
        localStorage.setItem(SOLICITUDES_GUIDE_STORAGE_KEY, "1");
    };

    const handleShowGuide = () => {
        setShowGuide(true);
        localStorage.removeItem(SOLICITUDES_GUIDE_STORAGE_KEY);
    };

    const finishOnboarding = () => {
        setOnboardingStep(-1);
        localStorage.setItem(SOLICITUDES_ONBOARDING_STORAGE_KEY, "1");
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
            <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-5 md:px-6 lg:px-7">
                <HeroBannerSection />
                <div className="mb-4 space-y-2">
                    <div className="flex justify-end">
                        {showGuide ? (
                            <button
                                type="button"
                                onClick={handleHideGuide}
                                className="inline-flex items-center rounded-full border border-[#BFEAF2] bg-[#EBFAFD] px-3 py-1 text-[#34A4B3] text-[12px] font-medium hover:bg-[#E1F6FB] transition-colors"
                            >
                                {t("solicitudes.guide.hide")}
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleShowGuide}
                                className="inline-flex items-center rounded-full border border-[#BFEAF2] bg-[#EBFAFD] px-3 py-1 text-[#34A4B3] text-[12px] font-medium hover:bg-[#E1F6FB] transition-colors"
                            >
                                {t("solicitudes.guide.show")}
                            </button>
                        )}
                    </div>

                    {isOnboardingActive && currentOnboarding && (
                        <div className="rounded-[12px] border border-[#BFEAF2] bg-[#EBFAFD] p-3 shadow-[0_6px_16px_rgba(52,164,179,0.12)]">
                            <p className="text-[#34A4B3] text-[11px] font-semibold uppercase tracking-wide">
                                {t("solicitudes.onboarding.badge")} {onboardingStep + 1}/{onboardingSteps.length}
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
                                    {t("solicitudes.onboarding.skip")}
                                </button>
                                <button
                                    type="button"
                                    onClick={nextOnboardingStep}
                                    className="text-[#34A4B3] text-[11px] font-semibold hover:underline"
                                >
                                    {onboardingStep === onboardingSteps.length - 1
                                        ? t("solicitudes.onboarding.finish")
                                        : t("solicitudes.onboarding.next")}
                                </button>
                            </div>
                        </div>
                    )}

                    {showGuide && (
                        <div className="rounded-[12px] border border-[#CFEFF4] bg-[#F1FBFD] p-3">
                            <p className="text-[#2D3748] text-[13px] font-semibold">
                                {t("solicitudes.guide.title")}
                            </p>
                            <p className="text-[#64748B] text-[11px] mt-0.5">
                                {t("solicitudes.guide.subtitle")}
                            </p>
                            <div className="mt-2.5 space-y-1.5">
                                <p className="text-[#2D3748] text-[12px] font-medium">1. {t("solicitudes.guide.step1")}</p>
                                <p className="text-[#2D3748] text-[12px] font-medium">2. {t("solicitudes.guide.step2")}</p>
                                <p className="text-[#2D3748] text-[12px] font-medium">3. {t("solicitudes.guide.step3")}</p>
                            </div>
                        </div>
                    )}
                </div>

                <SolicitudForm
                    mode="create"
                    className={`max-w-none px-0 md:px-0 lg:px-0 rounded-[14px] transition-all ${isOnboardingActive ? "" : ""}`}
                />
            </div>
        </MainLayout>
    );
};
