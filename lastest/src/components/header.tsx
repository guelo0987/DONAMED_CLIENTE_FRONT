import { ChevronDownIcon, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

interface DropdownItem {
    label: string;
    to: string | null; // null means no navigation
}

interface NavigationItem {
    label: string;
    hasDropdown: boolean;
    to: string | null; // null means no navigation
    dropdownItems?: DropdownItem[];
}

const navigationItems: NavigationItem[] = [
    {
        label: "Consultas",
        hasDropdown: false,
        to: null, // No existe aún
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
        to: null, // No existe aún
        dropdownItems: [
            { label: "Preguntas Frecuentes", to: null }, // No existe aún
            { label: "Contacto", to: null }, // No existe aún
        ],
    },
];

export const NavigationHeaderSection = () => {
    const navigate = useNavigate();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
    }, [navigate]);

    const handleDropdownOpen = (label: string) => {
        if (window.innerWidth < 1024) return; // Disable hover on mobile
        // Clear any pending close timeout
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setOpenDropdown(label);
    };

    const handleDropdownClose = () => {
        if (window.innerWidth < 1024) return; // Disable hover on mobile
        // Add delay before closing to allow user to move mouse to dropdown
        closeTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 300); // 300ms delay
    };

    const handleDropdownToggle = (label: string) => {
        if (openDropdown === label) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(label); // Open immediately on click/tap
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
        <header className="relative w-full bg-transparent py-4 lg:py-8 z-50">
            <div className="flex items-center justify-between max-w-[1299px] mx-auto px-4">
                {/* Logo - Clickable to go home */}
                <Link to="/solicitudes">
                    <img
                        className="h-auto w-[150px] lg:w-[200px] object-contain cursor-pointer"
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

                {/* Navigation & User Profile (Desktop) */}
                <nav className="hidden lg:flex items-center gap-[60px]">
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
                                        className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px] leading-[30px] hover:text-black transition-colors flex items-center gap-[9px] cursor-pointer"
                                    >
                                        {item.label}
                                        <ChevronDownIcon
                                            className={`w-[20px] h-[11px] text-[#404040] transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
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
                                    className={`[font-family:'Poppins',sans-serif] font-medium text-[20px] leading-[30px] transition-colors ${item.to
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

                    {/* User Profile Icon - Navigates to Dashboard */}
                    <div
                        className="w-[40px] h-[39px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => navigate("/dashboard")}
                        title="Mi Perfil"
                    >
                        <img
                            className="w-full h-full object-contain"
                            alt="User profile"
                            src="/assets/user_header.png"
                        />
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

                        {/* Mobile User Profile Button */}
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => handleItemClick("/dashboard")}
                                className="flex items-center gap-3 w-full py-2"
                            >
                                <div className="w-[30px] h-[30px]">
                                    <img
                                        className="w-full h-full object-contain"
                                        alt="User profile"
                                        src="/assets/user_header.png"
                                    />
                                </div>
                                <span className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[16px]">
                                    Mi Perfil
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
