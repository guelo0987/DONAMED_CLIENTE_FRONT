import { ChevronDownIcon, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

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
        to: "/consultas",
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
            { label: "Preguntas Frecuentes", to: "/preguntas-frecuentes" },
            { label: "Contacto", to: "/contacto" },
        ],
    },
];

export const LandingHeader = () => {
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
    }, [navigate]);

    const handleDropdownOpen = (label: string) => {
        if (window.innerWidth < 1024) return; // Disable hover on mobile
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setOpenDropdown(label);
    };

    const handleDropdownClose = () => {
        if (window.innerWidth < 1024) return; // Disable hover on mobile
        closeTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 300);
    };

    const handleDropdownToggle = (label: string) => {
        if (openDropdown === label) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(label);
        }
    };

    const handleItemClick = (to: string | null) => {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
        if (to) {
            navigate(to);
        }
    };

    return (
        <header className="relative w-full bg-transparent py-4 lg:py-6 z-50">
            <div className="flex items-center justify-between max-w-[1299px] mx-auto px-4">
                {/* Logo */}
                <Link to="/">
                    <img
                        className="h-auto w-[140px] lg:w-[180px] object-contain cursor-pointer"
                        alt="Donamed Logo"
                        src="/logos/donamed_logo_header.png"
                    />
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-[#404040] hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>

                {/* Desktop Navigation & Auth Buttons */}
                <nav className="hidden lg:flex items-center gap-[40px]">
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
                        <button
                            onClick={() => navigate("/iniciar-sesion")}
                            className="bg-[#40C9DB] text-white px-6 py-2 rounded-[4px] [font-family:'Poppins',sans-serif] font-medium text-[16px] hover:bg-[#34A4B3] transition-colors"
                        >
                            Iniciar Sesión
                        </button>

                        <button
                            onClick={() => navigate("/crear-cuenta")}
                            className="border-2 border-[#40C9DB] text-[#40C9DB] px-6 py-2 rounded-[4px] [font-family:'Poppins',sans-serif] font-medium text-[16px] hover:bg-[#40C9DB] hover:text-white transition-colors"
                        >
                            Crear Cuenta
                        </button>
                    </div>
                </nav>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 lg:hidden flex flex-col p-4 z-40 animate-in slide-in-from-top-2 duration-200">
                        {navigationItems.map((item, index) => (
                            <div key={index} className="flex flex-col border-b border-gray-50 last:border-0">
                                {item.hasDropdown ? (
                                    <>
                                        <button
                                            onClick={() => handleDropdownToggle(item.label)}
                                            className="flex items-center justify-between w-full py-4 [font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[16px]"
                                        >
                                            {item.label}
                                            <ChevronDownIcon
                                                className={`w-5 h-5 text-[#404040] transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* Mobile Dropdown Options */}
                                        {openDropdown === item.label && item.dropdownItems && (
                                            <div className="flex flex-col bg-gray-50 rounded-lg mb-2">
                                                {item.dropdownItems.map((dropdownItem, dIndex) => (
                                                    <button
                                                        key={dIndex}
                                                        onClick={() => handleItemClick(dropdownItem.to)}
                                                        disabled={!dropdownItem.to}
                                                        className={`text-left px-5 py-3 text-[14px] [font-family:'Poppins',sans-serif] ${dropdownItem.to
                                                            ? "text-[#666] hover:text-[#34A4B3]"
                                                            : "text-gray-400"
                                                            }`}
                                                    >
                                                        {dropdownItem.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <button
                                        onClick={() => handleItemClick(item.to)}
                                        className={`text-left py-4 [font-family:'Poppins',sans-serif] font-medium text-[16px] ${item.to
                                            ? "text-[#404040]"
                                            : "text-gray-400"
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Mobile Auth Buttons */}
                        <div className="flex flex-col gap-3 mt-4 pt-2">
                            <button
                                onClick={() => navigate("/iniciar-sesion")}
                                className="w-full bg-[#40C9DB] text-white px-6 py-3 rounded-[4px] [font-family:'Poppins',sans-serif] font-medium text-[16px] active:bg-[#34A4B3]"
                            >
                                Iniciar Sesión
                            </button>
                            <button
                                onClick={() => navigate("/crear-cuenta")}
                                className="w-full border-2 border-[#40C9DB] text-[#40C9DB] px-6 py-3 rounded-[4px] [font-family:'Poppins',sans-serif] font-medium text-[16px] active:bg-gray-50"
                            >
                                Crear Cuenta
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
