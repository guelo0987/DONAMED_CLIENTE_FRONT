import { ChevronDownIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

interface DropdownItem {
    label: string;
    to: string | null;
}

interface NavigationItem {
    label: string;
    hasDropdown: boolean;
    to: string | null;
    dropdownItems?: DropdownItem[];
}

const navigationItems: NavigationItem[] = [
    {
        label: "Consultas",
        hasDropdown: false,
        to: null,
    },
    {
        label: "Solicitudes",
        hasDropdown: true,
        to: "/solicitudes",
        dropdownItems: [
            { label: "Nueva Solicitud", to: "/solicitudes" },
            { label: "Historial de Solicitudes", to: "/historial-solicitudes" },
        ],
    },
    {
        label: "Ayuda",
        hasDropdown: true,
        to: null,
        dropdownItems: [
            { label: "Preguntas Frecuentes", to: null },
            { label: "Contacto", to: null },
        ],
    },
];

export const LandingHeader = () => {
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleDropdownOpen = (label: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setOpenDropdown(label);
    };

    const handleDropdownClose = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 300);
    };

    const handleDropdownToggle = (label: string) => {
        if (openDropdown === label) {
            setOpenDropdown(null);
        } else {
            handleDropdownOpen(label);
        }
    };

    const handleItemClick = (to: string | null) => {
        setOpenDropdown(null);
        if (to) {
            navigate(to);
        }
    };

    return (
        <header className="relative w-full bg-transparent py-6 z-50">
            <div className="flex items-center justify-between max-w-[1299px] mx-auto px-4">
                {/* Logo */}
                <Link to="/">
                    <img
                        className="h-auto w-[180px] object-contain cursor-pointer"
                        alt="Donamed Logo"
                        src="/logos/donamed_logo_header.png"
                    />
                </Link>

                {/* Navigation & Auth Buttons */}
                <nav className="flex items-center gap-[40px]">
                    {navigationItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative flex items-center gap-[9px]"
                            onMouseEnter={() => item.hasDropdown && handleDropdownOpen(item.label)}
                            onMouseLeave={handleDropdownClose}
                        >
                            {item.hasDropdown ? (
                                <>
                                    <button
                                        onClick={() => handleDropdownToggle(item.label)}
                                        className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[18px] leading-[27px] hover:text-black transition-colors flex items-center gap-[9px] cursor-pointer"
                                    >
                                        {item.label}
                                        <ChevronDownIcon
                                            className={`w-[18px] h-[10px] text-[#404040] transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {openDropdown === item.label && item.dropdownItems && (
                                        <div
                                            className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[220px] z-50"
                                            onMouseEnter={() => handleDropdownOpen(item.label)}
                                            onMouseLeave={handleDropdownClose}
                                        >
                                            {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                                                <button
                                                    key={dropdownIndex}
                                                    onClick={() => handleItemClick(dropdownItem.to)}
                                                    disabled={!dropdownItem.to}
                                                    className={`block w-full text-left px-4 py-3 transition-colors [font-family:'Poppins',sans-serif] text-base ${dropdownItem.to
                                                            ? "text-[#404040] hover:bg-[#40C9DB]/10 hover:text-[#34A4B3] cursor-pointer"
                                                            : "text-gray-400 cursor-not-allowed"
                                                        }`}
                                                >
                                                    {dropdownItem.label}
                                                    {!dropdownItem.to && (
                                                        <span className="text-xs ml-2 text-gray-300">(Próximamente)</span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <span
                                    onClick={() => item.to && navigate(item.to)}
                                    className={`[font-family:'Poppins',sans-serif] font-medium text-[18px] leading-[27px] transition-colors ${item.to
                                            ? "text-[#404040] hover:text-black cursor-pointer"
                                            : "text-gray-400 cursor-not-allowed"
                                        }`}
                                    title={!item.to ? "Próximamente" : undefined}
                                >
                                    {item.label}
                                </span>
                            )}
                        </div>
                    ))}

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        {/* Iniciar Sesión */}
                        <button
                            onClick={() => navigate("/forgot-password")}
                            className="bg-[#40C9DB] text-white px-6 py-2 rounded-[4px] [font-family:'Poppins',sans-serif] font-medium text-[16px] hover:bg-[#34A4B3] transition-colors"
                        >
                            Iniciar Sesión
                        </button>

                        {/* Crear Cuenta */}
                        <button
                            onClick={() => navigate("/forgot-password")}
                            className="border-2 border-[#40C9DB] text-[#40C9DB] px-6 py-2 rounded-[4px] [font-family:'Poppins',sans-serif] font-medium text-[16px] hover:bg-[#40C9DB] hover:text-white transition-colors"
                        >
                            Crear Cuenta
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};
