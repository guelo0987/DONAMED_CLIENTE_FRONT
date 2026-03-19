import { useState, useEffect, useRef } from "react";
import type { ChangeEvent } from "react";
import { Info, FileText, Edit, Loader2, ArrowLeft, Trash2, Plus, Paperclip, AlertTriangle } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "../../components/layout/MainLayout";
import { DetailCard } from "../../components/ui/detail-card";
import { ReadOnlyInput } from "../../components/ui/readonly-input";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/buttons";
import { useSolicitudes } from "../../hooks/useSolicitudes";
import { useAuth } from "../../hooks/useAuth";
import { ConfirmationCard } from "../../components/ui/confirmation-card";
import type { SolicitudDetalle, EstadoSolicitud } from "../../types/solicitud";
import type { UserProfile } from "../../types/user";
import { getStoragePublicUrl } from "../../utils/storageUrl";

type TabId = "informacion" | "datos-solicitante" | "editar";

const MAX_DOC_SIZE_MB = 10;
const MAX_DOC_SIZE_BYTES = MAX_DOC_SIZE_MB * 1024 * 1024;

const INPUT_STYLE =
    "h-[46px] md:h-[50px] bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] md:rounded-[12px] px-5 text-[14px] md:text-[15px] font-['Poppins']";
const LABEL_STYLE =
    "font-['Poppins'] font-medium text-[#404040] text-[14px] md:text-[15px]";

const STATUS_COLORS: Record<EstadoSolicitud, string> = {
    PENDIENTE: "bg-[#EAB308]",
    EN_REVISION: "bg-blue-500",
    APROBADA: "bg-green-500",
    RECHAZADA: "bg-red-500",
    DESPACHADA: "bg-purple-500",
    CANCELADA: "bg-gray-500",
    INCOMPLETA: "bg-orange-500",
};

const STATUS_LABELS: Record<EstadoSolicitud, string> = {
    PENDIENTE: "Pendiente",
    EN_REVISION: "En Revisión",
    APROBADA: "Aprobada",
    RECHAZADA: "Rechazada",
    DESPACHADA: "Despachada",
    CANCELADA: "Cancelada",
    INCOMPLETA: "Incompleta"
};

