import { useI18n } from "../../i18n/language-context";

export const AssistanceSection = () => {
    const { t } = useI18n();
    return (
        <section className="w-full py-10 px-4 sm:px-5 md:px-6 lg:px-7">
            <div className="max-w-[1060px] mx-auto relative">
                {/* Main Card Container */}
                <div className="relative bg-white rounded-[12px] shadow-[0px_3.43px_34.5px_rgba(0,0,0,0.33)] overflow-hidden">
                    {/* Background Image */}
                    <img
                        src="/banners/asistencia_landing_background.png"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-[320px]">
                        {/* Left - Doctor Image */}
                        <div className="w-full lg:w-[45%] relative flex items-end justify-center lg:justify-start">
                            <img
                                src="/banners/chica_asistencia_landing.png"
                                alt="Doctora"
                                className="w-auto max-w-[300px] h-auto max-h-[330px] object-contain"
                            />
                        </div>

                        {/* Right - Content */}
                        <div className="w-full lg:w-[55%] p-6 lg:p-8 text-center lg:text-left">
                            {/* Title */}
                            <h2 className="text-[24px] lg:text-[36px] font-medium mb-2.5 [font-family:'Poppins',sans-serif]">
                                <span className="text-[#404040]">{t("landing.assistance.title1")}</span>
                                <span className="text-[#40C9DB]">{t("landing.assistance.title2")}</span>
                            </h2>

                            {/* Subtitle */}
                            <p className="text-[#2D3748] text-[14px] lg:text-[16px] font-medium mb-5 [font-family:'Poppins',sans-serif]">
                                {t("landing.assistance.subtitle")}
                            </p>

                            {/* Phone Button */}
                            <a
                                href="tel:+18298291829"
                                className="inline-block bg-[#34A4B3] text-white px-6 lg:px-7 py-2.5 rounded-[4px] [font-family:'Poppins',sans-serif] font-normal text-[16px] lg:text-[19px] hover:bg-[#2D8A96] transition-colors shadow-[0px_4px_33px_rgba(255,255,255,0.16)]"
                            >
                                +1 829-829-1829
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
