import { MainLayout } from "../../components/layout/MainLayout";
import { SolicitudForm } from "./SolicitudForm";

export const HeroBannerSection = () => {
    return (
        <section className="relative w-full py-2 md:py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 h-full">
                {/* Text Content */}
                <div className="w-full md:w-[60%] z-10 text-center md:text-left">
                    <h1 className="[font-family:'Poppins',sans-serif] font-medium text-[#2D3748] text-[26px] sm:text-[30px] md:text-[34px] leading-[1.2] md:leading-[1.18]">
                        <span>¡Haz tu </span>
                        <span className="[font-family:'Merienda',cursive] font-bold text-[#40C9DB] text-[30px] sm:text-[36px] md:text-[40px] block sm:inline">
                            solicitud y conecta con la esperanza
                        </span>
                        <span> de recibir los medicamentos que necesitas!</span>
                    </h1>
                </div>

                {/* Image Content */}
                <div className="w-full md:w-[36%] flex justify-center md:justify-end mt-1 md:mt-0">
                    <img
                        className="w-[62%] md:w-full h-auto object-contain max-w-[220px] md:max-w-[300px]"
                        alt="Medicamentos ilustración"
                        src="/banners/solicitud_banner_image.png"
                    />
                </div>
            </div>
        </section>
    );
};

export const Solicitudes = () => {
    return (
        <MainLayout>
            <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-5 md:px-6 lg:px-7">
                <HeroBannerSection />
                <SolicitudForm mode="create" className="max-w-none px-0 md:px-0 lg:px-0" />
            </div>
        </MainLayout>
    );
};