function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export const DetalleSolicitud = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        fetchDetalle, cancelarSolicitud, editarSolicitud, confirmarSolicitud,
        eliminarDocumento, agregarDocumentos, isLoading, error
    } = useSolicitudes();
    const { fetchProfile } = useAuth();

    const [solicitud, setSolicitud] = useState<SolicitudDetalle | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [activeTab, setActiveTab] = useState<TabId>("informacion");
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    // Editable form state
    const [editForm, setEditForm] = useState({
        centroMedico: "",
        patologia: "",
        cedularepresentante: "",
        relacion_solicitante: "",
    });
    const [editMedications, setEditMedications] = useState<{ id: number; nombre: string }[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editError, setEditError] = useState<string | null>(null);
    const [deletingDocId, setDeletingDocId] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const loadDetalle = async () => {
                const data = await fetchDetalle(parseInt(id, 10));
                if (data) {
                    setSolicitud(data);
                    setEditForm({
                        centroMedico: data.centroMedico || "",
                        patologia: data.patologia || "",
                        cedularepresentante: data.cedularepresentante || "",
                        relacion_solicitante: data.relacion_solicitante || "",
                    });
                    setEditMedications(data.medicamento_solicitado.map(m => ({ id: m.id, nombre: m.nombre })));
                }
            };
            loadDetalle();
        }
        const loadProfile = async () => {
            const data = await fetchProfile();
            if (data) setProfile(data);
        };
        loadProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleEditChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleCancelar = async () => {
        if (!solicitud) return;
        setIsCancelling(true);
        const success = await cancelarSolicitud(solicitud.numerosolicitud);
        setIsCancelling(false);
        if (success) {
            setIsCancelModalOpen(false);
            navigate('/historial-solicitudes');
        }
    };

    const handleDeleteDocument = async (docId: string) => {
        if (!solicitud) return;
        setDeletingDocId(docId);
        const success = await eliminarDocumento(solicitud.numerosolicitud, docId);
        if (success) {
            setSolicitud(prev => prev ? {
                ...prev,
                documentos: prev.documentos.filter(d => d.id !== docId)
            } : null);
        }
        setDeletingDocId(null);
    };

    const handleAddFiles = (e: ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files;
        if (!fileList) return;
        const validFiles: File[] = [];
        for (let i = 0; i < fileList.length; i++) {
            if (fileList[i].size > MAX_DOC_SIZE_BYTES) {
                setEditError(`El archivo "${fileList[i].name}" excede el límite de ${MAX_DOC_SIZE_MB} MB.`);
                continue;
            }
            validFiles.push(fileList[i]);
        }
        setNewFiles(prev => [...prev, ...validFiles]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleRemoveNewFile = (index: number) => {
        setNewFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleGuardarYConfirmar = async () => {
        if (!solicitud) return;
        setIsSubmitting(true);
        setEditError(null);

        try {
            // Paso 1: Editar campos cambiados
            const editData: Record<string, string | undefined> = {};
            if (editForm.centroMedico !== solicitud.centroMedico) editData.centroMedico = editForm.centroMedico;
            if (editForm.patologia !== solicitud.patologia) editData.patologia = editForm.patologia;
            if (editForm.cedularepresentante !== (solicitud.cedularepresentante || "")) editData.cedularepresentante = editForm.cedularepresentante || undefined;
            if (editForm.relacion_solicitante !== (solicitud.relacion_solicitante || "")) editData.relacion_solicitante = editForm.relacion_solicitante || undefined;

            if (Object.keys(editData).length > 0) {
                const edited = await editarSolicitud(solicitud.numerosolicitud, editData);
                if (!edited) {
                    setEditError("Error guardando los cambios.");
                    setIsSubmitting(false);
                    return;
                }
            }

            // Paso 2: Subir nuevos documentos si hay
            if (newFiles.length > 0) {
                const formData = new FormData();
                newFiles.forEach(file => formData.append("documentos", file));
                const docsUploaded = await agregarDocumentos(solicitud.numerosolicitud, formData);
                if (!docsUploaded) {
                    setEditError("Error subiendo documentos nuevos.");
                    setIsSubmitting(false);
                    return;
                }
            }

            // Paso 3: Confirmar (PENDIENTE → EN_REVISION)
            const confirmed = await confirmarSolicitud(solicitud.numerosolicitud);
            if (confirmed) {
                setIsConfirmModalOpen(true);
            } else {
                setEditError("Error al confirmar la solicitud.");
            }
        } catch {
            setEditError("Error inesperado al guardar.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Tabs dinámicos
    const tabsConfig = [
        { id: "informacion" as TabId, label: "Información de Solicitud", icon: <Info className="w-4 h-4" /> },
        { id: "datos-solicitante" as TabId, label: "Datos de Solicitante", icon: <FileText className="w-4 h-4" /> }
    ];
    if (solicitud?.estado === 'PENDIENTE') {
        tabsConfig.push({ id: "editar" as TabId, label: "Editar Solicitud", icon: <Edit className="w-4 h-4" /> });
    }

    if (isLoading && !solicitud) {
        return (
            <MainLayout>
                <div className="w-full h-[60vh] flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-[#34A4B3] mb-4" />
                    <p className="text-gray-500 font-['Poppins']">Cargando detalles de solicitud...</p>
                </div>
            </MainLayout>
        );
    }

    if (error && !solicitud) {
        return (
            <MainLayout>
                <div className="w-full max-w-[1060px] mx-auto px-4 sm:px-5 md:px-6 lg:px-7 py-10 text-center">
                    <h2 className="text-2xl text-red-600 font-bold mb-4">Error</h2>
                    <p className="text-gray-600 mb-6">{error || "No se encontró la solicitud"}</p>
                    <button onClick={() => navigate('/historial-solicitudes')} className="bg-[#34A4B3] text-white px-6 py-2 rounded-lg font-['Poppins']">Volver al Historial</button>
                </div>
            </MainLayout>
        );
    }

    if (!solicitud) return null;

    const solicitanteNombre = profile ? `${profile.persona.nombre} ${profile.persona.apellidos}` : "Cargando...";
    const solicitanteCedula = profile?.cedula_usuario || "";
    const solicitanteDireccion = profile?.persona.direccion || "";
    const solicitanteTelefono = profile?.persona.telefono || "";
    const solicitanteCorreo = profile?.correo || "";

    return (
        <MainLayout>
            <div className="max-w-[1060px] mx-auto px-4 sm:px-5 md:px-6 lg:px-7 py-6 lg:py-8 w-full">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
                    <div className="flex flex-col gap-2.5">
                        <button onClick={() => navigate('/historial-solicitudes')} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors w-fit mb-1">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="font-['Poppins'] text-sm">Volver al historial</span>
                        </button>
                        <div className="w-fit flex items-center gap-2 bg-[#F3F4F6] px-3.5 py-1.5 rounded-full">
                            <div className={`w-2.5 h-2.5 rounded-full ${STATUS_COLORS[solicitud.estado]}`}></div>
                            <span className="font-['Poppins'] font-medium text-[#4B5563] text-[13px]">{STATUS_LABELS[solicitud.estado]}</span>
                        </div>
                        <h1 className="font-['Poppins'] font-medium text-[#2D3748] text-[24px] md:text-[28px]">Detalles de Solicitud</h1>
                    </div>
                    {solicitud.estado === 'PENDIENTE' && (
                        <button onClick={() => setIsCancelModalOpen(true)} className="bg-[#34A4B3] hover:bg-[#2B93A1] text-white px-5 py-2.5 rounded-[10px] font-['Poppins'] text-[14px] font-medium transition-colors w-full md:w-auto">
                            Cancelar Solicitud
                        </button>
                    )}
                </div>

                {/* Aviso PENDIENTE */}
                {solicitud.estado === 'PENDIENTE' && (
                    <div className="flex items-start gap-3 bg-[#FEF9C3] border border-[#EAB308]/30 rounded-[12px] p-3.5 mb-6">
                        <AlertTriangle className="w-4.5 h-4.5 text-[#CA8A04] flex-shrink-0 mt-0.5" />
                        <div className="font-['Poppins']">
                            <p className="text-[#854D0E] font-medium text-[13px]">
                                Esta solicitud está pendiente de confirmación.
                            </p>
                            <p className="text-[#A16207] text-[12px] mt-1">
                                Mientras esté en estado <strong>Pendiente</strong>, puede editar los datos, documentos y medicamentos en la pestaña "Editar Solicitud". Al confirmar, será enviada para revisión por el administrador.
                            </p>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="bg-white rounded-[12px] p-1.5 mb-6 flex flex-col md:flex-row gap-1.5 shadow-sm border border-gray-100 overflow-x-auto">
                    {tabsConfig.map(({ id, label, icon }) => (
                        <button key={id} type="button" onClick={() => setActiveTab(id)}
                            className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-[10px] min-w-fit transition-colors w-full md:w-auto ${activeTab === id ? "bg-[#F3F4F6] text-[#2D3748]" : "hover:bg-gray-50 text-[#9CA3AF]"}`}>
                            {icon}
                            <span className={`font-['Poppins'] text-[14px] ${activeTab === id ? "font-semibold" : "font-medium"}`}>{label}</span>
                        </button>
                    ))}
                </div>

                {/* ====== TAB: Información ====== */}
                {activeTab === "informacion" && (
                    <div className="flex flex-col gap-5">
                        <DetailCard title="Información de Solicitud">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <ReadOnlyInput label="Tipo de Solicitud" value={solicitud.tipoSolicitud.descripcion} />
                                <ReadOnlyInput label="Estado" value={STATUS_LABELS[solicitud.estado]} />
                                <ReadOnlyInput label="Fecha de Creación" value={solicitud.creada_en ? new Date(solicitud.creada_en).toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"} />
                                <ReadOnlyInput label="Última Actualización" value={solicitud.actualizado_en ? new Date(solicitud.actualizado_en).toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"} />
                                <ReadOnlyInput label="Centro Médico" value={solicitud.centroMedico} />
                                <ReadOnlyInput label="Patología" value={solicitud.patologia} />
                            </div>
                        </DetailCard>
                        {solicitud.almacen_retiro && (
                            <DetailCard title="Lugar de Retiro Asignado">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                    <ReadOnlyInput label="Almacén" value={solicitud.almacen_retiro.nombre} />
                                    <ReadOnlyInput label="Dirección" value={solicitud.almacen_retiro.direccion} />
                                    <ReadOnlyInput label="Teléfono" value={solicitud.almacen_retiro.telefono} />
                                    <ReadOnlyInput label="Ciudad" value={solicitud.almacen_retiro.ciudad.nombre} />
                                </div>
                            </DetailCard>
                        )}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <DetailCard title="Medicamentos Solicitados" className="h-full">
                                <div className="flex flex-col gap-4">
                                    {solicitud.medicamento_solicitado.length > 0 ? solicitud.medicamento_solicitado.map(med => (
                                        <ReadOnlyInput key={med.id} value={med.nombre} />
                                    )) : <p className="text-gray-500 italic font-['Poppins']">No hay medicamentos especificados.</p>}
                                </div>
                            </DetailCard>
                            <DetailCard title="Observaciones" className="h-full">
                                <ReadOnlyInput value={solicitud.observaciones || "Sin observaciones al momento."} multiline className="h-full" />
                            </DetailCard>
                        </div>
                        <DetailCard title="Documentos Adjuntos">
                            <div className="flex flex-col gap-3">
                                {solicitud.documentos.length > 0 ? solicitud.documentos.map(doc => (
                                    <a key={doc.id} href={getStoragePublicUrl(doc.url) || doc.url} target="_blank" rel="noreferrer"
                                        className="inline-flex items-center justify-between w-full h-[46px] bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] px-4 cursor-pointer hover:bg-gray-50 hover:border-[#34A4B3] transition-colors">
                                        <span className="text-gray-600 truncate font-['Poppins'] text-sm">{doc.nombre}</span>
                                        <FileText className="w-4.5 h-4.5 text-[#34A4B3] flex-shrink-0" />
                                    </a>
                                )) : <p className="text-gray-500 italic font-['Poppins']">No hay documentos adjuntos.</p>}
                            </div>
                        </DetailCard>
                    </div>
                )}

                {/* ====== TAB: Datos de Solicitante ====== */}
                {activeTab === "datos-solicitante" && (
                    <div className="flex flex-col gap-5">
                        <DetailCard title="Datos del Solicitante">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <ReadOnlyInput label="Nombre del Solicitante" value={solicitanteNombre} />
                                <ReadOnlyInput label="Cédula" value={solicitanteCedula} />
                                <div className="md:col-span-2"><ReadOnlyInput label="Dirección" value={solicitanteDireccion} /></div>
                                <ReadOnlyInput label="Teléfono" value={solicitanteTelefono} />
                                <ReadOnlyInput label="Correo Electrónico" value={solicitanteCorreo} />
                            </div>
                        </DetailCard>
                        {solicitud.representante && (
                            <DetailCard title="Datos de Representante">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                    <ReadOnlyInput label="Nombre del Representante" value={`${solicitud.representante.nombre} ${solicitud.representante.apellidos}`} />
                                    <ReadOnlyInput label="Cédula" value={solicitud.representante.cedula} />
                                    <ReadOnlyInput label="Teléfono" value={solicitud.representante.telefono} />
                                    <ReadOnlyInput label="Relación" value={solicitud.relacion_solicitante || "N/A"} />
                                </div>
                            </DetailCard>
                        )}
                    </div>
                )}

                {/* ====== TAB: Editar Solicitud ====== */}
                {activeTab === "editar" && solicitud.estado === 'PENDIENTE' && (
                    <div className="flex flex-col gap-5">
                        {/* Datos del Solicitante (read-only) */}
                        <DetailCard title="Datos de Solicitante">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <ReadOnlyInput label="Nombre del Solicitante" value={solicitanteNombre} />
                                <ReadOnlyInput label="Cédula" value={solicitanteCedula} />
                                <div className="md:col-span-2"><ReadOnlyInput label="Dirección" value={solicitanteDireccion} /></div>
                                <ReadOnlyInput label="Teléfono" value={solicitanteTelefono} />
                                <ReadOnlyInput label="Correo Electrónico" value={solicitanteCorreo} />
                            </div>
                        </DetailCard>

                        {/* Campos editables */}
                        <DetailCard title="Información de la Solicitud">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <div className="space-y-2">
                                    <Label className={LABEL_STYLE}>Centro Médico</Label>
                                    <Input name="centroMedico" value={editForm.centroMedico} onChange={handleEditChange} className={INPUT_STYLE} />
                                </div>
                                <div className="space-y-2">
                                    <Label className={LABEL_STYLE}>Patología</Label>
                                    <Input name="patologia" value={editForm.patologia} onChange={handleEditChange} className={INPUT_STYLE} />
                                </div>
                            </div>
                        </DetailCard>

                        {/* Medicamentos Solicitados (editable) */}
                        <DetailCard title="Medicamentos Solicitados">
                            <div className="flex flex-col gap-4">
                                {editMedications.map((med, index) => (
                                    <div key={med.id} className="flex items-center gap-3">
                                        <Input
                                            value={med.nombre}
                                            onChange={(e) => {
                                                const updated = [...editMedications];
                                                updated[index] = { ...updated[index], nombre: e.target.value };
                                                setEditMedications(updated);
                                            }}
                                            className={INPUT_STYLE + " flex-1"}
                                        />
                                        {editMedications.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => setEditMedications(prev => prev.filter((_, i) => i !== index))}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Quitar medicamento"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setEditMedications(prev => [...prev, { id: Date.now(), nombre: "" }])}
                                    className="flex items-center gap-2 text-[#34A4B3] hover:text-[#2B93A1] font-['Poppins'] font-medium text-sm w-fit"
                                >
                                    <Plus className="w-4 h-4" /> Agregar medicamento
                                </button>
                            </div>
                        </DetailCard>

                        {/* Representante */}
                        <DetailCard title="Datos de Representante">
                            <div className="bg-blue-50 border border-blue-200 rounded-[10px] p-3 mb-5">
                                <p className="text-blue-700 font-['Poppins'] text-[12px]">
                                    <strong>Nota:</strong> El representante legal debe tener una cuenta creada en DONAMED. Ingrese la cédula con la que se registró.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                <div className="space-y-2">
                                    <Label className={LABEL_STYLE}>Cédula del Representante</Label>
                                    <Input name="cedularepresentante" value={editForm.cedularepresentante} onChange={handleEditChange} placeholder="Cédula registrada en DONAMED" className={INPUT_STYLE} />
                                </div>
                                <div className="space-y-2">
                                    <Label className={LABEL_STYLE}>Relación con el Solicitante</Label>
                                    <Input name="relacion_solicitante" value={editForm.relacion_solicitante} onChange={handleEditChange} placeholder="Ej: Padre, Madre, Tutor" className={INPUT_STYLE} />
                                </div>
                            </div>
                        </DetailCard>

                        {/* Documentos */}
                        <DetailCard title="Documentos Requeridos">
                            <p className="text-gray-400 font-['Poppins'] text-[12px] mb-4">
                                Formatos permitidos: PDF, JPEG, PNG, DOC, DOCX • Tamaño máximo por archivo: {MAX_DOC_SIZE_MB} MB
                            </p>

                            {/* Documentos existentes */}
                            {solicitud.documentos.length > 0 && (
                                <div className="flex flex-col gap-3 mb-4">
                                    {solicitud.documentos.map(doc => (
                                        <div key={doc.id} className="flex items-center justify-between w-full bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] px-4 py-3 group">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <FileText className="w-4.5 h-4.5 text-[#34A4B3] flex-shrink-0" />
                                                <div className="flex flex-col min-w-0">
                                                    <a href={getStoragePublicUrl(doc.url) || doc.url} target="_blank" rel="noreferrer"
                                                        className="text-gray-700 truncate font-['Poppins'] text-sm hover:text-[#34A4B3] transition-colors">
                                                        {doc.nombre}
                                                    </a>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteDocument(doc.id)}
                                                disabled={deletingDocId === doc.id}
                                                className="ml-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                                title="Eliminar documento"
                                            >
                                                {deletingDocId === doc.id
                                                    ? <Loader2 className="w-4 h-4 animate-spin" />
                                                    : <Trash2 className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Nuevos archivos agregados */}
                            {newFiles.length > 0 && (
                                <div className="flex flex-col gap-3 mb-4">
                                    <p className="text-gray-500 font-['Poppins'] text-[13px] font-medium">Nuevos archivos a subir:</p>
                                    {newFiles.map((file, index) => (
                                        <div key={`new-${index}`} className="flex items-center justify-between w-full bg-[#E6F4F1] border border-[#34A4B3]/30 rounded-[10px] px-4 py-3">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <Paperclip className="w-4.5 h-4.5 text-[#34A4B3] flex-shrink-0" />
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-gray-700 truncate font-['Poppins'] text-sm">{file.name}</span>
                                                    <span className="text-gray-400 font-['Poppins'] text-[11px]">{formatFileSize(file.size)}</span>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveNewFile(index)}
                                                className="ml-3 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                                                title="Quitar archivo"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Botón agregar documentos */}
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 text-[#34A4B3] hover:text-[#2B93A1] font-['Poppins'] font-medium text-sm w-fit"
                            >
                                <Plus className="w-4 h-4" /> Agregar documento
                            </button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleAddFiles}
                                accept=".pdf,.jpeg,.jpg,.png,.doc,.docx"
                                multiple
                                className="hidden"
                            />
                        </DetailCard>

                        {/* Error */}
                        {editError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[10px] font-['Poppins'] text-sm">
                                {editError}
                            </div>
                        )}

                        {/* Botones */}
                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-3 mb-6">
                            <Button
                                type="button"
                                onClick={() => setActiveTab("informacion")}
                                className="w-full sm:w-[150px] h-[44px] bg-white border-2 border-[#34A4B3] text-[#34A4B3] hover:bg-[#34A4B3] hover:text-white rounded-[12px] text-[13px] font-medium font-['Poppins'] transition-all"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="button"
                                onClick={handleGuardarYConfirmar}
                                disabled={isSubmitting}
                                className="w-full sm:w-[150px] h-[44px] bg-[#34A4B3] hover:bg-[#2B93A1] rounded-[12px] text-white text-[13px] font-medium font-['Poppins'] shadow-lg shadow-[#34A4B3]/20 transition-all disabled:opacity-50"
                            >
                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Confirmar"}
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de Cancelación */}
            <ConfirmationCard
                open={isCancelModalOpen}
                title="¿Está seguro de que quiere"
                highlight="cancelar esta solicitud?"
                description="Esta acción no se puede deshacer. La solicitud será"
                descriptionHighlight="cancelada permanentemente."
                buttonLabel={isCancelling ? "Cancelando..." : "Sí, cancelar"}
                onButtonClick={handleCancelar}
                secondaryLabel="No"
                onSecondaryClick={() => setIsCancelModalOpen(false)}
            />

            {/* Modal de Confirmación Exitosa */}
            <ConfirmationCard
                open={isConfirmModalOpen}
                title="Su solicitud ha sido confirmada"
                highlight="exitosamente"
                description="Su solicitud fue enviada para revisión. Recibirá un correo cuando sea"
                descriptionHighlight="aprobada."
                buttonLabel="Ir al Historial"
                onButtonClick={() => { setIsConfirmModalOpen(false); navigate('/historial-solicitudes'); }}
            />
        </MainLayout>
    );
};
