import { NavigationHeaderSection } from "../../components/header";
import { FooterSection } from "../../components/footer";
import { Button } from "../../components/ui/buttons";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export const HeroBannerSection = () => {
    return (
        <section className="relative w-full max-w-[1379px] mx-auto py-12 md:py-24">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                {/* Text Content */}
                <div className="w-full md:w-[60%] z-10">
                    <h1 className="[font-family:'Poppins',sans-serif] font-medium text-[#2D3748] text-[40px] md:text-[48px] leading-[1.2] md:leading-[72px]">
                        <span>¡Haz tu </span>
                        <span className="[font-family:'Merienda',cursive] font-bold text-[#40C9DB] text-[50px] md:text-[60px]">
                            solicitud y conecta con la esperanza
                        </span>
                        <span> de recibir los medicamentos que necesitas!</span>
                    </h1>
                </div>

                {/* Image Content */}
                <div className="w-full md:w-[40%] flex justify-end">
                    <img
                        className="w-full h-auto object-contain max-w-[500px]"
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
    {
        text: "Copia de cédula de identidad (Copia de acta de nacimiento en caso de ser menor de edad)",
    },
    {
        text: "En caso de ser menor de edad, copia de cédula de identidad del tutor",
    },
    {
        text: "En caso de ser extrajero legal copia de pasaporte, copia de residencia dominicana",
    },
    {
        text: "Copia de Carnet de Seguro médico(Si aplica)",
    },
    {
        text: "Historial Clínico firmado y sellado por el medico tratante (Con un mínimo de 6 meses de vigencia)",
    },
    {
        text: "Copia de Resultados de estudios y/o analíticas (Con un mínimo de 6 meses de vigencia)",
    },
    {
        text: "Receta o indicación medica original (Con un mínimo de 3 meses de vigencia)",
    },
    {
        text: "Carta de la administradora de Riesgo de Salud (ARS) (Si aplica)",
    },
];

import { Paperclip, Plus, X } from "lucide-react";

export const MedicationRequestFormSection = () => {
    return (
        <div className="w-full max-w-[1500px] mx-auto px-4 py-12 relative">
            {/* 1. Datos de Solicitante */}
            <section className="mb-16">
                <h2 className="[font-family:'Poppins',sans-serif] font-semibold text-[#404040] text-[32px] mb-8">
                    Datos de Solicitante
                </h2>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Form Fields Column */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Nombre */}
                        <div className="space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                                Nombre del Solicitante
                            </Label>
                            <Input
                                placeholder="Nombre del Solicitante"
                                className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                            />
                        </div>

                        {/* Cédula */}
                        <div className="space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                                Cédula
                            </Label>
                            <Input
                                placeholder="Documento de Identidad"
                                className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                            />
                        </div>

                        {/* Dirección */}
                        <div className="space-y-3 lg:col-span-2">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                                Dirección
                            </Label>
                            <Input
                                placeholder="Dirección del solicitante"
                                className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                            />
                        </div>

                        {/* Teléfono */}
                        <div className="space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                                Teléfono
                            </Label>
                            <Input
                                placeholder="Teléfono del Solicitante"
                                className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                            />
                        </div>

                        {/* Teléfono Adicional */}
                        <div className="space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                                Teléfono Adicional
                            </Label>
                            <Input
                                placeholder="Teléfono adicional del Solicitante"
                                className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                            />
                        </div>

                        {/* Correo */}
                        <div className="space-y-3 lg:col-span-2">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                                Correo Electrónico
                            </Label>
                            <Input
                                placeholder="Dirección del Correo Electrónico"
                                className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                            />
                        </div>

                        {/* Centro Medico & Patología */}
                        <div className="space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                                Centro Medico
                            </Label>
                            <Input
                                placeholder="Centro Medico"
                                className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                            />
                        </div>
                        <div className="space-y-3">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                                Patología
                            </Label>
                            <Input
                                placeholder="Patología"
                                className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                            />
                        </div>

                        {/* Medicamentos List in Grid */}
                        <div className="space-y-4 lg:col-span-2">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                                Medicamento
                            </Label>
                            {medicationFields.map((field, index) => (
                                <div key={`medication-${index}`} className="flex items-center gap-3">
                                    <Input
                                        placeholder={field.placeholder}
                                        className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6 flex-1"
                                    />
                                    {index === 0 ? (
                                        <div className="h-[58px] w-[58px] flex items-center justify-center bg-[#E2E8F0] rounded-[14px] cursor-pointer hover:bg-[#cbd5e1] transition-colors">
                                            <Plus className="w-6 h-6 text-[#64748B]" />
                                        </div>
                                    ) : (
                                        <div className="h-[58px] w-[58px] flex items-center justify-center bg-[#E2E8F0] rounded-[14px] cursor-pointer hover:bg-[#cbd5e1] transition-colors">
                                            <X className="w-6 h-6 text-[#64748B]" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Illustration for Medications (Right Side) */}
                    <div className="hidden lg:flex w-[40%] flex-col justify-start pt-10">
                        <div className="w-full aspect-[4/5] bg-[#F8F8F8] rounded-[24px] flex items-center justify-center border border-[#EFEFEF]">
                            <img
                                className="w-1/2 h-auto opacity-50 grayscale"
                                alt="Placeholder Icon"
                                src="./place_holder_solicitudes.png"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Datos de Representante */}
            <section className="mb-16">
                <h2 className="[font-family:'Poppins',sans-serif] font-semibold text-[#404040] text-[32px] mb-8">
                    Datos de Representante
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8 max-w-[900px]">
                    {/* Nombre Rep */}
                    <div className="space-y-3">
                        <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                            Nombre del Representante
                        </Label>
                        <Input
                            placeholder="Nombre del Representante"
                            className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                        />
                    </div>

                    {/* Cédula Rep */}
                    <div className="space-y-3">
                        <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                            Cédula
                        </Label>
                        <Input
                            placeholder="Documento de Identidad"
                            className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                        />
                    </div>

                    {/* Teléfono Rep */}
                    <div className="space-y-3">
                        <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                            Teléfono
                        </Label>
                        <Input
                            placeholder="Teléfono del Representante"
                            className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                        />
                    </div>

                    {/* Teléfono Adicional Rep */}
                    <div className="space-y-3">
                        <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                            Teléfono Adicional
                        </Label>
                        <Input
                            placeholder="Teléfono Adicional del Representante"
                            className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                        />
                    </div>

                    {/* Relación */}
                    <div className="space-y-3 lg:col-span-2">
                        <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px]">
                            Relación con el Solicitante
                        </Label>
                        <Input
                            placeholder="Relación con el Solicante"
                            className="h-[58px] bg-[#F8F7F7] border-[#DCD7D7] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-[#9A9A9A] text-[17px] text-left px-6"
                        />
                    </div>
                </div>
            </section>

            {/* 3. Documentos Requeridos */}
            <section className="mb-16">
                <h2 className="[font-family:'Poppins',sans-serif] font-semibold text-[#404040] text-[32px] mb-8">
                    Documentos Requeridos
                </h2>

                <div className="flex flex-col gap-6">
                    {requiredDocuments.map((doc, index) => (
                        <div key={`document-${index}`} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <Label className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px] max-w-[700px]">
                                {doc.text}
                            </Label>

                            {/* File Upload Input Style */}
                            <div className="w-full md:w-[400px] h-[50px] bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] flex items-center justify-end px-4 cursor-pointer hover:bg-gray-50 transition-colors">
                                <Paperclip className="w-5 h-5 text-[#555555]" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-7 mt-12 mb-12">
                <Button
                    className="w-[173px] h-[51px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-white text-[20px]"
                >
                    Cancelar
                </Button>

                <Button
                    className="w-[173px] h-[51px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[14px] [font-family:'Poppins',sans-serif] font-medium text-white text-[20px]"
                >
                    Confirmar
                </Button>
            </div>
        </div>
    );
};

export const Solicitudes = () => {
    return (
        <div className="w-full min-h-screen bg-white">
            <NavigationHeaderSection />
            <HeroBannerSection />
            <MedicationRequestFormSection />
            <FooterSection />
        </div>
    );
};
