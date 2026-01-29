import { Link } from "react-router-dom";
import { Button } from "./buttons";

interface ConfirmationCardProps {
    open?: boolean;
    title: string;
    highlight: string;
    buttonLabel: string;
    to?: string;
    onButtonClick?: () => void;
    className?: string;
    overlayClassName?: string;
}

export const ConfirmationCard = ({
    open = true,
    title,
    highlight,
    buttonLabel,
    to,
    onButtonClick,
    className = "",
    overlayClassName = "",
}: ConfirmationCardProps) => {
    if (!open) return null;
    const buttonContent = to ? (
        <Button
            asChild
            className="w-full md:w-[240px] h-[42px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[12px] text-white text-[13px] font-medium shadow-none hover:shadow-lg transition-all"
        >
            <Link to={to}>{buttonLabel}</Link>
        </Button>
    ) : (
        <Button
            onClick={onButtonClick}
            className="w-full md:w-[240px] h-[42px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[12px] text-white text-[13px] font-medium shadow-none hover:shadow-lg transition-all"
        >
            {buttonLabel}
        </Button>
    );

    return (
        <div
            className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 ${overlayClassName}`}
        >
            <div
                className={`bg-white rounded-[20px] border border-[#E7E7E7] shadow-lg px-10 py-8 text-center ${className}`}
            >
                <p className="text-[#2D3748] text-[16px] xl:text-[18px] font-semibold leading-snug">
                    {title}
                </p>
                <p className="text-[#34A4B3] text-[18px] xl:text-[20px] font-semibold italic mt-1 font-['Merienda']">
                    {highlight}
                </p>
                <div className="mt-6 flex justify-center">{buttonContent}</div>
            </div>
        </div>
    );
};
