import { useState } from "react";

interface MedicationCardProps {
    name: string;
    image: string;
    isAvailable: boolean;
    isCenter?: boolean;
}

export const MedicationCard = ({ name, image, isAvailable, isCenter = false }: MedicationCardProps) => {
    return (
        <div
            className={`
                bg-white rounded-[13px] shadow-[0px_3.5px_21px_-0.8px_rgba(0,0,0,0.2)] backdrop-blur-[17px] 
                relative flex flex-col items-center pb-8 transition-all duration-300
                ${isCenter
                    ? "w-[320px] lg:w-[360px] min-h-[440px] z-10"
                    : "w-[290px] lg:w-[320px] min-h-[400px] scale-95 lg:scale-100 opacity-90 lg:opacity-100 hover:opacity-100"
                }
            `}
        >
            {/* Availability Badge */}
            <div className={`absolute top-5 left-5 z-20 ${isCenter ? "scale-110 origin-top-left" : ""}`}>
                <div className="inline-flex items-center gap-2 bg-[#DEDEDE] rounded-full px-3 py-1.5">
                    <div className={`w-2 h-2 rounded-full ${isAvailable ? "bg-[#40C9DB]" : "bg-red-400"}`}></div>
                    <span className="text-[#2D3748] text-[12px] font-medium [font-family:'Poppins',sans-serif]">
                        {isAvailable ? "Disponible" : "No Disponible"}
                    </span>
                </div>
            </div>

            {/* Image Container & Shelf */}
            <div className={`relative w-full flex flex-col items-center mb-2 ${isCenter ? "mt-14" : "mt-10"}`}>
                {/* Medicine Image */}
                <div className="relative z-10 w-full flex justify-center px-8">
                    <img
                        src={image}
                        alt={name}
                        className={`
                            object-contain drop-shadow-lg transition-all duration-300
                            ${isCenter ? "h-[220px]" : "h-[180px]"}
                        `}
                    />
                </div>

                {/* Shelf Image (Rectangle) */}
                <div className="relative z-0 -mt-8 w-full flex justify-center">
                    <img
                        src="/assets/rectangle_landing.png"
                        alt=""
                        className={`
                            object-contain opacity-90
                            ${isCenter ? "w-[80%]" : "w-[75%]"}
                        `}
                    />
                </div>
            </div>

            {/* Name */}
            <div className="px-4 mt-2 mb-6">
                <p className={`
                    text-center text-[#404040] font-medium leading-[30px] [font-family:'Poppins',sans-serif]
                    ${isCenter ? "text-[22px] lg:text-[24px]" : "text-[18px] lg:text-[20px]"}
                `}>
                    {name}
                </p>
            </div>

            {/* Details Button */}
            <div className="mt-auto px-4 w-full flex justify-center">
                <button className={`
                    border-2 border-[#34A4B3] text-[#34A4B3] border-solid rounded-[20px] [font-family:'Poppins',sans-serif] font-medium hover:bg-[#34A4B3] hover:text-white transition-colors
                    ${isCenter ? "w-[75%] py-3 text-[18px]" : "w-[70%] py-2.5 text-[16px]"}
                `}>
                    Ver detalles
                </button>
            </div>
        </div>
    );
};

export const MedicationsSection = () => {
    const [activeSlide, setActiveSlide] = useState(1); // Default to center slide active

    const medications = [
        {
            name: "FloxidCare 500mg",
            image: "/medicines/floxid_cure.png",
            isAvailable: true,
        },
        {
            name: "Tecentriq 1200mg",
            image: "/medicines/tecentriq.png",
            isAvailable: true,
        },
        {
            name: "Herceptin 150 mg",
            image: "/medicines/herceptin.png",
            isAvailable: true,
        },
    ];

    return (
        <section className="w-full py-16 px-4 bg-white overflow-hidden">
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
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 mb-12 lg:h-[500px] items-end pb-4">
                    {medications.map((med, index) => (
                        <MedicationCard
                            key={index}
                            {...med}
                            isCenter={index === 1}
                        />
                    ))}
                </div>

                {/* Pagination Dots */}
                <div className="flex items-center justify-center gap-2">
                    {[0, 1, 2, 3].map((dot) => (
                        <button
                            key={dot}
                            onClick={() => setActiveSlide(dot)}
                            className={`w-3 h-3 rounded-full transition-colors ${activeSlide === dot ? "bg-[#40C9DB]" : "bg-[#D9D9D9]"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
