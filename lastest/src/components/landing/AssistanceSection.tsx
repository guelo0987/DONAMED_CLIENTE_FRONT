export const AssistanceSection = () => {
    return (
        <section className="w-full py-8 px-4">
            <div className="max-w-[1327px] mx-auto relative">
                {/* Main Card Container */}
                <div className="relative bg-white rounded-[12px] shadow-[0px_3.43px_34.5px_rgba(0,0,0,0.33)] overflow-hidden">
                    {/* Background Image */}
                    <img
                        src="/banners/asistencia_landing_background.png"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-[380px]">
                        {/* Left - Doctor Image */}
                        <div className="w-full lg:w-[45%] relative flex items-end justify-center lg:justify-start">
                            <img
                                src="/banners/chica_asistencia_landing.png"
                                alt="Doctora"
                                className="w-auto max-w-[350px] h-auto max-h-[380px] object-contain"
                            />
                        </div>

                        {/* Right - Content */}
                        <div className="w-full lg:w-[55%] p-8 lg:p-10 text-center lg:text-left">
                            {/* Title */}
                            <h2 className="text-[28px] lg:text-[44px] font-medium mb-3 [font-family:'Poppins',sans-serif]">
                                <span className="text-[#404040]">¿Necesitas </span>
                                <span className="text-[#40C9DB]">Asistencia?</span>
                            </h2>

                            {/* Subtitle */}
                            <p className="text-[#2D3748] text-[15px] lg:text-[18px] font-medium mb-6 [font-family:'Poppins',sans-serif]">
                                Para hablar con un representante llamar al
                            </p>

                            {/* Phone Button */}
                            <a
                                href="tel:+18298291829"
                                className="inline-block bg-[#34A4B3] text-white px-8 py-3 rounded-[4px] [font-family:'Poppins',sans-serif] font-normal text-[18px] lg:text-[22px] hover:bg-[#2D8A96] transition-colors shadow-[0px_4px_33px_rgba(255,255,255,0.16)]"
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
