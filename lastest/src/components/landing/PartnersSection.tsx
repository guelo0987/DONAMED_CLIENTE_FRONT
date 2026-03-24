import { useI18n } from "../../i18n/language-context";

export const PartnersSection = () => {
    const { t } = useI18n();
    const partners = [
        { name: "Pfizer", logo: "/logos/pfizer_logo.png" },
        { name: "Novartis", logo: "/logos/novartis_logo.png" },
        { name: "Roche", logo: "/logos/roche_logo.png" },
    ];

    return (
        <section className="w-full py-10 lg:py-12 px-4 sm:px-5 md:px-6 lg:px-7">
            <div className="max-w-[1060px] mx-auto">
                {/* Title */}
                <h2 className="text-center text-[28px] lg:text-[40px] font-medium mb-3 [font-family:'Poppins',sans-serif]">
                    <span className="text-[#404040]">{t("landing.partners.title1")}</span>
                    <span className="text-[#40C9DB]">{t("landing.partners.title2")}</span>
                </h2>

                {/* Subtitle */}
                <p className="text-center text-[#2D3748] text-[13px] lg:text-[15px] max-w-[720px] mx-auto mb-8 [font-family:'Poppins',sans-serif]">
                    {t("landing.partners.subtitle")}
                </p>

                {/* Partner Cards Container */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 relative">
                    {partners.map((partner, index) => (
                        <PartnerCard key={index} {...partner} />
                    ))}
                </div>
            </div>
        </section>
    );
};

interface PartnerCardProps {
    name: string;
    logo: string;
}

const PartnerCard = ({ name, logo }: PartnerCardProps) => {
    return (
        <div className="relative">
            {/* Teal circle decoration - above card */}
            <img
                src="/assets/eclipse_mediano.png"
                alt=""
                className="absolute -top-5 left-1/2 -translate-x-1/2 w-[62px] h-[62px] object-contain z-0"
            />

            {/* White Card */}
            <div className="relative bg-white rounded-[8px] shadow-[0px_3.43px_20.59px_rgba(0,0,0,0.2)] backdrop-blur-[17px] px-8 py-6 min-w-[240px] min-h-[116px] flex items-center justify-center z-10">
                <img
                    src={logo}
                    alt={name}
                    className="max-w-[140px] h-auto object-contain"
                />
            </div>

            {/* Left small circle */}
            <img
                src="/assets/eclipse_menor.png"
                alt=""
                className="absolute -left-3 bottom-3 w-[34px] h-[34px] object-contain shadow-[-1.74px_1.74px_10.42px_rgba(0,0,0,0.18)]"
            />

            {/* Right small circle */}
            <img
                src="/assets/eclipse_menor.png"
                alt=""
                className="absolute -right-3 bottom-3 w-[34px] h-[34px] object-contain shadow-[-1.74px_1.74px_10.42px_rgba(0,0,0,0.18)]"
            />
        </div>
    );
};
