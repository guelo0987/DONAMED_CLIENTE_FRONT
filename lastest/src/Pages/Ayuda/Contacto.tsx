import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { MainLayout } from "../../components/layout/MainLayout";
import { useI18n } from "../../i18n/language-context";

const CONTACTO_GUIDE_STORAGE_KEY = "donamed.contacto.guide.dismissed";
const CONTACTO_ONBOARDING_STORAGE_KEY = "donamed.contacto.onboarding.completed";

export const Contacto = () => {
    const { t } = useI18n();
    const [showGuide, setShowGuide] = useState<boolean>(() => {
        try {
            return localStorage.getItem(CONTACTO_GUIDE_STORAGE_KEY) !== "1";
        } catch {
            return true;
        }
    });
    const [onboardingStep, setOnboardingStep] = useState<number>(() => {
        try {
            return localStorage.getItem(CONTACTO_ONBOARDING_STORAGE_KEY) === "1" ? -1 : 0;
        } catch {
            return 0;
        }
    });
    const onboardingSteps = [
        {
            target: "info",
            title: t("contact.onboarding.step1Title"),
            description: t("contact.onboarding.step1Desc"),
        },
        {
            target: "form",
            title: t("contact.onboarding.step2Title"),
            description: t("contact.onboarding.step2Desc"),
        },
    ] as const;
    const isOnboardingActive = onboardingStep >= 0;
    const currentOnboarding = isOnboardingActive ? onboardingSteps[onboardingStep] : null;

    const handleHideGuide = () => {
        setShowGuide(false);
        localStorage.setItem(CONTACTO_GUIDE_STORAGE_KEY, "1");
    };

    const handleShowGuide = () => {
        setShowGuide(true);
        localStorage.removeItem(CONTACTO_GUIDE_STORAGE_KEY);
    };

    const finishOnboarding = () => {
        setOnboardingStep(-1);
        localStorage.setItem(CONTACTO_ONBOARDING_STORAGE_KEY, "1");
    };

    const nextOnboardingStep = () => {
        if (onboardingStep >= onboardingSteps.length - 1) {
            finishOnboarding();
            return;
        }
        setOnboardingStep((prev) => prev + 1);
    };

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
                                    {t("contact.guide.hide")}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleShowGuide}
                                    className="inline-flex items-center rounded-full border border-[#BFEAF2] bg-[#EBFAFD] px-3 py-1 text-[#34A4B3] text-[12px] font-medium hover:bg-[#E1F6FB] transition-colors"
                                >
                                    {t("contact.guide.show")}
                                </button>
                            )}
                        </div>

                        {isOnboardingActive && currentOnboarding && (
                            <div className="rounded-[12px] border border-[#BFEAF2] bg-[#EBFAFD] p-3 shadow-[0_6px_16px_rgba(52,164,179,0.12)]">
                                <p className="text-[#34A4B3] text-[11px] font-semibold uppercase tracking-wide">
                                    {t("contact.onboarding.badge")} {onboardingStep + 1}/{onboardingSteps.length}
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
                                        {t("contact.onboarding.skip")}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextOnboardingStep}
                                        className="text-[#34A4B3] text-[11px] font-semibold hover:underline"
                                    >
                                        {onboardingStep === onboardingSteps.length - 1
                                            ? t("contact.onboarding.finish")
                                            : t("contact.onboarding.next")}
                                    </button>
                                </div>
                            </div>
                        )}

                        {showGuide && (
                            <div className="rounded-[12px] border border-[#CFEFF4] bg-[#F1FBFD] p-3">
                                <p className="text-[#2D3748] text-[13px] font-semibold">
                                    {t("contact.guide.title")}
                                </p>
                                <p className="text-[#64748B] text-[11px] mt-0.5">
                                    {t("contact.guide.subtitle")}
                                </p>
                                <div className="mt-2.5 space-y-1.5">
                                    <p className="text-[#2D3748] text-[12px] font-medium">1. {t("contact.guide.step1")}</p>
                                    <p className="text-[#2D3748] text-[12px] font-medium">2. {t("contact.guide.step2")}</p>
                                </div>
                            </div>
                        )}

                        <h1 className="text-[#2D3748] text-[38px] md:text-[44px] lg:text-[46px] font-semibold leading-tight">
                            <span className="text-[#34A4B3] font-['Merienda']">
                                {t("contact.title.main")}
                            </span>{" "}
                            {t("contact.title.suffix")}
                        </h1>
                        <p className="text-[#4A5568] text-[16px] lg:text-[17px] font-medium [font-family:'Poppins',sans-serif] max-w-[420px]">
                            {t("contact.description")}
                        </p>
                        <button className="bg-[#34A4B3] text-white px-6 py-2.5 rounded-[10px] text-[13px] lg:text-[14px] font-medium [font-family:'Poppins',sans-serif] hover:bg-[#2B93A1] transition-all">
                            {t("contact.button")}
                        </button>
                    </div>

                    <div className="w-full flex justify-center lg:justify-end">
                        <div className={`w-full max-w-[420px] bg-[#F7FBFC] rounded-[20px] p-6 shadow-[0px_6px_20px_rgba(0,0,0,0.08)] border border-[#EAF2F4] ${currentOnboarding?.target === "info" ? "ring-2 ring-[#40C9DB]/35" : ""}`}>
                            <h3 className="text-[#2D3748] text-[18px] font-semibold mb-4">
                                {t("contact.infoTitle")}
                            </h3>
                            <div className="space-y-4 text-[#4A5568] text-[14px] [font-family:'Poppins',sans-serif]">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-[#34A4B3]" />
                                    <div>
                                        <p className="font-medium">{t("contact.phone")}</p>
                                        <p>+1 829-829-1829</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-[#34A4B3]" />
                                    <div>
                                        <p className="font-medium">{t("contact.email")}</p>
                                        <p>contacto@donamed.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#34A4B3]" />
                                    <div>
                                        <p className="font-medium">{t("contact.address")}</p>
                                        <p>Santo Domingo, República Dominicana</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 pb-12">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-[#2D3748] text-[30px] lg:text-[32px] font-semibold mb-8">
                        {t("contact.sendMessage")}
                    </h2>

                    <div className={`bg-white rounded-[16px] border border-[#EFEFEF] shadow-[0px_3px_10px_rgba(0,0,0,0.06)] p-6 lg:p-8 max-w-[720px] ${currentOnboarding?.target === "form" ? "ring-2 ring-[#40C9DB]/35" : ""}`}>
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#404040] text-[13px] font-medium [font-family:'Poppins',sans-serif]">
                                    {t("contact.form.name")}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t("contact.form.namePlaceholder")}
                                    className="w-full bg-[#F3F4F6] rounded-[10px] px-4 py-3 text-[#4A5568] text-[13px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#404040] text-[13px] font-medium [font-family:'Poppins',sans-serif]">
                                    {t("contact.form.email")}
                                </label>
                                <input
                                    type="email"
                                    placeholder={t("contact.form.emailPlaceholder")}
                                    className="w-full bg-[#F3F4F6] rounded-[10px] px-4 py-3 text-[#4A5568] text-[13px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-[#404040] text-[13px] font-medium [font-family:'Poppins',sans-serif]">
                                    {t("contact.form.subject")}
                                </label>
                                <input
                                    type="text"
                                    placeholder={t("contact.form.subjectPlaceholder")}
                                    className="w-full bg-[#F3F4F6] rounded-[10px] px-4 py-3 text-[#4A5568] text-[13px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-[#404040] text-[13px] font-medium [font-family:'Poppins',sans-serif]">
                                    {t("contact.form.message")}
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder={t("contact.form.messagePlaceholder")}
                                    className="w-full bg-[#F3F4F6] rounded-[10px] px-4 py-3 text-[#4A5568] text-[13px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 resize-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <button
                                    type="button"
                                    className="bg-[#34A4B3] text-white px-7 py-3 rounded-[10px] text-[13px] lg:text-[14px] font-medium [font-family:'Poppins',sans-serif] hover:bg-[#2B93A1] transition-all"
                                >
                                    {t("contact.form.send")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};
