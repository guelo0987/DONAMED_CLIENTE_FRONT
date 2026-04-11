import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { Paperclip, Plus, X, Loader2, AlertCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/buttons";
import { DropdownSelect } from "../../components/ui/dropdown-select";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useSolicitudes } from "../../hooks/useSolicitudes";
import { useAuth } from "../../hooks/useAuth";
import { ConfirmationCard } from "../../components/ui/confirmation-card";
import { authService } from "../../services/authService";
import { useI18n } from "../../i18n/language-context";

export type SolicitudFormMode = "create" | "edit";

const getRequiredDocuments = (t: (key: string, fallback?: string) => string) => [
    { label: t("solicitudForm.requiredDocs.idCopy"), required: true },
    { label: t("solicitudForm.requiredDocs.tutorIdCopy"), required: false },
    { label: t("solicitudForm.requiredDocs.foreignDocs"), required: false },
    { label: t("solicitudForm.requiredDocs.insuranceCard"), required: false },
    { label: t("solicitudForm.requiredDocs.clinicalHistory"), required: true },
    { label: t("solicitudForm.requiredDocs.studiesResults"), required: true },
    { label: t("solicitudForm.requiredDocs.prescription"), required: true },
    { label: t("solicitudForm.requiredDocs.arsLetter"), required: false },
];

const INPUT_STYLE =
    "h-[38px] md:h-[42px] bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] md:rounded-[12px] px-4 text-[13px] md:text-[14px] font-['Poppins'] transition-all focus:border-[#40C9DB] focus:ring-2 focus:ring-[#40C9DB]/20";
const LABEL_STYLE =
    "font-['Poppins'] font-medium text-[#404040] text-[13px] md:text-[14px]";
const SECTION_TITLE_STYLE =
    "font-['Poppins'] font-semibold text-[#2D3748] text-[18px] md:text-[22px]";

interface SolicitudFormProps {
    mode: SolicitudFormMode;
    className?: string;
}

const ErrorModal = ({ open, errorMsg, onClose }: { open: boolean, errorMsg: string, onClose: () => void }) => {
    const { t } = useI18n();
    if (!open) return null;

    // Determinar ícono y título inteligente en base al contenido del mensaje
    let title = t("solicitudForm.errors.problemTitle");
    let desc = errorMsg;

    if (errorMsg.includes("4.5MB") || errorMsg.includes("peso") || errorMsg.includes("pesados")) {
        title = t("solicitudForm.errors.filesTooLarge");
    } else if (errorMsg.includes("conexión") || errorMsg.includes("Network")) {
        title = t("solicitudForm.errors.connectionFailure");
    } else if (errorMsg.includes("representante") || errorMsg.includes("Cédula") || errorMsg.includes("Representative")) {
        title = t("solicitudForm.errors.invalidRepresentative");
    } else if (errorMsg.includes("obligatorios") || errorMsg.includes("medicamento") || errorMsg.includes("adjuntar") || errorMsg.includes("seleccionar")) {
        title = t("solicitudForm.errors.incompleteInformation");
    } else if (errorMsg.includes("formato")) {
        title = t("solicitudForm.errors.unsupportedFormat");
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
            <div className="bg-white rounded-[24px] border border-[#E7E7E7] shadow-xl px-8 py-8 md:px-12 md:py-10 max-w-[420px] w-full flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
                <div className="w-[72px] h-[72px] bg-red-50 rounded-full flex items-center justify-center mb-5 ring-8 ring-red-50/50">
                    <AlertCircle className="w-9 h-9 text-red-500" />
                </div>
                <h3 className="text-[#2D3748] text-[20px] md:text-[22px] font-semibold font-['Poppins'] mb-3">{title}</h3>
                <p className="text-[#64748B] text-[14px] md:text-[15px] font-normal leading-relaxed font-['Poppins'] mb-8">
                    {desc}
                </p>
                <button
                    type="button"
                    onClick={onClose}
                    className="w-full h-[48px] bg-red-500 hover:bg-red-600 rounded-[14px] text-white text-[16px] font-medium font-['Poppins'] transition-all shadow-md hover:shadow-lg focus:ring-4 focus:ring-red-500/20 outline-none"
                >
                    {t("solicitudForm.understood")}
                </button>
            </div>
        </div>
    );
};

