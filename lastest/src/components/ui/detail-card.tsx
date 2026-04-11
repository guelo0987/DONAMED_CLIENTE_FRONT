import React from "react";

interface DetailCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export const DetailCard = ({ title, children, className = "" }: DetailCardProps) => {
    return (
        <div className={`bg-white rounded-[12px] p-5 sm:p-6 shadow-sm border border-gray-100 ${className}`}>
            <h2 className="font-['Poppins'] font-medium text-[#2D3748] text-[18px] mb-1">
                {title}
            </h2>
            <p className="font-['Poppins'] font-medium text-[#40C9DB] text-[12px] mb-5">
                Esta información es oficial
            </p>
            {children}
        </div>
    );
};
