import { useState } from "react";
import { Info, FileText, Edit } from "lucide-react";
import { MainLayout } from "../../components/layout/MainLayout";
import { DetailCard } from "../../components/ui/detail-card";
import { ReadOnlyInput } from "../../components/ui/readonly-input";
import { DataFieldsCard } from "../../components/ui/data-fields-card";
import { SolicitudForm } from "./SolicitudForm";

type TabId = "informacion" | "datos-solicitante" | "editar";

const TAB_CONFIG: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "informacion", label: "Información de Solicitud", icon: <Info className="w-5 h-5" /> },
    { id: "datos-solicitante", label: "Datos de Solicitante", icon: <FileText className="w-5 h-5" /> },
    { id: "editar", label: "Editar Solicitud", icon: <Edit className="w-5 h-5" /> },
];

// Datos de ejemplo (luego vendrán del estado/API)
const DATOS_SOLICITANTE = [
    { label: "Nombre del Solicitante", value: "Maria Corporan" },
    { label: "Cédula", value: "402-2895760-6" },
    { label: "Dirección", value: "Arco del Triunfo, calle primera, Distrito Nacional", fullWidth: true },
    { label: "Teléfono", value: "402-2895760-6" },
    { label: "Correo Electronico", value: "MariaCorporan895@gmail.com", fullWidth: true },
];

const DATOS_REPRESENTANTE = [
    { label: "Nombre del Representante", value: "Maria Corporan" },
    { label: "Cédula", value: "402-2895760-6" },
    { label: "Teléfono", value: "809-569-9636" },
    { label: "Relación", value: "Padre" },
];

export const DetalleSolicitud = () => {
    const [activeTab, setActiveTab] = useState<TabId>("informacion");

    return (
        <MainLayout>
            <div className="max-w-[1400px] mx-auto px-4 py-8 lg:py-12 w-full">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex flex-col gap-3">
                        {/* Status Badge */}
                        <div className="w-fit flex items-center gap-2 bg-[#F3F4F6] px-4 py-1.5 rounded-full">
                            <div className="w-3 h-3 rounded-full bg-[#EAB308]"></div>
                            <span className="font-['Poppins'] font-medium text-[#4B5563] text-sm">Pendiente</span>
                        </div>
                        <h1 className="font-['Poppins'] font-medium text-[#2D3748] text-[28px] md:text-[32px]">
                            Detalles de Solicitud
                        </h1>
                    </div>

                    <button className="bg-[#34A4B3] hover:bg-[#2B93A1] text-white px-6 py-3 rounded-[10px] font-['Poppins'] font-medium transition-colors w-full md:w-auto">
                        Cancelar Solicitud
                    </button>
                </div>

                {/* Tabs Navigation */}
                <div className="bg-white rounded-[15px] p-2 mb-8 flex flex-col md:flex-row gap-2 shadow-sm border border-gray-100 overflow-x-auto">
                    {TAB_CONFIG.map(({ id, label, icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setActiveTab(id)}
                            className={`flex items-center justify-center gap-3 px-8 py-3 rounded-[10px] min-w-fit transition-colors w-full md:w-auto ${
                                activeTab === id
                                    ? "bg-[#F3F4F6] text-[#2D3748]"
                                    : "hover:bg-gray-50 text-[#9CA3AF]"
                            }`}
                        >
                            {icon}
                            <span className={`font-['Poppins'] text-[15px] ${activeTab === id ? "font-semibold" : "font-medium"}`}>
                                {label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Content by tab */}
                {activeTab === "informacion" && (
                    <div className="flex flex-col gap-6">
                        <DetailCard title="Información de Solicitud">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <ReadOnlyInput label="ID de Solicitud" value="S-2025119" />
                                <ReadOnlyInput label="Fecha de Creación" value="20 de noviembre de 2025" />
                                <ReadOnlyInput label="Documentos Adjuntos" value="2 archivos cargados" />
                                <ReadOnlyInput label="Estado" value="Pendiente" />
                            </div>
                        </DetailCard>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <DetailCard title="Medicamentos Solicitados" className="h-full">
                                <div className="flex flex-col gap-4">
                                    <ReadOnlyInput value="Adalimumab 40 mg" />
                                    <ReadOnlyInput value="Trastuzumab 440 mg" />
                                    <ReadOnlyInput value="Ivacaftor 150 mg" />
                                </div>
                            </DetailCard>

                            <DetailCard title="Observación" className="h-full">
                                <ReadOnlyInput
                                    value="Pendiente"
                                    multiline
                                    className="h-full"
                                />
                            </DetailCard>
                        </div>
                    </div>
                )}

                {activeTab === "datos-solicitante" && (
                    <div className="flex flex-col gap-6">
                        <DataFieldsCard title="Datos del Solicitante" fields={DATOS_SOLICITANTE} />
                        <DataFieldsCard title="Datos de Representante" fields={DATOS_REPRESENTANTE} />
                    </div>
                )}

                {activeTab === "editar" && (
                    <div className="flex flex-col gap-6">
                        <SolicitudForm mode="edit" />
                    </div>
                )}
            </div>
        </MainLayout>
    );
};
