// Request item component for Historial de Solicitudes
export interface RequestItemProps {
    date: string;
    medication: string;
    status: string;
}

export const RequestItem = ({ date, medication, status }: RequestItemProps) => {
    return (
        <div className="bg-white rounded-[15px] p-4 flex items-center gap-4 shadow-sm">
            {/* Medicine Icon */}
            <div className="w-[46px] h-[45px] bg-[#34A4B3]/20 rounded-[15px] flex items-center justify-center flex-shrink-0">
                <img
                    src="/medicines/historial.png"
                    alt="Medicine"
                    className="w-[37px] h-[36px] object-contain"
                />
            </div>

            {/* Date */}
            <div className="flex flex-col min-w-[68px]">
                <span className="text-[#2D3748] font-medium text-[13px] font-['Inter']">
                    Fecha
                </span>
                <span className="text-[#232323] text-[12px] font-['Inter']">{date}</span>
            </div>

            {/* Medication */}
            <div className="flex flex-col min-w-[90px]">
                <span className="text-[#232323] font-medium text-[13px] font-['Inter']">
                    Medicamento
                </span>
                <span className="text-[#2D3748] text-[12px] font-['Inter']">
                    {medication}
                </span>
            </div>

            {/* Status */}
            <div className="flex flex-col ml-auto min-w-[65px]">
                <span className="text-[#232323] font-medium text-[13px] font-['Inter']">
                    Estado
                </span>
                <span className="text-[#2D3748] text-[12px] font-['Inter']">{status}</span>
            </div>

            {/* Arrow Icon */}
            <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.5 2.25L8.25 6L4.5 9.75"
                        stroke="#5F6368"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
};

// Historial de Solicitudes Card Component
interface HistorialSolicitudesCardProps {
    requests: RequestItemProps[];
    showDivider?: boolean;
}

export const HistorialSolicitudesCard = ({
    requests,
    showDivider = true,
}: HistorialSolicitudesCardProps) => {
    return (
        <div className="w-full xl:w-[527px] bg-[#F0F0F0]/45 rounded-[17px] p-6 min-h-[358px]">
            {/* Header */}
            <h3 className="text-[#2D3748] text-xl font-medium mb-4 font-['Poppins']">
                Historial de Solicitudes
            </h3>

            {/* Divider */}
            {showDivider && (
                <div className="w-full h-px bg-[#404040] opacity-50 mb-6"></div>
            )}

            {/* Request Items */}
            <div className="flex flex-col gap-4">
                {requests.map((request, index) => (
                    <RequestItem
                        key={index}
                        date={request.date}
                        medication={request.medication}
                        status={request.status}
                    />
                ))}
            </div>
        </div>
    );
};

export default HistorialSolicitudesCard;
