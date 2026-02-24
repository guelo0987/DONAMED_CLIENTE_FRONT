import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { Paperclip, Plus, X, Loader2, AlertCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/buttons";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useSolicitudes } from "../../hooks/useSolicitudes";
import { useAuth } from "../../hooks/useAuth";
import { ConfirmationCard } from "../../components/ui/confirmation-card";

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
    const navigate = useNavigate();
    const { submitCompleto, isLoading: isSubmitLoading, error, setError } = useSolicitudes();
    const { getUser } = useAuth();
    const user = getUser();

    // Estado principal del formulario (Texto)
    const [formData, setFormData] = useState({
        codigoTipoSolicitud: "",
        nombreSolicitante: user?.nombre_completo || "",
        cedulaSolicitante: user?.cedula || "",
        direccionSolicitante: "",
        telefonoSolicitante: "",
        telefonoAdicionalSolicitante: "",
        centroMedico: "",
        patologia: "",
        nombreRepresentante: "",
        cedulaRepresentante: "",
        telefonoAdicionalRepresentante: "",
        telefonoRepresentante: "",
        relacionRepresentante: "",
    });

    // Control de Múltiples Medicamentos
    const [medications, setMedications] = useState<{ id: number; nombre: string }[]>([{ id: Date.now(), nombre: "" }]);

    // Control de Representante y Modal de Éxito
    const [hasRepresentative, setHasRepresentative] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    // Manejo de Documentos Adjuntos
    // File references associated with the REQUIRED_DOCUMENTS index
    const [files, setFiles] = useState<Record<number, File>>({});
    const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const addMedication = () => {
        setMedications((prev) => [...prev, { id: Date.now(), nombre: "" }]);
    };

    const removeMedication = (id: number) => {
        setMedications((prev) => prev.filter((m) => m.id !== id));
    };

    const handleMedicationChange = (id: number, value: string) => {
        setMedications(prev => prev.map(m => m.id === id ? { ...m, nombre: value } : m));
    };

    // Funciones para Manejo de Archivos
    const triggerFileInput = (index: number) => {
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index]?.click();
        }
    };

    const handleFileChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setError(null);

            // Límite de 10MB
            const MAX_SIZE = 10 * 1024 * 1024;
            if (file.size > MAX_SIZE) {
                setError(`El archivo '${file.name}' supera el límite máximo de 10MB.`);
                if (fileInputRefs.current[index]) fileInputRefs.current[index]!.value = '';
                return;
            }

            // Tipos soportados
            const allowedTypes = [
                'application/pdf',
                'image/jpeg',
                'image/jpg',
                'image/png',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ];

            if (!allowedTypes.includes(file.type)) {
                setError(`El formato de '${file.name}' no está permitido. Use PDF, JPG, PNG, DOC o DOCX.`);
                if (fileInputRefs.current[index]) fileInputRefs.current[index]!.value = '';
                return;
            }

            setFiles(prev => ({ ...prev, [index]: file }));
        }
    };

    // Validación Básica y Submit
    const handleSubmit = async () => {
        setError(null);

        // Validación local (simplificada, requiere las básicas)
        if (!formData.codigoTipoSolicitud) {
            setError("Debe seleccionar el Tipo de Solicitud.");
            return;
        }

        if (!formData.centroMedico || !formData.patologia) {
            setError("Los campos Centro Médico y Patología son obligatorios.");
            return;
        }

        const validMeds = medications.filter(m => m.nombre.trim() !== "").map(m => ({ nombre: m.nombre.trim() }));
        if (validMeds.length === 0) {
            setError("Debe especificar al menos un medicamento válido.");
            return;
        }

        const uploadedFiles = Object.values(files);
        if (uploadedFiles.length === 0) {
            setError("Debe adjuntar al menos un documento o receta justificativa.");
            return;
        }

        // Construir FormData final para el backend
        const submissionData = new FormData();
        submissionData.append("codigotiposolicitud", formData.codigoTipoSolicitud);
        submissionData.append("centroMedico", formData.centroMedico);
        submissionData.append("patologia", formData.patologia);

        if (hasRepresentative) {
            if (!formData.nombreRepresentante || !formData.cedulaRepresentante) {
                setError("Debe proporcionar el nombre y la cédula del representante, o desmarcar la opción 'Aplica representante'.");
                return;
            }
            submissionData.append("cedularepresentante", formData.cedulaRepresentante);
            if (formData.relacionRepresentante) {
                submissionData.append("relacion_solicitante", formData.relacionRepresentante);
            }
        }

        // Ajuntar todos los Files con el nombre esperado 'documentos'
        uploadedFiles.forEach(file => {
            submissionData.append("documentos", file);
        });

        // Llamar al Mega Hook!
        const success = await submitCompleto(submissionData, validMeds);

        if (success) {
            // Limpiar todo el formulario
            setFormData({
                codigoTipoSolicitud: "",
                nombreSolicitante: user?.nombre_completo || "",
                cedulaSolicitante: user?.cedula || "",
                direccionSolicitante: "",
                telefonoSolicitante: "",
                telefonoAdicionalSolicitante: "",
                centroMedico: "",
                patologia: "",
                nombreRepresentante: "",
                cedulaRepresentante: "",
                telefonoAdicionalRepresentante: "",
                telefonoRepresentante: "",
                relacionRepresentante: "",
            });
            setMedications([{ id: Date.now(), nombre: "" }]);
            setFiles({});
            setHasRepresentative(false);
            // Limpiar inputs de archivos
            fileInputRefs.current.forEach(ref => { if (ref) ref.value = ''; });

            setIsSuccessModalOpen(true);
        }
    };

    const placeholders = isEdit
        ? {
            solicitante: {
                nombre: "Nombre del Solicitante",
                cedula: "Documento de Identidad",
                direccion: "Dirección del solicitante",
                telefono: "Teléfono del Solicitante",
                telefonoAdicional: "Teléfono adicional del Solicitante",
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

                {error && (
                    <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-center gap-3 max-w-[1500px]">
                        <AlertCircle className="w-6 h-6 text-red-500" />
                        <span className="text-red-700 font-['Poppins']">{error}</span>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-12">
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
                        <div className="space-y-2 md:space-y-3 lg:col-span-2">
                            <Label className={LABEL_STYLE}>Tipo de Solicitud *</Label>
                            <select
                                name="codigoTipoSolicitud"
                                value={formData.codigoTipoSolicitud}
                                onChange={handleInputChange}
                                className={`${INPUT_STYLE} w-full appearance-none outline-none focus:border-[#34A4B3] hover:border-[#34A4B3]/50 transition-colors bg-white ${!formData.codigoTipoSolicitud ? "text-gray-400" : "text-[#111827]"
                                    }`}
                                required
                            >
                                <option value="" disabled hidden>Seleccione el tipo de solicitud</option>
                                <option value="PRIMERA_SOLICITUD">Primera Solicitud</option>
                                <option value="RENOVACION">Renovación</option>
                                <option value="CAMBIO">Cambio</option>
                                <option value="INCLUSIÓN">Inclusión</option>
                            </select>
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Nombre del Solicitante</Label>
                            <Input name="nombreSolicitante" value={formData.nombreSolicitante} readOnly className={`${INPUT_STYLE} bg-gray-100 cursor-not-allowed opacity-80`} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Cédula</Label>
                            <Input name="cedulaSolicitante" value={formData.cedulaSolicitante} readOnly className={`${INPUT_STYLE} bg-gray-100 cursor-not-allowed opacity-80`} />
                        </div>
                        <div className="space-y-2 md:space-y-3 lg:col-span-2">
                            <Label className={LABEL_STYLE}>Dirección</Label>
                            <Input name="direccionSolicitante" value={formData.direccionSolicitante} onChange={handleInputChange} placeholder={placeholders.solicitante.direccion} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Teléfono</Label>
                            <Input name="telefonoSolicitante" value={formData.telefonoSolicitante} onChange={handleInputChange} placeholder={placeholders.solicitante.telefono} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Teléfono Adicional</Label>
                            <Input name="telefonoAdicionalSolicitante" value={formData.telefonoAdicionalSolicitante} onChange={handleInputChange} placeholder={placeholders.solicitante.telefonoAdicional} className={INPUT_STYLE} />
                        </div>

                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Centro Medico *</Label>
                            <Input required name="centroMedico" value={formData.centroMedico} onChange={handleInputChange} placeholder={placeholders.solicitante.centroMedico} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Patología *</Label>
                            <Input required name="patologia" value={formData.patologia} onChange={handleInputChange} placeholder={placeholders.solicitante.patologia} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-4 lg:col-span-2">
                            <Label className={LABEL_STYLE}>Medicamentos *</Label>
                            {medications.map((item, index) => (
                                <div key={item.id} className="flex items-center gap-3">
                                    <Input
                                        value={item.nombre}
                                        onChange={(e) => handleMedicationChange(item.id, e.target.value)}
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


                </div>
            </section>

            {/* 2. Datos de Representante */}
            <section className={isEdit ? "mb-8" : "mb-12 md:mb-16"}>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 md:mb-8">
                    <h2 className={`${SECTION_TITLE_STYLE} text-center md:text-left mb-0`}>
                        Datos de Representante
                    </h2>

                    <label className="flex items-center justify-center md:justify-start gap-2 cursor-pointer md:ml-4 bg-gray-50 px-4 py-2 rounded-full border border-gray-200 hover:bg-gray-100 transition-colors w-fit mx-auto md:mx-0">
                        <input
                            type="checkbox"
                            checked={hasRepresentative}
                            onChange={(e) => setHasRepresentative(e.target.checked)}
                            className="w-5 h-5 accent-[#34A4B3] border-gray-300 rounded cursor-pointer"
                        />
                        <span className="font-['Poppins'] text-[#404040] font-medium text-[15px]">
                            ¿El paciente es menor de edad / Aplica representante?
                        </span>
                    </label>
                </div>

                {hasRepresentative && (
                    <div className="bg-blue-50 border border-blue-200 rounded-[10px] p-4 mb-6 max-w-[900px]">
                        <p className="text-blue-700 font-['Poppins'] text-[14px]">
                            <strong className="font-semibold">Importante:</strong> Su representante legal debe tener una cuenta creada en DONAMED. Ingrese con exactitud la <strong>Cédula</strong> con la que se registró en la plataforma para poder ser asociado correctamente a la solicitud.
                        </p>
                    </div>
                )}

                {hasRepresentative && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8 max-w-[900px] animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Nombre del Representante</Label>
                            <Input name="nombreRepresentante" value={formData.nombreRepresentante} onChange={handleInputChange} placeholder={placeholders.representante.nombre} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Cédula</Label>
                            <Input name="cedulaRepresentante" value={formData.cedulaRepresentante} onChange={handleInputChange} placeholder={placeholders.representante.cedula} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Teléfono Adicional</Label>
                            <Input name="telefonoAdicionalRepresentante" value={formData.telefonoAdicionalRepresentante} onChange={handleInputChange} placeholder={placeholders.representante.telefonoAdicional} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>Teléfono</Label>
                            <Input name="telefonoRepresentante" value={formData.telefonoRepresentante} onChange={handleInputChange} placeholder={placeholders.representante.telefono} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3 lg:col-span-2">
                            <Label className={LABEL_STYLE}>Relación con el Solicitante</Label>
                            <Input name="relacionRepresentante" value={formData.relacionRepresentante} onChange={handleInputChange} placeholder={placeholders.representante.relacion} className={INPUT_STYLE} />
                        </div>
                    </div>
                )}
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
                            <div
                                onClick={() => triggerFileInput(index)}
                                className={`w-full md:w-[300px] lg:w-[400px] h-[50px] rounded-[10px] border flex items-center justify-between px-4 cursor-pointer transition-colors group ${files[index]
                                    ? 'bg-[#E6F4F1] border-[#34A4B3]'
                                    : 'bg-[#F8F7F7] border-[#DCD7D7] hover:bg-gray-50'
                                    }`}
                            >
                                <span className={`text-sm truncate font-['Poppins'] ${files[index] ? 'text-[#34A4B3] font-medium' : 'text-gray-400 group-hover:text-gray-500'}`}>
                                    {files[index] ? files[index].name : 'Seleccionar archivo...'}
                                </span>
                                {files[index] ? (
                                    <FileText className="w-5 h-5 text-[#34A4B3] flex-shrink-0" />
                                ) : (
                                    <Paperclip className="w-5 h-5 text-[#555555] flex-shrink-0" />
                                )}
                            </div>

                            {/* Hidden file input */}
                            <input
                                type="file"
                                accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
                                className="hidden"
                                ref={el => { fileInputRefs.current[index] = el; }}
                                onChange={(e) => handleFileChange(index, e)}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7 mt-8 mb-12">
                <Button
                    type="button"
                    onClick={() => navigate('/historial-solicitudes')}
                    disabled={isSubmitLoading}
                    className="w-full sm:w-[173px] h-[51px] bg-white border-2 border-[#34A4B3] text-[#34A4B3] hover:bg-[#34A4B3] hover:text-white rounded-[14px] font-['Poppins'] font-medium text-[18px] transition-colors disabled:opacity-50"
                >
                    Cancelar
                </Button>
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitLoading}
                    className="w-full sm:w-[173px] h-[51px] bg-[#34A4B3] hover:bg-[#2d8f9c] text-white rounded-[14px] font-['Poppins'] font-medium text-[18px] shadow-lg shadow-[#34A4B3]/20 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isSubmitLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                    ) : (
                        isEdit ? "Guardar" : "Confirmar"
                    )}
                </Button>
            </div>

            <ConfirmationCard
                open={isSuccessModalOpen}
                title="Su solicitud ha sido enviada"
                highlight="correctamente"
                description="Estaremos enviándole un correo cuando sea validada y"
                descriptionHighlight="aprobada."
                buttonLabel="Ver Historial"
                onButtonClick={() => {
                    setIsSuccessModalOpen(false);
                    navigate('/historial-solicitudes');
                }}
            />
        </div>
    );
};
