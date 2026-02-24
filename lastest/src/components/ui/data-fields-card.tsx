
import { DetailCard } from "./detail-card";
import { ReadOnlyInput } from "./readonly-input";

export interface DataFieldItem {
    label: string;
    value: string;
    fullWidth?: boolean;
}

interface DataFieldsCardProps {
    title: string;
    fields: DataFieldItem[];
    className?: string;
}

/**
 * Tarjeta reutilizable para mostrar bloques de datos en formato label/valor
 * (ej: Datos del Solicitante, Datos de Representante).
 */
export const DataFieldsCard = ({ title, fields, className = "" }: DataFieldsCardProps) => {
    return (
        <DetailCard title={title} className={className}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {fields.map(({ label, value, fullWidth }) => (
                    <div
                        key={label}
                        className={fullWidth ? "md:col-span-2" : ""}
                    >
                        <ReadOnlyInput label={label} value={value} />
                    </div>
                ))}
            </div>
        </DetailCard>
    );
};
