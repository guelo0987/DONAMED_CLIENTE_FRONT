import { ArrowRight, Search, ChevronDown } from "lucide-react";

export const HeroSection = () => {
    return (
        <section className="relative w-full max-w-[1440px] mx-auto px-4 lg:px-20 pb-12 lg:pb-24 overflow-hidden lg:overflow-visible">
            <div className="flex flex-col lg:flex-row items-center justify-between min-h-[auto] lg:min-h-[640px] relative">

                {/* Left Content */}
                <div className="flex-1 w-full max-w-[650px] z-20 pt-8 lg:pt-8 flex flex-col items-start text-center lg:text-left pointer-events-none mb-8 lg:mb-0">
                    <div className="pointer-events-auto w-full flex flex-col items-center lg:items-start">
                        {/* Title */}
                        <h1 className="text-[36px] sm:text-[42px] lg:text-[72px] leading-[1.1] mb-4 lg:mb-6">
                            <span className="[font-family:'Merienda',cursive] italic text-[#40C9DB] font-bold">Transforma</span>{" "}
                            <span className="[font-family:'Poppins',sans-serif] font-bold text-[#404040]">tu ayuda</span>
                            <br />
                            <span className="[font-family:'Poppins',sans-serif] font-bold text-[#404040]">en esperanza</span>
                        </h1>

                        {/* Description */}
                        <p className="text-[#4A5568] text-[14px] lg:text-[18px] leading-[1.6] mb-8 max-w-[500px] [font-family:'Poppins',sans-serif] font-normal mx-auto lg:mx-0">
                            El acceso a medicamentos de alto costo es esencial para
                            garantizar la salud y el bienestar de todos. Cada donación de
                            medicamentos puede cambiar una vida.
                        </p>

                        {/* CTA Button */}
                        <button className="bg-[#34A4B3] text-white px-8 py-3 lg:px-9 lg:py-4 rounded-[8px] flex items-center gap-3 [font-family:'Poppins',sans-serif] font-medium text-[15px] lg:text-[16px] hover:bg-[#2D8A96] transition-colors shadow-[0px_4px_33px_rgba(64,201,219,0.25)] mb-8 lg:mb-12">
                            Encuentra lo que necesitas
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Right Content - Visual Composition */}
                <div className="relative flex-1 w-full max-w-[380px] sm:max-w-[500px] lg:max-w-[800px] aspect-square lg:h-[700px] flex items-center justify-center lg:justify-end lg:mr-[-50px] mt-0 lg:mt-[50px]">

                    {/* Main Visual Container - Responsive Scaling */}
                    <div className="relative w-full h-full lg:w-[650px] lg:h-[650px] lg:translate-y-[20px] lg:translate-x-[20px]">

                        {/* Grey Ring - Background */}
                        <img
                            src="/banners/circle_grey.png"
                            alt=""
                            className="absolute right-[5%] top-[5%] w-[90%] h-[90%] object-contain z-0 opacity-100"
                        />

                        {/* Teal Circle - Middle */}
                        <img
                            src="/assets/eclipse_grande.png"
                            alt=""
                            className="absolute right-[17%] top-[17%] w-[68%] h-[68%] object-contain z-[1]"
                        />

                        {/* Doctors Layer 1: Bodies inside circle (Masked) */}
                        <div className="absolute right-[17%] top-[17%] w-[68%] h-[68%] rounded-full overflow-hidden z-[2] flex items-end justify-center">
                            <img
                                src="/banners/medicos_2_banner.png"
                                alt="Médicos Cuerpo"
                                className="w-[115%] max-w-none h-auto object-cover translate-y-[2%] translate-x-[0%]"
                            />
                        </div>

                        {/* Doctors Layer 2: Full Image / Heads Pop-out (Overlay) */}
                        <img
                            src="/banners/medicos_banner.png"
                            alt="Médicos Completo"
                            className="absolute right-[10%] top-[-8%] w-[80%] h-auto object-contain z-[3]"
                        />

                        {/* Glass Card: Donaciones Seguras */}
                        <div className="absolute top-[18%] left-[5%] lg:left-[12%] bg-white/95 backdrop-blur-[20px] rounded-[12px] px-3 py-2 lg:px-5 lg:py-3 shadow-[0px_10px_30px_rgba(0,0,0,0.08)] z-[4] flex items-center gap-2 lg:gap-3 border border-white/50 animate-fade-in-up scale-90 lg:scale-100 origin-left">
                            <div className="text-[#40C9DB]">
                                <img
                                    src="/assets/donaciones_seguras_icon.png"
                                    alt="Lock"
                                    className="w-5 h-5 lg:w-7 lg:h-7 object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#404040] font-bold text-[11px] lg:text-[13px] [font-family:'Poppins',sans-serif]">
                                    Donaciones Seguras
                                </span>
                                <span className="text-[#9D9D9D] text-[9px] lg:text-[11px] [font-family:'Poppins',sans-serif]">
                                    Revisados y aprobados
                                </span>
                            </div>
                        </div>

                        {/* Glass Card: Solicita Medicamentos */}
                        <div className="absolute bottom-[28%] right-[-2%] lg:right-[2%] bg-white/95 backdrop-blur-[20px] rounded-[12px] px-3 py-2 lg:px-5 lg:py-3 shadow-[0px_10px_30px_rgba(0,0,0,0.08)] z-[4] flex items-center gap-2 lg:gap-3 border border-white/50 animate-fade-in-up delay-100 scale-90 lg:scale-100 origin-right">
                            <div className="text-[#40C9DB]">
                                <img
                                    src="/assets/solicita_medicamento_icon.png"
                                    alt="Meds"
                                    className="w-5 h-5 lg:w-7 lg:h-7 object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#404040] font-bold text-[11px] lg:text-[13px] [font-family:'Poppins',sans-serif]">
                                    Solicita medicamentos
                                </span>
                                <span className="text-[#9D9D9D] text-[9px] lg:text-[11px] [font-family:'Poppins',sans-serif]">
                                    Solicitud en línea
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Section - Overlapping Visuals or Stacked */}
            <div className="relative z-40 -mt-16 sm:-mt-24 lg:-mt-24 w-full max-w-[900px] mx-auto lg:ml-0 px-4 lg:px-0">
                <div className="bg-white backdrop-blur-[20px] rounded-[20px] lg:rounded-[24px] shadow-[0px_20px_50px_rgba(0,0,0,0.08)] p-6 border border-gray-50/50">
                    <p className="text-[#404040] font-semibold text-[14px] lg:text-[16px] mb-4 [font-family:'Poppins',sans-serif] ml-2 text-center lg:text-left">
                        Encuentra medicamentos disponibles
                    </p>

                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        <div className="flex-[2] w-full">
                            <input
                                type="text"
                                placeholder="Nombre del Medicamento"
                                className="w-full bg-[#F3F4F6] rounded-full px-6 lg:px-8 py-3 lg:py-4 text-[#4A5568] placeholder:text-[#A0AEC0] text-[14px] lg:text-[15px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 transition-all"
                            />
                        </div>

                        <div className="flex-[1] w-full relative">
                            <select className="w-full bg-[#F3F4F6] rounded-full px-6 lg:px-8 py-3 lg:py-4 text-[#4A5568] text-[14px] lg:text-[15px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 appearance-none cursor-pointer pr-12 transition-all">
                                <option>Filtros</option>
                                <option>Disponible</option>
                                <option>No Disponible</option>
                            </select>
                            <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-[#718096] pointer-events-none" />
                        </div>

                        <button className="bg-[#34A4B3] text-white px-8 lg:px-12 py-3 lg:py-4 rounded-full flex items-center justify-center gap-3 [font-family:'Poppins',sans-serif] font-semibold text-[15px] lg:text-[16px] hover:bg-[#2B93A1] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#34A4B3]/30 w-full lg:w-auto min-w-[150px]">
                            <Search className="w-4 h-4 lg:w-5 lg:h-5" />
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
