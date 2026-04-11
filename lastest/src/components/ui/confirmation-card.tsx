import { Link } from "react-router-dom";
import { Button } from "./buttons";
import { OverlayPortal } from "./overlay-portal";

interface ConfirmationCardProps {
    open?: boolean;
    title: string;
    highlight: string;
    buttonLabel: string;
    to?: string;
    onButtonClick?: () => void;
    secondaryLabel?: string;
    secondaryTo?: string;
    onSecondaryClick?: () => void;
    description?: string;
    descriptionHighlight?: string;
    inlineTitle?: boolean;
    titleSuffix?: string;
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
    secondaryLabel,
    secondaryTo,
    onSecondaryClick,
    description,
    descriptionHighlight,
    inlineTitle = false,
    titleSuffix,
    className = "",
    overlayClassName = "",
}: ConfirmationCardProps) => {
    if (!open) return null;
    const hasSecondary = Boolean(secondaryLabel);
    const primaryButtonClass = hasSecondary
        ? "w-[110px] md:w-[120px] h-[36px]"
        : "w-full md:w-[240px] h-[42px]";
    const secondaryButtonClass = "w-[110px] md:w-[120px] h-[36px]";

    const primaryButton = to ? (
        <Button
            asChild
            className={`${primaryButtonClass} bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[12px] text-white text-[13px] font-medium shadow-none hover:shadow-lg transition-all`}
        >
            <Link to={to}>{buttonLabel}</Link>
        </Button>
    ) : (
        <Button
            onClick={onButtonClick}
            className={`${primaryButtonClass} bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[12px] text-white text-[13px] font-medium shadow-none hover:shadow-lg transition-all`}
        >
            {buttonLabel}
        </Button>
    );

    const secondaryButton = secondaryLabel
        ? secondaryTo
            ? (
                <Button
                    asChild
                    className={`${secondaryButtonClass} bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[12px] text-white text-[13px] font-medium shadow-none hover:shadow-lg transition-all`}
                >
                    <Link to={secondaryTo}>{secondaryLabel}</Link>
                </Button>
            )
            : (
                <Button
                    onClick={onSecondaryClick}
                    className={`${secondaryButtonClass} bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[12px] text-white text-[13px] font-medium shadow-none hover:shadow-lg transition-all`}
                >
                    {secondaryLabel}
                </Button>
            )
        : null;

    return (
        <OverlayPortal>
            <div
                className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 ${overlayClassName}`}
            >
                <div
                    className={`bg-white rounded-[20px] border border-[#E7E7E7] shadow-lg px-10 py-8 text-center ${className}`}
                >
                    {inlineTitle ? (
                        <p className="text-[#2D3748] text-[16px] xl:text-[18px] font-semibold leading-snug">
                            {title}{" "}
                            <span className="text-[#34A4B3] font-['Merienda']">
                                {highlight}
                            </span>
                            {titleSuffix}
                        </p>
                    ) : (
                        <>
                            <p className="text-[#2D3748] text-[16px] xl:text-[18px] font-semibold leading-snug">
                                {title}
                            </p>
                            <p className="text-[#34A4B3] text-[18px] xl:text-[20px] font-semibold mt-1 font-['Merienda']">
                                {highlight}
                            </p>
                        </>
                    )}
                    {description && (
                        <p className="text-[#2D3748] text-[12px] xl:text-[13px] font-medium mt-2">
                            {description}{" "}
                            {descriptionHighlight && (
                                <span className="text-[#34A4B3] font-semibold">
                                    {descriptionHighlight}
                                </span>
                            )}
                        </p>
                    )}
                    <div className={`mt-6 flex justify-center ${hasSecondary ? "gap-6" : ""}`}>
                        {primaryButton}
                        {secondaryButton}
                    </div>
                </div>
            </div>
        </OverlayPortal>
    );
};
