import { ChevronRight } from "lucide-react";
import { MainLayout } from "../../components/layout/MainLayout";
import { useNavigate } from "react-router-dom";

const RequestCard = ({
    date,
    medication,
    statusLabel
}: {
    date: string,
    medication: string,
    statusLabel: string
}) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/detalle-solicitud")}
            className="w-full bg-white rounded-[15px] shadow-sm border border-gray-100 p-4 mb-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >

            {/* Icon & Main Info Wrapper for Mobile alignment */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Icon */}
                <div className="flex-shrink-0">
                    <div className="w-[65px] h-[58px] bg-[#34A4B3]/20 rounded-[15px] flex items-center justify-center">
                        <img
                            src="/medicines/historial.png" // Ensure this asset exists or use a fallback
                            alt="med-icon"
                            className="w-[30px] h-auto opacity-100 mix-blend-normal"
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
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 w-full text-left sm:text-center">
                {/* Fecha */}
                <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start">
                    <span className="font-['Poppins'] font-medium text-[#2D3748] text-[14px] sm:text-[16px] sm:hidden">Fecha:</span>
                    <div className="flex flex-col items-end sm:items-start text-right sm:text-left">
                        <span className="font-['Poppins'] font-medium text-[#2D3748] text-[16px] hidden sm:block">Fecha</span>
                        <span className="font-['Poppins'] font-normal text-[#2D3748] text-[14px] sm:text-[16px]">{date}</span>
                    </div>
                </div>

                {/* Medicamento */}
                <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start">
                    <span className="font-['Inter'] font-medium text-[#232323] text-[14px] sm:text-[16px] sm:hidden">Medicamento:</span>
                    <div className="flex flex-col items-end sm:items-start text-right sm:text-left">
                        <span className="font-['Inter'] font-medium text-[#232323] text-[16px] hidden sm:block">Medicamento</span>
                        <span className="font-['Poppins'] font-normal text-[#2D3748] text-[14px] sm:text-[16px]">{medication}</span>
                    </div>
                </div>

                {/* Estado */}
                <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-start">
                    <span className="font-['Inter'] font-medium text-[#232323] text-[14px] sm:text-[16px] sm:hidden">Estado:</span>
                    <div className="flex flex-col items-end sm:items-start text-right sm:text-left">
                        <span className="font-['Inter'] font-medium text-[#232323] text-[16px] hidden sm:block">Estado</span>
                        <span className="font-['Poppins'] font-normal text-[#2D3748] text-[14px] sm:text-[16px]">{statusLabel}</span>
                    </div>
                </div>
            </div>

            {/* Arrow */}
            <div className="hidden sm:block pr-4">
                <ChevronRight className="w-6 h-6 text-[#5F6368]" />
            </div>
        </div>
    );
};

export const HistorialSolicitudes = () => {
    const recentRequests = [
        { date: "23/08/2024", medication: "Medicamento A", status: "process", statusLabel: "En proceso" },
        { date: "23/08/2024", medication: "Medicamento A", status: "process", statusLabel: "En proceso" },
        { date: "23/08/2024", medication: "Medicamento A", status: "process", statusLabel: "En proceso" },
    ];

    const previousRequests = [
        { date: "23/08/2024", medication: "Medicamento A", status: "processed", statusLabel: "Procesada" },
        { date: "23/08/2024", medication: "Medicamento A", status: "processed", statusLabel: "Procesada" },
    ];

    return (
        <MainLayout>
            <div className="w-full pb-20">
                {/* Banner Section */}
                <div className="relative w-full max-w-[1728px] mx-auto pt-4 sm:pt-8 px-4 md:px-12 lg:px-24 mb-12 sm:mb-16">
                    <div className="relative w-full h-[180px] sm:h-[240px] rounded-[15px] overflow-hidden bg-[#40C9DB] shadow-md">
                        {/* Background Pattern/Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#40C9DB] to-[#4FD1C5] opacity-90" />
                        <img
                            src="/banners/historial_banner.png"
                            className="absolute inset-0 w-full h-full object-cover opacity-100 mix-blend-overlay"
                            alt="pattern"
                            onError={(e) => e.currentTarget.style.display = 'none'}
                        />

                        {/* Glassmorphism Card Title */}
                        <div className="absolute bottom-0 left-0 sm:left-[5%] w-full sm:w-[50%] md:w-[45%] h-[60px] sm:h-[60%]
                                    bg-white/90 sm:bg-white/80 backdrop-blur-md sm:rounded-t-[15px] border-t border-white/50
                                    flex items-center justify-center sm:justify-start px-6 sm:px-8 shadow-sm">
                            <h1 className="font-['Poppins'] font-normal text-[#2D3748] text-[20px] sm:text-[28px] md:text-[36px]">
                                Historial de Solicitudes
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="max-w-[1332px] mx-auto px-4">

                    {/* Recientes Section */}
                    <section className="mb-12">
                        <h2 className="font-['Poppins'] font-normal text-[#2D3748] text-[24px] sm:text-[30px] mb-6 border-b border-[#DCD7D7] pb-2">
                            Recientes
                        </h2>
                        <div className="space-y-4">
                            {recentRequests.map((req, idx) => (
                                // @ts-ignore
                                <RequestCard key={idx} {...req} />
                            ))}
                        </div>
                    </section>

                    {/* Anteriores Section */}
                    <section>
                        <h2 className="font-['Poppins'] font-normal text-[#2D3748] text-[24px] sm:text-[30px] mb-6 border-b border-[#DCD7D7] pb-2">
                            Anteriores
                        </h2>
                        <div className="space-y-4">
                            {previousRequests.map((req, idx) => (
                                // @ts-ignore
                                <RequestCard key={idx} {...req} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </MainLayout>
    );
};
