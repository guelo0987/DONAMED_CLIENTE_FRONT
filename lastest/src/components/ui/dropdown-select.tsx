import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

interface DropdownOption {
    value: string;
    label: string;
}

interface DropdownSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: DropdownOption[];
    placeholder: string;
    buttonClassName?: string;
    menuClassName?: string;
    disabled?: boolean;
    onOpenChange?: (open: boolean) => void;
    openUpward?: boolean;
}

export const DropdownSelect = ({
    value,
    onChange,
    options,
    placeholder,
    buttonClassName = "",
    menuClassName = "",
    disabled = false,
    onOpenChange,
    openUpward = false,
}: DropdownSelectProps) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuStyle, setMenuStyle] = useState<CSSProperties>({});

    const selectedLabel = useMemo(() => {
        if (!value) return placeholder;
        return options.find((opt) => opt.value === value)?.label ?? placeholder;
    }, [options, placeholder, value]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                rootRef.current &&
                !rootRef.current.contains(target) &&
                menuRef.current &&
                !menuRef.current.contains(target)
            ) {
                setOpen(false);
                onOpenChange?.(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    useEffect(() => {
        if (!open) return;

        const updateMenuPosition = () => {
            if (!rootRef.current) return;
            const rect = rootRef.current.getBoundingClientRect();
            const spacing = 8;

            const baseStyle: CSSProperties = {
                position: "fixed",
                left: rect.left,
                width: rect.width,
                zIndex: 9999,
            };

            if (openUpward) {
                baseStyle.bottom = window.innerHeight - rect.top + spacing;
            } else {
                baseStyle.top = rect.bottom + spacing;
            }

            setMenuStyle(baseStyle);
        };

        updateMenuPosition();
        window.addEventListener("resize", updateMenuPosition);
        window.addEventListener("scroll", updateMenuPosition, true);

        return () => {
            window.removeEventListener("resize", updateMenuPosition);
            window.removeEventListener("scroll", updateMenuPosition, true);
        };
    }, [open, openUpward]);

    return (
        <div ref={rootRef} className="relative w-full">
            <button
                type="button"
                disabled={disabled}
                onClick={() => {
                    if (disabled) return;
                    setOpen((prev) => {
                        const next = !prev;
                        onOpenChange?.(next);
                        return next;
                    });
                }}
                className={`w-full flex items-center justify-between ${buttonClassName} ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
            >
                <span className="truncate">{selectedLabel}</span>
                <ChevronDown
                    className={`w-4 h-4 lg:w-5 lg:h-5 text-[#718096] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open &&
                createPortal(
                    <div
                        ref={menuRef}
                        style={menuStyle}
                        className={`bg-white rounded-lg shadow-lg border border-gray-100 py-2 max-h-[280px] overflow-y-auto ${menuClassName}`}
                    >
                    <button
                        type="button"
                        onClick={() => {
                            onChange("");
                            setOpen(false);
                            onOpenChange?.(false);
                        }}
                        className={`block w-full text-left px-4 py-2.5 transition-colors [font-family:'Poppins',sans-serif] text-[15px] ${value === ""
                            ? "bg-[#40C9DB]/15 text-[#34A4B3] font-medium"
                            : "text-[#404040] hover:bg-[#40C9DB]/10 hover:text-[#34A4B3]"
                            }`}
                    >
                        {placeholder}
                    </button>

                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                onChange(option.value);
                                setOpen(false);
                                onOpenChange?.(false);
                            }}
                            className={`block w-full text-left px-4 py-2.5 transition-colors [font-family:'Poppins',sans-serif] text-[15px] ${value === option.value
                                ? "bg-[#40C9DB]/15 text-[#34A4B3] font-medium"
                                : "text-[#404040] hover:bg-[#40C9DB]/10 hover:text-[#34A4B3]"
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                    </div>,
                    document.body
                )}
        </div>
    );
};
