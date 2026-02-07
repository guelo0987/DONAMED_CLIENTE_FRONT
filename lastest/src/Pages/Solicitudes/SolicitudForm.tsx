import { useState } from "react";
import { Paperclip, Plus, X, Pill } from "lucide-react";
import { Button } from "../../components/ui/buttons";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export type SolicitudFormMode = "create" | "edit";

const REQUIRED_DOCUMENTS = [
    "Copia de cédula de identidad (Copia de acta de nacimiento en caso de ser menor de edad)",
    "En caso de ser menor de edad, copia de cédula de identidad del tutor",
    "En caso de ser extranjero legal copia de pasaporte, copia de residencia dominicana",
    "Copia de Carnet de Seguro médico (Si aplica)",
    "Historial Clínico firmado y sellado por el medico tratante (Con un mínimo de 6 meses de vigencia)",
    "Copia de Resultados de estudios y/o analíticas (Con un mínimo de 6 meses de vigencia)",
    "Receta o indicación medica original (Con un mínimo de 3 meses de vigencia)",
    "Carta de la administradora de Riesgo de Salud (ARS) (Si aplica)",
];

const INPUT_STYLE =
    "h-[50px] md:h-[58px] bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] md:rounded-[14px] px-6 text-[16px] font-['Poppins']";
const LABEL_STYLE =
    "font-['Poppins'] font-medium text-[#404040] text-[18px] md:text-[20px]";
const SECTION_TITLE_STYLE =
    "font-['Poppins'] font-semibold text-[#404040] text-[24px] md:text-[32px]";

interface SolicitudFormProps {
    mode: SolicitudFormMode;
    className?: string;
}

