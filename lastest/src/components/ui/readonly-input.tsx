

interface ReadOnlyInputProps {
    label?: string;
    value: string;
    multiline?: boolean;
    className?: string;
}

export const ReadOnlyInput = ({ label, value, multiline = false, className = "" }: ReadOnlyInputProps) => {
    return (
        <div className={`space-y-2 ${className}`}>
            {label && (
                <label className="font-['Poppins'] font-medium text-[#2D3748] text-[14px] md:text-[15px]">
                    {label}
                </label>
            )}
            {multiline ? (
                <div className="w-full min-h-[130px] bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] px-5 py-3.5 font-['Poppins'] text-[#9A9A9A] text-[14px] whitespace-pre-wrap">
                    {value}
                </div>
            ) : (
                <div className="w-full bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] px-5 py-3 font-['Poppins'] text-[#9A9A9A] text-[14px] truncate">
                    {value}
                </div>
            )}
        </div>
    );
};
