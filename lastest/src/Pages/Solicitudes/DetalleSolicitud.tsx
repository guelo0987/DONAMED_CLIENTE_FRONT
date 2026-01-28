import { Info, FileText, Edit } from "lucide-react";
import { MainLayout } from "../../components/layout/MainLayout";
import { DetailCard } from "../../components/ui/detail-card";
import { ReadOnlyInput } from "../../components/ui/readonly-input";

export const DetalleSolicitud = () => {
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
                    <button className="flex items-center justify-center gap-3 px-8 py-3 bg-[#F3F4F6] rounded-[10px] min-w-fit transition-colors w-full md:w-auto">
                        <Info className="w-5 h-5 text-[#2D3748]" />
                        <span className="font-['Poppins'] font-semibold text-[#2D3748] text-[15px]">Información de Solicitud</span>
                    </button>

                    <button className="flex items-center justify-center gap-3 px-8 py-3 hover:bg-gray-50 rounded-[10px] min-w-fit transition-colors text-[#9CA3AF] w-full md:w-auto">
                        <FileText className="w-5 h-5" />
                        <span className="font-['Poppins'] font-medium text-[15px]">Datos de Solicitante</span>
                    </button>

                    <button className="flex items-center justify-center gap-3 px-8 py-3 hover:bg-gray-50 rounded-[10px] min-w-fit transition-colors text-[#9CA3AF] w-full md:w-auto">
                        <Edit className="w-5 h-5" />
                        <span className="font-['Poppins'] font-medium text-[15px]">Editar Solicitud</span>
                    </button>
                </div>

                {/* Content Grid */}
                <div className="flex flex-col gap-6">

                    {/* Main Info Card */}
                    <DetailCard title="Información de Solicitud">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <ReadOnlyInput label="ID de Solicitud" value="S-2025119" />
                            <ReadOnlyInput label="Fecha de Creación" value="20 de noviembre de 2025" />
                            <ReadOnlyInput label="Documentos Adjuntos" value="2 archivos cargados" />
                            <ReadOnlyInput label="Estado" value="Pendiente" />
                        </div>
                    </DetailCard>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Medications Card */}
                        <DetailCard title="Medicamentos Solicitados" className="h-full">
                            <div className="flex flex-col gap-4">
                                <ReadOnlyInput value="Adalimumab 40 mg" />
                                <ReadOnlyInput value="Trastuzumab 440 mg" />
                                <ReadOnlyInput value="Ivacaftor 150 mg" />
                            </div>
                        </DetailCard>

                        {/* Observation Card */}
                        <DetailCard title="Observación" className="h-full">
                            <ReadOnlyInput
                                value="Pendiente"
                                multiline
                                className="h-full"
                            />
                        </DetailCard>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};
