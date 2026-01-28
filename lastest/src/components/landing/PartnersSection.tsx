export const PartnersSection = () => {
    const partners = [
        { name: "Pfizer", logo: "/logos/pfizer_logo.png" },
        { name: "Novartis", logo: "/logos/novartis_logo.png" },
        { name: "Roche", logo: "/logos/roche_logo.png" },
    ];

    return (
        <section className="w-full py-12 px-4">
            <div className="max-w-[1290px] mx-auto">
                {/* Title */}
                <h2 className="text-center text-[32px] lg:text-[48px] font-medium mb-3 [font-family:'Poppins',sans-serif]">
                    <span className="text-[#404040]">Aliados </span>
                    <span className="text-[#40C9DB]">Comprometidos</span>
                </h2>

                {/* Subtitle */}
                <p className="text-center text-[#2D3748] text-[14px] lg:text-[16px] max-w-[800px] mx-auto mb-10 [font-family:'Poppins',sans-serif]">
                    "Con el apoyo de nuestras farmacéuticas aliadas, cada donación llega a quienes más lo necesitan."
                </p>

                {/* Partner Cards Container */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
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
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-[70px] h-[70px] object-contain z-0"
            />

            {/* White Card */}
            <div className="relative bg-white rounded-[8px] shadow-[0px_3.43px_20.59px_rgba(0,0,0,0.2)] backdrop-blur-[17px] px-10 py-7 min-w-[280px] min-h-[130px] flex items-center justify-center z-10">
                <img
                    src={logo}
                    alt={name}
                    className="max-w-[160px] h-auto object-contain"
                />
            </div>

            {/* Left small circle */}
            <img
                src="/assets/eclipse_menor.png"
                alt=""
                className="absolute -left-4 bottom-3 w-[40px] h-[40px] object-contain shadow-[-1.74px_1.74px_10.42px_rgba(0,0,0,0.18)]"
            />

            {/* Right small circle */}
            <img
                src="/assets/eclipse_menor.png"
                alt=""
                className="absolute -right-4 bottom-3 w-[40px] h-[40px] object-contain shadow-[-1.74px_1.74px_10.42px_rgba(0,0,0,0.18)]"
            />
        </div>
    );
};
