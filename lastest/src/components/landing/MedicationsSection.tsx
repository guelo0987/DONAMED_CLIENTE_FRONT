import { useState } from "react";

interface MedicationCardProps {
    name: string;
    image: string;
    isAvailable: boolean;
}

export const MedicationCard = ({ name, image, isAvailable }: MedicationCardProps) => {
    return (
        <div className="bg-white rounded-[13px] shadow-[0px_3.52px_21.15px_-0.88px_rgba(0,0,0,0.2)] backdrop-blur-[17.6px] overflow-hidden w-[300px] lg:w-[340px]">
            {/* Availability Badge */}
            <div className="px-4 pt-4">
                <div className="inline-flex items-center gap-2 bg-[#DEDEDE] rounded-full px-3 py-1">
                    <div className={`w-2.5 h-2.5 rounded-full ${isAvailable ? "bg-[#40C9DB]" : "bg-red-400"}`}></div>
                    <span className="text-[#2D3748] text-[12px] font-medium [font-family:'Poppins',sans-serif]">
                        {isAvailable ? "Disponible" : "No Disponible"}
                    </span>
                </div>
            </div>

            {/* Medicine Image */}
            <div className="h-[160px] flex items-center justify-center p-4">
                <img
                    src={image}
                    alt={name}
                    className="max-h-full max-w-[180px] object-contain"
                />
            </div>

            {/* Teal Banner with Name */}
            <div className="bg-[#40C9DB] py-3 rounded-[20px] mx-4">
                <p className="text-center text-[#404040] font-medium text-[18px] lg:text-[22px] [font-family:'Poppins',sans-serif]">
                    {name}
                </p>
            </div>

            {/* Details Button */}
            <div className="p-4">
                <button className="w-full border-2 border-[#34A4B3] text-[#34A4B3] py-2.5 rounded-[20px] [font-family:'Poppins',sans-serif] font-medium text-[15px] hover:bg-[#34A4B3] hover:text-white transition-colors">
                    Ver detalles
                </button>
            </div>
        </div>
    );
};

export const MedicationsSection = () => {
    const [activeSlide, setActiveSlide] = useState(0);

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
        <section className="w-full py-12 px-4 bg-white">
            <div className="max-w-[1280px] mx-auto">
                {/* Title */}
                <h2 className="text-center text-[32px] lg:text-[50px] font-bold mb-3 [font-family:'Merienda',cursive]">
                    <span className="text-[#40C9DB]">Medicamentos </span>
                    <span className="text-[#404040]">Disponibles</span>
                </h2>

                {/* Subtitle */}
                <p className="text-center text-[#2D3748] text-[13px] lg:text-[15px] max-w-[850px] mx-auto mb-10 [font-family:'Poppins',sans-serif]">
                    "Cada donación de medicamentos es una oportunidad de vida. Juntos, podemos hacer la diferencia
                    en la salud de quienes más lo necesitan."
                </p>

                {/* Medication Cards */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-8">
                    {medications.map((med, index) => (
                        <MedicationCard key={index} {...med} />
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
