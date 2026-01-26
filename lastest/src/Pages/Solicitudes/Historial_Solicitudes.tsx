import { ChevronRight } from "lucide-react";
import { NavigationHeaderSection } from "../../components/header";
import { FooterSection } from "../../components/footer";

const RequestCard = ({
    date,
    medication,
    statusLabel
}: {
    date: string,
    medication: string,
    statusLabel: string
}) => {
    return (
        <div className="w-full bg-white rounded-[15px] shadow-sm border border-gray-100 p-4 mb-4 hover:shadow-md transition-shadow cursor-pointer flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Icon */}
            <div className="flex-shrink-0">
                <div className="w-[65px] h-[58px] bg-[#34A4B3]/20 rounded-[15px] flex items-center justify-center">
                    {/* Using a placeholder image for the medicine bottle based on screenshot */}
                    <img src="/medicines/historial.png" alt="med-icon" className="w-[30px] h-auto opacity-100 mix-blend-normal"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            // Fallback to text or icon if image fails
                        }}
                    />
                    {/* Fallback visual if no image */}
                    <div className="text-[#34A4B3] font-bold text-xl block" style={{ display: 'none' }}>Rx</div>
                </div>
            </div>

            {/* Info Grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full md:w-auto text-center md:text-left">
                {/* Fecha */}
                <div className="flex flex-col">
                    <span className="font-['Poppins'] font-medium text-[#2D3748] text-[16px]">Fecha</span>
                    <span className="font-['Poppins'] font-normal text-[#2D3748] text-[16px]">{date}</span>
                </div>

                {/* Medicamento */}
                <div className="flex flex-col">
                    <span className="font-['Inter'] font-medium text-[#232323] text-[16px]">Medicamento</span>
                    <span className="font-['Poppins'] font-normal text-[#2D3748] text-[16px]">{medication}</span>
                </div>

                {/* Estado */}
                <div className="flex flex-col">
                    <span className="font-['Inter'] font-medium text-[#232323] text-[16px]">Estado</span>
                    <span className="font-['Poppins'] font-normal text-[#2D3748] text-[16px]">{statusLabel}</span>
                </div>
            </div>

            {/* Arrow */}
            <div className="hidden md:block pr-4">
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
        <div className="min-h-screen bg-white w-full">
            <NavigationHeaderSection />

            <main className="w-full pb-20">
                {/* Banner Section */}
                <div className="relative w-full max-w-[1728px] mx-auto pt-8 px-4 md:px-12 lg:px-24 mb-16">
                    <div className="relative w-full h-[240px] rounded-[15px] overflow-hidden bg-[#40C9DB]">
                        {/* Background Pattern/Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#40C9DB] to-[#4FD1C5] opacity-90" />
                        <img
                            src="/banners/historial_banner.png"
                            className="absolute inset-0 w-full h-full object-cover opacity-100"
                            alt="pattern"
                            onError={(e) => e.currentTarget.style.display = 'none'}
                        />

                        {/* Glassmorphism Card Title */}
                        <div className="absolute bottom-0 left-[5%] w-[90%] md:w-[45%] h-[60%] 
                                    bg-white/80 backdrop-blur-md rounded-t-[15px] border-t border-x border-white/50
                                    flex items-center px-8 shadow-lg">
                            <h1 className="font-['Poppins'] font-normal text-[#2D3748] text-[28px] md:text-[36px]">
                                Historial de Solicitudes
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Content Container */}
                <div className="max-w-[1332px] mx-auto px-4">

                    {/* Recientes Section */}
                    <section className="mb-12">
                        <h2 className="font-['Poppins'] font-normal text-[#2D3748] text-[30px] mb-6 border-b border-[#DCD7D7] pb-2">
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
                        <h2 className="font-['Poppins'] font-normal text-[#2D3748] text-[30px] mb-6 border-b border-[#DCD7D7] pb-2">
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
            </main>

            <FooterSection />
        </div>
    );
};