export const SolicitudForm = ({ mode, className = "" }: SolicitudFormProps) => {
    const { t } = useI18n();
    const REQUIRED_DOCUMENTS = getRequiredDocuments(t);
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

    // Load authService (Eliminado el require)

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

            // Límite de 2.5MB por archivo para Serverless
            const MAX_SIZE = 2.5 * 1024 * 1024;
            if (file.size > MAX_SIZE) {
                setError(`${t("solicitudForm.errors.fileTooLargePrefix")} '${file.name}' ${t("solicitudForm.errors.fileTooLargeSuffix")}`);
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
                setError(`${t("solicitudForm.errors.invalidFormatPrefix")} '${file.name}' ${t("solicitudForm.errors.invalidFormatSuffix")}`);
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
            setError(t("solicitudForm.errors.selectRequestType"));
            return;
        }

        if (!formData.centroMedico || !formData.patologia) {
            setError(t("solicitudForm.errors.medicalCenterPathologyRequired"));
            return;
        }

        const validMeds = medications.filter(m => m.nombre.trim() !== "").map(m => ({ nombre: m.nombre.trim() }));
        if (validMeds.length === 0) {
            setError(t("solicitudForm.errors.atLeastOneMedication"));
            return;
        }

        const uploadedFiles = Object.values(files);
        if (uploadedFiles.length === 0) {
            setError(t("solicitudForm.errors.atLeastOneDocument"));
            return;
        }

        // Límite sumado de 4.5MB por la restricción Serverless de Vercel/AWS (Max 4.5MB payload rules) 
        const totalSize = uploadedFiles.reduce((acc, file) => acc + file.size, 0);
        const MAX_TOTAL_SIZE = 4.5 * 1024 * 1024;
        if (totalSize > MAX_TOTAL_SIZE) {
            setError(t("solicitudForm.errors.totalFileSizeExceeded"));
            return;
        }

        // Construir FormData final para el backend
        const submissionData = new FormData();
        submissionData.append("codigotiposolicitud", formData.codigoTipoSolicitud);
        submissionData.append("centroMedico", formData.centroMedico);
        submissionData.append("patologia", formData.patologia);

        if (hasRepresentative) {
            if (!formData.nombreRepresentante || !formData.cedulaRepresentante) {
                setError(t("solicitudForm.errors.representativeRequired"));
                return;
            }

            try {
                // Verificar si la cédula del representante existe en el sistema
                const verifyRes = await authService.verificarCedula(formData.cedulaRepresentante);
                if (!verifyRes.success || (verifyRes.data && !verifyRes.data.exists)) {
                    throw new Error(t("solicitudForm.errors.representativeNotRegistered"));
                }
                // Ajustar si la respuesta es distinta
            } catch (err: any) {
                const msg = err.response?.data?.error?.message || err.response?.data?.message || err.message || t("solicitudForm.errors.networkCouldNotVerifyId");
                setError(`${t("solicitudForm.errors.representativeErrorPrefix")}: ${msg}`);
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
                nombre: t("solicitudForm.placeholders.applicantName"),
                cedula: t("solicitudForm.placeholders.identityDocument"),
                direccion: t("solicitudForm.placeholders.applicantAddress"),
                telefono: t("solicitudForm.placeholders.applicantPhone"),
                telefonoAdicional: t("solicitudForm.placeholders.applicantAltPhone"),
                centroMedico: t("solicitudForm.placeholders.medicalCenter"),
                patologia: t("solicitudForm.placeholders.pathology"),
                medicamento: t("solicitudForm.placeholders.medication"),
            },
            representante: {
                nombre: t("solicitudForm.placeholders.representativeName"),
                cedula: t("solicitudForm.placeholders.identityDocument"),
                telefonoAdicional: t("solicitudForm.placeholders.representativeAltPhone"),
                telefono: t("solicitudForm.placeholders.representativePhone"),
                relacion: t("solicitudForm.placeholders.relationshipWithApplicant"),
            },
        }
        : {
            solicitante: {
                nombre: t("solicitudForm.placeholders.fullName"),
                cedula: "000-0000000-0",
                direccion: t("solicitudForm.placeholders.fullAddress"),
                telefono: "(809) 000-0000",
                telefonoAdicional: "(809) 000-0000",
                centroMedico: t("solicitudForm.placeholders.centerName"),
                patologia: t("solicitudForm.placeholders.description"),
                medicamento: t("solicitudForm.placeholders.medication"),
            },
            representante: {
                nombre: t("solicitudForm.placeholders.fullName"),
                cedula: "000-0000000-0",
                telefonoAdicional: "(809) 000-0000",
                telefono: "(809) 000-0000",
                relacion: t("solicitudForm.placeholders.relationshipExample"),
            },
        };

    return (
        <div className={`w-full ${isEdit ? "" : "max-w-[1060px]"} mx-auto px-4 md:px-5 ${isEdit ? "py-0" : "py-3 md:py-5"} relative ${className}`}>
            {/* 1. Datos de Solicitante */}
            <section className={isEdit ? "mb-7" : "mb-9 md:mb-12"}>
                <div className="mb-4 md:mb-5 pb-2 border-b border-[#E8EDF3]">
                    <h2 className={`${SECTION_TITLE_STYLE} text-center md:text-left`}>
                        {t("solicitudForm.section.applicant")}
                    </h2>
                </div>


                <div className="flex flex-col lg:flex-row gap-6 md:gap-7">
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-6 md:gap-x-7 gap-y-3.5 md:gap-y-4">
                        <div className="space-y-2 md:space-y-3 lg:col-span-2">
                            <div className="flex items-center gap-2">
                                <Label className={LABEL_STYLE}>{t("solicitudForm.labels.requestType")}</Label>
                                <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                            </div>
                            <DropdownSelect
                                value={formData.codigoTipoSolicitud}
                                onChange={(value) => setFormData((prev) => ({ ...prev, codigoTipoSolicitud: value }))}
                                placeholder={t("solicitudForm.placeholders.selectRequestType")}
                                options={[
                                    { value: "PRIMERA_SOLICITUD", label: t("solicitudForm.requestType.first") },
                                    { value: "RENOVACION", label: t("solicitudForm.requestType.renewal") },
                                    { value: "CAMBIO", label: t("solicitudForm.requestType.change") },
                                    { value: "INCLUSIÓN", label: t("solicitudForm.requestType.inclusion") },
                                ]}
                                buttonClassName={`${INPUT_STYLE} w-full outline-none focus:ring-2 focus:ring-[#40C9DB]/30 transition-all ${!formData.codigoTipoSolicitud ? "text-gray-400" : "text-[#111827]"}`}
                            />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>{t("solicitudForm.labels.applicantName")}</Label>
                            <Input name="nombreSolicitante" value={formData.nombreSolicitante} readOnly className={`${INPUT_STYLE} bg-gray-100 cursor-not-allowed opacity-80`} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>{t("solicitudForm.labels.id")}</Label>
                            <Input name="cedulaSolicitante" value={formData.cedulaSolicitante} readOnly className={`${INPUT_STYLE} bg-gray-100 cursor-not-allowed opacity-80`} />
                        </div>
                        <div className="space-y-2 md:space-y-3 lg:col-span-2">
                            <Label className={LABEL_STYLE}>{t("solicitudForm.labels.address")}</Label>
                            <Input name="direccionSolicitante" value={formData.direccionSolicitante} onChange={handleInputChange} placeholder={placeholders.solicitante.direccion} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>{t("solicitudForm.labels.phone")}</Label>
                            <Input name="telefonoSolicitante" value={formData.telefonoSolicitante} onChange={handleInputChange} placeholder={placeholders.solicitante.telefono} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>{t("solicitudForm.labels.altPhone")}</Label>
                            <Input name="telefonoAdicionalSolicitante" value={formData.telefonoAdicionalSolicitante} onChange={handleInputChange} placeholder={placeholders.solicitante.telefonoAdicional} className={INPUT_STYLE} />
                        </div>

                        <div className="space-y-2 md:space-y-3">
                            <div className="flex items-center gap-2">
                                <Label className={LABEL_STYLE}>{t("solicitudForm.labels.medicalCenter")}</Label>
                                <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                            </div>
                            <Input required name="centroMedico" value={formData.centroMedico} onChange={handleInputChange} placeholder={placeholders.solicitante.centroMedico} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <div className="flex items-center gap-2">
                                <Label className={LABEL_STYLE}>{t("solicitudForm.labels.pathology")}</Label>
                                <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                            </div>
                            <Input required name="patologia" value={formData.patologia} onChange={handleInputChange} placeholder={placeholders.solicitante.patologia} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-4 lg:col-span-2">
                            <div className="flex items-center gap-2">
                                <Label className={LABEL_STYLE}>{t("solicitudForm.labels.medications")}</Label>
                                <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                            </div>
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
                                        className="h-[38px] w-[38px] md:h-[42px] md:w-[42px] flex items-center justify-center bg-[#E2E8F0] rounded-[10px] md:rounded-[12px] cursor-pointer hover:bg-[#cbd5e1] transition-colors flex-shrink-0"
                                        aria-label={index === 0 ? t("solicitudForm.addMedication") : t("solicitudForm.removeMedication")}
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
            <section className={isEdit ? "mb-7" : "mb-9 md:mb-12"}>
                <div className="mb-4 md:mb-5 pb-2 border-b border-[#E8EDF3]">
                    <h2 className={`${SECTION_TITLE_STYLE} text-center md:text-left`}>
                        {t("solicitudForm.section.representative")}
                    </h2>
                </div>

                <div className="mb-5">
                    <label className="w-full max-w-[900px] flex items-start gap-3 cursor-pointer bg-[#F8FAFC] px-4 py-3 rounded-[12px] border border-[#DCE5EE] hover:bg-[#F3F7FB] transition-colors">
                        <input
                            type="checkbox"
                            checked={hasRepresentative}
                            onChange={(e) => setHasRepresentative(e.target.checked)}
                            className="mt-0.5 w-4 h-4 accent-[#34A4B3] border-gray-300 rounded cursor-pointer"
                        />
                        <span className="flex flex-col">
                            <span className="font-['Poppins'] text-[#2D3748] font-medium text-[13px] md:text-[14px] leading-snug">
                                {t("solicitudForm.representativeQuestion")}
                            </span>
                            <span className="font-['Poppins'] text-[#718096] text-[11px] md:text-[12px]">
                                {t("solicitudForm.representativeHint")}
                            </span>
                        </span>
                    </label>
                </div>

                {hasRepresentative && (
                    <div className="bg-blue-50 border border-blue-200 rounded-[10px] p-3.5 mb-5 w-full">
                        <p className="text-blue-700 font-['Poppins'] text-[12px] md:text-[13px]">
                            <strong className="font-semibold">{t("solicitudForm.labels.important")}</strong> {t("solicitudForm.labels.representativeAccountHint")}
                        </p>
                    </div>
                )}

                {hasRepresentative && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-5 w-full animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>{t("solicitudForm.labels.representativeName")}</Label>
                            <Input name="nombreRepresentante" value={formData.nombreRepresentante} onChange={handleInputChange} placeholder={placeholders.representante.nombre} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>{t("solicitudForm.labels.id")}</Label>
                            <Input name="cedulaRepresentante" value={formData.cedulaRepresentante} onChange={handleInputChange} placeholder={placeholders.representante.cedula} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>{t("solicitudForm.labels.altPhone")}</Label>
                            <Input name="telefonoAdicionalRepresentante" value={formData.telefonoAdicionalRepresentante} onChange={handleInputChange} placeholder={placeholders.representante.telefonoAdicional} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3">
                            <Label className={LABEL_STYLE}>{t("solicitudForm.labels.phone")}</Label>
                            <Input name="telefonoRepresentante" value={formData.telefonoRepresentante} onChange={handleInputChange} placeholder={placeholders.representante.telefono} className={INPUT_STYLE} />
                        </div>
                        <div className="space-y-2 md:space-y-3 lg:col-span-2">
                            <Label className={LABEL_STYLE}>{t("solicitudForm.labels.relationshipWithApplicant")}</Label>
                            <Input name="relacionRepresentante" value={formData.relacionRepresentante} onChange={handleInputChange} placeholder={placeholders.representante.relacion} className={INPUT_STYLE} />
                        </div>
                    </div>
                )}
            </section>

            {/* 3. Documentos Requeridos */}
            <section className={isEdit ? "mb-7" : "mb-9 md:mb-12"}>
                <div className="mb-4 md:mb-5 pb-2 border-b border-[#E8EDF3]">
                    <h2 className={`${SECTION_TITLE_STYLE} text-center md:text-left`}>
                        {t("solicitudForm.section.documents")}
                    </h2>
                </div>

                <div className="flex flex-col gap-3 md:gap-4">
                    {REQUIRED_DOCUMENTS.map((doc, index) => (
                        <div
                            key={`document-${index}`}
                            className="flex flex-col gap-2.5 py-2.5 border-b border-[#F0F3F7] last:border-b-0 md:grid md:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] md:items-center md:gap-4"
                        >
                            <Label className={`${LABEL_STYLE} text-[13px] md:text-[14px] lg:text-[15px] max-w-[700px] leading-snug flex items-start gap-1`}>
                                {doc.label} {doc.required ? <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3 mt-1" /> : <span className="text-gray-400 text-sm font-normal mt-1">{t("solicitudForm.optional")}</span>}
                            </Label>
                            <div
                                onClick={() => triggerFileInput(index)}
                                className={`w-full md:w-full md:max-w-[320px] h-[42px] rounded-[10px] border flex items-center justify-between px-3.5 cursor-pointer transition-colors group ${files[index]
                                    ? 'bg-[#E6F4F1] border-[#34A4B3]'
                                    : 'bg-[#F8F7F7] border-[#DCD7D7] hover:bg-gray-50 hover:border-[#C7D2DF]'
                                    }`}
                            >
                                <span className={`text-[12px] md:text-[13px] truncate font-['Poppins'] ${files[index] ? 'text-[#34A4B3] font-medium' : 'text-gray-400 group-hover:text-gray-500'}`}>
                                    {files[index] ? files[index].name : t("solicitudForm.selectFile")}
                                </span>
                                {files[index] ? (
                                    <FileText className="w-4 h-4 text-[#34A4B3] flex-shrink-0" />
                                ) : (
                                    <Paperclip className="w-4 h-4 text-[#555555] flex-shrink-0" />
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
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mt-5 mb-10">
                <Button
                    type="button"
                    onClick={() => navigate('/historial-solicitudes')}
                    disabled={isSubmitLoading}
                    className="w-full sm:w-[160px] h-[44px] bg-white border-2 border-[#34A4B3] text-[#34A4B3] hover:bg-[#34A4B3] hover:text-white rounded-[12px] font-['Poppins'] font-medium text-[15px] transition-colors shadow-sm disabled:opacity-50"
                >
                    {t("solicitudForm.cancel")}
                </Button>
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitLoading}
                    className="w-full sm:w-[160px] h-[44px] bg-[#34A4B3] hover:bg-[#2d8f9c] text-white rounded-[12px] font-['Poppins'] font-medium text-[15px] shadow-md shadow-[#34A4B3]/25 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isSubmitLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                    ) : (
                        isEdit ? t("solicitudForm.save") : t("solicitudForm.confirm")
                    )}
                </Button>
            </div>

            <ConfirmationCard
                open={isSuccessModalOpen}
                title={t("solicitudForm.success.title")}
                highlight={t("solicitudForm.success.highlight")}
                description={t("solicitudForm.success.description")}
                descriptionHighlight={t("solicitudForm.success.descriptionHighlight")}
                buttonLabel={t("solicitudForm.success.buttonLabel")}
                onButtonClick={() => {
                    setIsSuccessModalOpen(false);
                    navigate('/historial-solicitudes');
                }}
            />

            <ErrorModal
                open={!!error}
                errorMsg={error || ""}
                onClose={() => setError(null)}
            />
        </div>
    );
};
