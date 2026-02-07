import { MainLayout } from "../../components/layout/MainLayout";
import { SolicitudForm } from "./SolicitudForm";

export const HeroBannerSection = () => {
    return (
        <section className="relative w-full max-w-[1379px] mx-auto py-8 md:py-24 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                {/* Text Content */}
                <div className="w-full md:w-[60%] z-10 text-center md:text-left">
                    <h1 className="[font-family:'Poppins',sans-serif] font-medium text-[#2D3748] text-[32px] sm:text-[40px] md:text-[48px] leading-[1.2] md:leading-[1.2]">
                        <span>¡Haz tu </span>
                        <span className="[font-family:'Merienda',cursive] font-bold text-[#40C9DB] text-[40px] sm:text-[50px] md:text-[60px] block sm:inline">
                            solicitud y conecta con la esperanza
                        </span>
                        <span> de recibir los medicamentos que necesitas!</span>
                    </h1>
                </div>

                {/* Image Content */}
                <div className="w-full md:w-[40%] flex justify-center md:justify-end mt-6 md:mt-0">
                    <img
                        className="w-[80%] md:w-full h-auto object-contain max-w-[350px] md:max-w-[500px]"
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
            <HeroBannerSection />
            <SolicitudForm mode="create" />
        </MainLayout>
    );
};