export const SolicitudForm = ({ mode, className = "" }: SolicitudFormProps) => {
    const isEdit = mode === "edit";

    const [medications, setMedications] = useState<{ id: number }[]>([{ id: 0 }]);

    const addMedication = () => {
        setMedications((prev) => [...prev, { id: Date.now() }]);
    };

    const removeMedication = (id: number) => {
        setMedications((prev) => prev.filter((m) => m.id !== id));
    };

    const placeholders = isEdit
        ? {
              solicitante: {
                  nombre: "Nombre del Solicitante",
                  cedula: "Documento de Identidad",
                  direccion: "Dirección del solicitante",
                  telefono: "Teléfono del Solicitante",
                  telefonoAdicional: "Teléfono adicional del Solicitante",
                  correo: "Dirección del Correo Electrónico",
                  centroMedico: "Centro Medico",
                  patologia: "Patología",
                  medicamento: "Medicamento",
              },
              representante: {
                  nombre: "Nombre del Representante",
                  cedula: "Documento de Identidad",
                  telefonoAdicional: "Teléfono Adicional del Representante",
                  telefono: "Teléfono del Representante",
                  relacion: "Relación con el Solicitante",
              },
          }
        : {
              solicitante: {
                  nombre: "Nombre Completo",
                  cedula: "000-0000000-0",
                  direccion: "Dirección completa",
                  telefono: "(809) 000-0000",
                  telefonoAdicional: "(809) 000-0000",
                  correo: "nombre@ejemplo.com",
                  centroMedico: "Nombre del centro",
                  patologia: "Descripción",
                  medicamento: "Medicamento",
              },
              representante: {
                  nombre: "Nombre Completo",
                  cedula: "000-0000000-0",
                  telefonoAdicional: "(809) 000-0000",
                  telefono: "(809) 000-0000",
                  relacion: "Ej. Padre, Madre, Hijo...",
              },
          };

    return (
        <div className={`w-full ${isEdit ? "" : "max-w-[1500px]"} mx-auto px-4 ${isEdit ? "py-0" : "py-8 md:py-12"} relative ${className}`}>
            {/* 1. Datos de Solicitante */}
            <section className={isEdit ? "mb-8" : "mb-12 md:mb-16"}>
                <h2 className={`${SECTION_TITLE_STYLE} mb-6 md:mb-8 text-center md:text-left`}>
                    Datos de Solicitante
                </h2>

                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Nombre del Solicitante</Label>
                            <Input placeholder={placeholders.solicitante.nombre} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Cédula</Label>
                            <Input placeholder={placeholders.solicitante.cedula} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3 lg:col-span-2">
                            <Label className={LABEL_STYLE}>Dirección</Label>
                            <Input placeholder={placeholders.solicitante.direccion} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Teléfono</Label>
                            <Input placeholder={placeholders.solicitante.telefono} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Teléfono Adicional</Label>
                            <Input placeholder={placeholders.solicitante.telefonoAdicional} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3 lg:col-span-2">
                            <Label className={LABEL_STYLE}>Correo Electrónico</Label>
                            <Input
                                type="email"
                                placeholder={placeholders.solicitante.correo}
                                className={INPUT_STYLE}
                            />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Centro Medico</Label>
                            <Input placeholder={placeholders.solicitante.centroMedico} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Patología</Label>
                            <Input placeholder={placeholders.solicitante.patologia} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-4 lg:col-span-2">
                            <Label className={LABEL_STYLE}>Medicamento</Label>
                            {medications.map((item, index) => (
                                <div key={item.id} className="flex items-center gap-3">
                                    <Input
                                        placeholder={placeholders.solicitante.medicamento}
                                        className={`${INPUT_STYLE} flex-1`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => (index === 0 ? addMedication() : removeMedication(item.id))}
                                        className="h-[50px] w-[50px] md:h-[58px] md:w-[58px] flex items-center justify-center bg-[#E2E8F0] rounded-[10px] md:rounded-[14px] cursor-pointer hover:bg-[#cbd5e1] transition-colors flex-shrink-0"
                                        aria-label={index === 0 ? "Añadir medicamento" : "Quitar medicamento"}
                                    >
                                        {index === 0 ? (
                                            <Plus className="w-5 h-5 md:w-6 md:h-6 text-[#64748B]" />
                                        ) : (
                                            <X className="w-5 h-5 md:w-6 md:h-6 text-[#64748B]" />
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Ilustración derecha: en edit Figma muestra ícono medicamento; en create la imagen */}
                    <div className="hidden lg:flex w-[35%] flex-col justify-start pt-10 flex-shrink-0">
                        <div className="w-full aspect-[4/5] bg-[#F8F8F8] rounded-[24px] flex items-center justify-center border border-[#EFEFEF] p-8">
                            {isEdit ? (
                                <Pill className="w-24 h-24 md:w-32 md:h-32 text-[#CCCCCC]" strokeWidth={1.2} />
                            ) : (
                                <img
                                    className="w-full h-auto opacity-50 grayscale object-contain"
                                    alt="Ilustración"
                                    src="/banners/solicitud_banner_image.png"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://placehold.co/400x500/F8F8F8/CCCCCC?text=Illustration";
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Datos de Representante */}
            <section className={isEdit ? "mb-8" : "mb-12 md:mb-16"}>
                <h2 className={`${SECTION_TITLE_STYLE} mb-6 md:mb-8 text-center md:text-left`}>
                    Datos de Representante
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 max-w-[900px]">
                    <div className="space-y-2 md:space-y-3">
                        <Label className={LABEL_STYLE}>Nombre del Representante</Label>
                        <Input placeholder={placeholders.representante.nombre} className={INPUT_STYLE} />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                        <Label className={LABEL_STYLE}>Cédula</Label>
                        <Input placeholder={placeholders.representante.cedula} className={INPUT_STYLE} />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                        <Label className={LABEL_STYLE}>Teléfono Adicional</Label>
                        <Input placeholder={placeholders.representante.telefonoAdicional} className={INPUT_STYLE} />
                    </div>
                    <div className="space-y-2 md:space-y-3">
                        <Label className={LABEL_STYLE}>Teléfono</Label>
                        <Input placeholder={placeholders.representante.telefono} className={INPUT_STYLE} />
                    </div>
                    <div className="space-y-2 md:space-y-3 lg:col-span-2">
                        <Label className={LABEL_STYLE}>Relación con el Solicitante</Label>
                        <Input placeholder={placeholders.representante.relacion} className={INPUT_STYLE} />
                    </div>
                </div>
            </section>

            {/* 3. Documentos Requeridos */}
            <section className={isEdit ? "mb-8" : "mb-12 md:mb-16"}>
                <h2 className={`${SECTION_TITLE_STYLE} mb-6 md:mb-8 text-center md:text-left`}>
                    Documentos Requeridos
                </h2>

                <div className="flex flex-col gap-4 md:gap-6">
                    {REQUIRED_DOCUMENTS.map((text, index) => (
                        <div
                            key={`document-${index}`}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 bg-white rounded-lg border border-transparent hover:border-gray-100 transition-all"
                        >
                            <Label className={`${LABEL_STYLE} text-[16px] md:text-[18px] lg:text-[20px] max-w-[700px] leading-snug`}>
                                {text}
                            </Label>
                            <div className="w-full md:w-[300px] lg:w-[400px] h-[50px] bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] flex items-center justify-between px-4 cursor-pointer hover:bg-gray-50 transition-colors group">
                                <span className="text-gray-400 text-sm group-hover:text-gray-500 font-['Poppins']">
                                    Seleccionar archivo...
                                </span>
                                <Paperclip className="w-5 h-5 text-[#555555] flex-shrink-0" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7 mt-8 mb-12">
                <Button
                    type="button"
                    className="w-full sm:w-[173px] h-[51px] bg-white border-2 border-[#34A4B3] text-[#34A4B3] hover:bg-[#34A4B3] hover:text-white rounded-[14px] font-['Poppins'] font-medium text-[18px] transition-colors"
                >
                    Cancelar
                </Button>
                <Button
                    type="button"
                    className="w-full sm:w-[173px] h-[51px] bg-[#34A4B3] hover:bg-[#2d8f9c] text-white rounded-[14px] font-['Poppins'] font-medium text-[18px] shadow-lg shadow-[#34A4B3]/20"
                >
                    {isEdit ? "Guardar" : "Confirmar"}
                </Button>
            </div>
        </div>
    );
};
