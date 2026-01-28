import { MainLayout } from "../../components/layout/MainLayout";
import { Button } from "../../components/ui/buttons";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

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

const medicationFields = [
    { placeholder: "Medicamento" },
    { placeholder: "Medicamento" },
    { placeholder: "Medicamento" },
    { placeholder: "Medicamento" },
];

const requiredDocuments = [
    { text: "Copia de cédula de identidad" },
    { text: "En caso de ser menor de edad, copia de cédula de identidad del tutor" },
    { text: "En caso de ser extranjero legal copia de pasaporte, copia de residencia dominicana" },
    { text: "Copia de Carnet de Seguro médico (Si aplica)" },
    { text: "Historial Clínico firmado y sellado por el medico tratante (min. 6 meses vigencia)" },
    { text: "Copia de Resultados de estudios y/o analíticas (min. 6 meses vigencia)" },
    { text: "Receta o indicación medica original (min. 3 meses vigencia)" },
    { text: "Carta de la administradora de Riesgo de Salud (ARS) (Si aplica)" },
];

import { Paperclip, Plus, X } from "lucide-react";

export const MedicationRequestFormSection = () => {
    return (
        <div className="w-full max-w-[1500px] mx-auto px-4 py-8 md:py-12 relative">
            {/* 1. Datos de Solicitante */}
            <section className="mb-12 md:mb-16">
                <h2 className="[font-family:'Poppins',sans-serif] font-semibold text-[#404040] text-[24px] md:text-[32px] mb-6 md:mb-8 text-center md:text-left">
                    Datos de Solicitante
                </h2>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Form Fields Column */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
                        {/* Nombre */}
                        <div className="space-y-2 md:space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                                Nombre del Solicitante
                            </Label>
                            <Input
                                placeholder="Nombre Completo"
                                className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6 text-[16px]"
                            />
                        </div>

                        {/* Cédula */}
                        <div className="space-y-2 md:space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                                Cédula
                            </Label>
                            <Input
                                placeholder="000-0000000-0"
                                className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6 text-[16px]"
                            />
                        </div>

                        {/* Dirección */}
                        <div className="space-y-2 md:space-y-3 lg:col-span-2">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                                Dirección
                            </Label>
                            <Input
                                placeholder="Dirección completa"
                                className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6 text-[16px]"
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="space-y-2 md:space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                                Teléfono
                            </Label>
                            <Input
                                placeholder="(809) 000-0000"
                                className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6 text-[16px]"
                            />
                        </div>

                        {/* Teléfono Adicional */}
                        <div className="space-y-2 md:space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                                Teléfono Adicional
                            </Label>
                            <Input
                                placeholder="(809) 000-0000"
                                className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6 text-[16px]"
                            />
                        </div>

                        {/* Correo */}
                        <div className="space-y-2 md:space-y-3 lg:col-span-2">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                                Correo Electrónico
                            </Label>
                            <Input
                                type="email"
                                placeholder="nombre@ejemplo.com"
                                className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6 text-[16px]"
                            />
                        </div>

                        {/* Centro Medico & Patología */}
                        <div className="space-y-2 md:space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                                Centro Medico
                            </Label>
                            <Input
                                placeholder="Nombre del centro"
                                className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6 text-[16px]"
                            />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                                Patología
                            </Label>
                            <Input
                                placeholder="Descripción"
                                className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6 text-[16px]"
                            />
                        </div>

                        {/* Medicamentos List */}
                        <div className="space-y-4 lg:col-span-2">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                                Medicamento
                            </Label>
                            {medicationFields.map((field, index) => (
                                <div key={`medication-${index}`} className="flex items-center gap-3">
                                    <Input
                                        placeholder={field.placeholder}
                                        className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6 text-[16px] flex-1"
                                    />
                                    <div className="h-[50px] w-[50px] md:h-[58px] md:w-[58px] flex items-center justify-center bg-[#E2E8F0] rounded-[10px] md:rounded-[14px] cursor-pointer hover:bg-[#cbd5e1] transition-colors flex-shrink-0">
                                        {index === 0 ? (
                                            <Plus className="w-5 h-5 md:w-6 md:h-6 text-[#64748B]" />
                                        ) : (
                                            <X className="w-5 h-5 md:w-6 md:h-6 text-[#64748B]" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Illustration (Right Side) - Hidden on Mobile */}
                    <div className="hidden lg:flex w-[35%] flex-col justify-start pt-10">
                        <div className="w-full aspect-[4/5] bg-[#F8F8F8] rounded-[24px] flex items-center justify-center border border-[#EFEFEF] p-8">
                            <img
                                className="w-full h-auto opacity-50 grayscale object-contain"
                                alt="Placeholder Icon"
                                src="/assets/clipboard_placeholder.png" /* Updated path assumption */
                                onError={(e) => {
                                    e.currentTarget.src = "https://placehold.co/400x500/F8F8F8/CCCCCC?text=Illustration";
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Datos de Representante */}
            <section className="mb-12 md:mb-16">
                <h2 className="[font-family:'Poppins',sans-serif] font-semibold text-[#404040] text-[24px] md:text-[32px] mb-6 md:mb-8 text-center md:text-left">
                    Datos de Representante
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 max-w-[900px]">
                    <div className="space-y-2 md:space-y-3">
                        <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                            Nombre del Representante
                        </Label>
                        <Input placeholder="Nombre Completo" className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6" />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                        <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                            Cédula
                        </Label>
                        <Input placeholder="000-0000000-0" className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6" />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                        <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                            Teléfono
                        </Label>
                        <Input placeholder="(809) 000-0000" className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6" />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                        <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                            Teléfono Adicional
                        </Label>
                        <Input placeholder="(809) 000-0000" className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6" />
                    </div>
                    <div className="space-y-2 md:space-y-3 lg:col-span-2">
                        <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] md:text-[20px]">
                            Relación con el Solicitante
                        </Label>
                        <Input placeholder="Ej. Padre, Madre, Hijo..." className="h-[50px] md:h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6" />
                    </div>
                </div>
            </section>

            {/* 3. Documentos Requeridos */}
            <section className="mb-12 md:mb-16">
                <h2 className="[font-family:'Poppins',sans-serif] font-semibold text-[#404040] text-[24px] md:text-[32px] mb-6 md:mb-8 text-center md:text-left">
                    Documentos Requeridos
                </h2>

                <div className="flex flex-col gap-4 md:gap-6">
                    {requiredDocuments.map((doc, index) => (
                        <div key={`document-${index}`} className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-white rounded-lg border border-transparent hover:border-gray-100 transition-all">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[16px] md:text-[18px] lg:text-[20px] max-w-[700px] leading-snug">
                                {doc.text}
                            </Label>

                            {/* File Upload Input Style */}
                            <div className="w-full md:w-[300px] lg:w-[400px] h-[50px] bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] flex items-center justify-between px-4 cursor-pointer hover:bg-gray-50 transition-colors group">
                                <span className="text-gray-400 text-sm group-hover:text-gray-500">Seleccionar archivo...</span>
                                <Paperclip className="w-5 h-5 text-[#555555]" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7 mt-8 mb-12">
                <Button className="w-full sm:w-[173px] h-[51px] bg-white border-2 border-[#34A4B3] text-[#34A4B3] hover:bg-[#34A4B3] hover:text-white rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[18px] transition-colors">
                    Cancelar
                </Button>

                <Button className="w-full sm:w-[173px] h-[51px] bg-[#34A4B3] hover:bg-[#2d8f9c] text-white rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[18px] shadow-lg shadow-[#34A4B3]/20">
                    Confirmar
                </Button>
            </div>
        </div>
    );
};

export const Solicitudes = () => {
    return (
        <MainLayout>
            <HeroBannerSection />
            <MedicationRequestFormSection />
        </MainLayout>
    );
};
