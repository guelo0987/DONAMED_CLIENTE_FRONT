import { ArrowRight, Search, ChevronDown } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="relative w-full max-w-[1440px] mx-auto px-4 lg:px-20 pb-24 overflow-visible">
            <div className="flex flex-col lg:flex-row items-center justify-between min-h-[640px] relative">

                {/* Left Content */}
                <div className="flex-1 w-full max-w-[650px] z-20 pt-16 lg:pt-8 flex flex-col items-start text-left pointer-events-none">
                    <div className="pointer-events-auto">
                        {/* Title */}
                        <h1 className="text-[46px] lg:text-[72px] leading-[1.1] mb-6">
                            <span className="[font-family:'Merienda',cursive] italic text-[#40C9DB] font-bold">Transforma</span>{" "}
                            <span className="[font-family:'Poppins',sans-serif] font-bold text-[#404040]">tu ayuda</span>
                            <br />
                            <span className="[font-family:'Poppins',sans-serif] font-bold text-[#404040]">en esperanza</span>
                        </h1>

                        {/* Description */}
                        <p className="text-[#4A5568] text-[16px] lg:text-[18px] leading-[1.6] mb-10 max-w-[500px] [font-family:'Poppins',sans-serif] font-normal">
                            El acceso a medicamentos de alto costo es esencial para
                            garantizar la salud y el bienestar de todos. Cada donación de
                            medicamentos puede cambiar una vida.
                        </p>

                        {/* CTA Button */}
                        <button className="bg-[#34A4B3] text-white px-9 py-4 rounded-[8px] flex items-center gap-3 [font-family:'Poppins',sans-serif] font-medium text-[16px] hover:bg-[#2D8A96] transition-colors shadow-[0px_4px_33px_rgba(64,201,219,0.25)] mb-12">
                            Encuentra lo que necesitas
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Right Content - Visual Composition */}
                <div className="relative flex-1 w-full max-w-[800px] h-[700px] flex items-center justify-center lg:justify-end lg:mr-[-50px] mt-10 lg:mt-[50px]">

                    {/* Main Visual Container - moved slightly down and right */}
                    <div className="relative w-[650px] h-[650px] translate-y-[20px] translate-x-[20px]">

                        {/* Grey Ring - Background */}
                        <img
                            src="/banners/circle_grey.png"
                            alt=""
                            className="absolute right-[5%] top-[5%] w-[580px] h-[580px] object-contain z-0 opacity-100"
                        />

                        {/* Teal Circle - Middle */}
                        <img
                            src="/assets/eclipse_grande.png"
                            alt=""
                            className="absolute right-[17%] top-[17%] w-[440px] h-[440px] object-contain z-[1]"
                        />

                        {/* Doctors Layer 1: Bodies inside circle (Masked) */}
                        <div className="absolute right-[17%] top-[17%] w-[440px] h-[440px] rounded-full overflow-hidden z-[2] flex items-end justify-center">
                            <img
                                src="/banners/medicos_2_banner.png"
                                alt="Médicos Cuerpo"
                                className="w-[500px] max-w-none h-auto object-cover translate-y-[10px]"
                            />
                        </div>

                        {/* Doctors Layer 2: Full Image / Heads Pop-out (Overlay) */}
                        {/* Positioning must match exactly to overlay perfectly */}
                        <img
                            src="/banners/medicos_banner.png"
                            alt="Médicos Completo"
                            className="absolute right-[10%] top-[-8%] w-[520px] h-auto object-contain z-[3]"
                        />

                        {/* Glass Card: Donaciones Seguras */}
                        <div className="absolute top-[18%] left-[12%] bg-white/95 backdrop-blur-[20px] rounded-[12px] px-5 py-3 shadow-[0px_10px_30px_rgba(0,0,0,0.08)] z-[4] flex items-center gap-3 border border-white/50 animate-fade-in-up">
                            <div className="text-[#40C9DB]">
                                <img
                                    src="/assets/donaciones_seguras_icon.png"
                                    alt="Lock"
                                    className="w-7 h-7 object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#404040] font-bold text-[13px] [font-family:'Poppins',sans-serif]">
                                    Donaciones Seguras
                                </span>
                                <span className="text-[#9D9D9D] text-[11px] [font-family:'Poppins',sans-serif]">
                                    Revisados y aprobados
                                </span>
                            </div>
                        </div>

                        {/* Glass Card: Solicita Medicamentos */}
                        <div className="absolute bottom-[28%] right-[2%] bg-white/95 backdrop-blur-[20px] rounded-[12px] px-5 py-3 shadow-[0px_10px_30px_rgba(0,0,0,0.08)] z-[4] flex items-center gap-3 border border-white/50 animate-fade-in-up delay-100">
                            <div className="text-[#40C9DB]">
                                <img
                                    src="/assets/solicita_medicamento_icon.png"
                                    alt="Meds"
                                    className="w-7 h-7 object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#404040] font-bold text-[13px] [font-family:'Poppins',sans-serif]">
                                    Solicita medicamentos
                                </span>
                                <span className="text-[#9D9D9D] text-[11px] [font-family:'Poppins',sans-serif]">
                                    Solicitud en línea
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Section - Overlapping Visuals */}
            <div className="relative z-40 -mt-24 w-full max-w-[900px] lg:ml-0">
                <div className="bg-white backdrop-blur-[20px] rounded-[24px] shadow-[0px_20px_50px_rgba(0,0,0,0.08)] p-6 border border-gray-50/50">
                    <p className="text-[#404040] font-semibold text-[16px] mb-5 [font-family:'Poppins',sans-serif] ml-2">
                        Encuentra medicamentos disponibles
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-[2] w-full">
                            <input
                                type="text"
                                placeholder="Nombre del Medicamento"
                                className="w-full bg-[#F3F4F6] rounded-full px-8 py-4 text-[#4A5568] placeholder:text-[#A0AEC0] text-[15px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 transition-all"
                            />
                        </div>

                        <div className="flex-[1] w-full relative">
                            <select className="w-full bg-[#F3F4F6] rounded-full px-8 py-4 text-[#4A5568] text-[15px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 appearance-none cursor-pointer pr-12 transition-all">
                                <option>Filtros</option>
                                <option>Disponible</option>
                                <option>No Disponible</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#718096] pointer-events-none" />
                        </div>

                        <button className="bg-[#34A4B3] text-white px-12 py-4 rounded-full flex items-center justify-center gap-3 [font-family:'Poppins',sans-serif] font-semibold text-[16px] hover:bg-[#2B93A1] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#34A4B3]/30 w-full md:w-auto min-w-[150px]">
                            <Search className="w-5 h-5" />
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
