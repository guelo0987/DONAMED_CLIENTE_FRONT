import { ChevronDownIcon, Languages, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ConfirmationCard } from "./ui/confirmation-card";
import { useI18n } from "../i18n/language-context";
import { languageNames, type LanguageCode } from "../i18n/config";

interface DropdownItem {
    id: string;
    labelKey: string;
    to: string | null; // null means no navigation
    requiresAuth?: boolean;
}

interface NavigationItem {
    id: string;
    labelKey: string;
    hasDropdown: boolean;
    to: string | null; // null means no navigation
    requiresAuth?: boolean;
    dropdownItems?: DropdownItem[];
}

import { useAuth } from "../hooks/useAuth";
import { getStoragePublicUrl } from "../utils/storageUrl";

export const NavigationHeaderSection = () => {
    const navigate = useNavigate();
    const { language, setLanguage, t } = useI18n();
    const { getUser } = useAuth();
    const user = getUser();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const languageOptions = Object.entries(languageNames) as [LanguageCode, string][];

    const navigationItems: NavigationItem[] = [
        {
            id: "consultas",
            labelKey: "nav.consultas",
            hasDropdown: false,
            to: "/consultas",
        },
        {
            id: "solicitudes",
            labelKey: "nav.solicitudes",
            hasDropdown: true,
            to: "/solicitudes",
            requiresAuth: true,
            dropdownItems: [
                { id: "nueva-solicitud", labelKey: "nav.nuevaSolicitud", to: "/solicitudes", requiresAuth: true },
                { id: "historial-solicitudes", labelKey: "nav.historialSolicitudes", to: "/historial-solicitudes", requiresAuth: true },
            ],
        },
        {
            id: "ayuda",
            labelKey: "nav.ayuda",
            hasDropdown: true,
            to: null,
            dropdownItems: [
                { id: "preguntas-frecuentes", labelKey: "nav.preguntasFrecuentes", to: "/preguntas-frecuentes" },
                { id: "contacto", labelKey: "nav.contacto", to: "/contacto" },
            ],
        },
    ];

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setOpenDropdown(null);
        setShowLanguageMenu(false);
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
        setShowLanguageMenu(false);
        if (to) {
            navigate(to);
        }
    };

    const handleLanguageChange = (nextLanguage: LanguageCode) => {
        setLanguage(nextLanguage);
        setShowLanguageMenu(false);
    };

    return (
        <header className="relative w-full bg-transparent py-4 lg:py-8 z-30">
            <div className="relative flex items-center justify-between max-w-[1299px] mx-auto px-4">
                {/* Logo - Clickable to go home */}
                <Link to="/">
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
                <nav className="hidden lg:flex items-center gap-7 xl:gap-10">
                    {navigationItems.map((item) => (
                        <div
                            key={item.id}
                            className="relative flex items-center gap-[9px]"
                            onMouseEnter={() => item.hasDropdown && handleDropdownOpen(item.id)}
                            onMouseLeave={handleDropdownClose}
                        >
                            {item.hasDropdown ? (
                                <>
                                    <button
                                        onClick={() => handleDropdownToggle(item.id)}
                                        className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px] leading-[30px] hover:text-black transition-colors flex items-center gap-[9px] cursor-pointer"
                                    >
                                        {t(item.labelKey)}
                                        <ChevronDownIcon
                                            className={`w-[20px] h-[11px] text-[#404040] transition-transform duration-200 ${openDropdown === item.id ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {openDropdown === item.id && item.dropdownItems && (
                                        <div
                                            className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-2 min-w-[220px] z-40"
                                            onMouseEnter={() => handleDropdownOpen(item.id)}
                                            onMouseLeave={handleDropdownClose}
                                        >
                                            {item.dropdownItems.map((dropdownItem) => (
                                                <button
                                                    key={dropdownItem.id}
                                                    onClick={(e) => {
                                                        if (dropdownItem.requiresAuth && !user) {
                                                            e.preventDefault();
                                                            setShowAuthModal(true);
                                                            setIsMobileMenuOpen(false);
                                                            setOpenDropdown(null);
                                                            return;
                                                        }
                                                        handleItemClick(dropdownItem.to);
                                                    }}
                                                    disabled={!dropdownItem.to && (!dropdownItem.requiresAuth || !!user)}
                                                    className={`block w-full text-left px-4 py-3 transition-colors [font-family:'Poppins',sans-serif] text-base ${dropdownItem.to
                                                        ? "text-[#404040] hover:bg-[#40C9DB]/10 hover:text-[#34A4B3] cursor-pointer"
                                                        : "text-gray-400 cursor-not-allowed"
                                                        }`}
                                                >
                                                    {t(dropdownItem.labelKey)}
                                                    {!dropdownItem.to && (
                                                        <span className="text-xs ml-2 text-gray-300">({t("nav.proximamente")})</span>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <span
                                    onClick={(e) => {
                                        if (item.requiresAuth && !user) {
                                            e.preventDefault();
                                            setShowAuthModal(true);
                                            setIsMobileMenuOpen(false);
                                            setOpenDropdown(null);
                                            return;
                                        }
                                        if (item.to) navigate(item.to);
                                    }}
                                    className={`[font-family:'Poppins',sans-serif] font-medium text-[20px] leading-[30px] transition-colors ${item.to
                                        ? "text-[#404040] hover:text-black cursor-pointer"
                                        : "text-gray-400 cursor-not-allowed"
                                        }`}
                                    title={!item.to ? t("nav.proximamente") : undefined}
                                >
                                    {t(item.labelKey)}
                                </span>
                            )}
                        </div>
                    ))}

                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowLanguageMenu((prev) => !prev)}
                            className="flex items-center gap-2 px-3 py-2 rounded-[8px] border border-[#E5E7EB] text-[#404040] hover:border-[#40C9DB] transition-colors"
                        >
                            <Languages className="w-4 h-4 text-[#34A4B3]" />
                            <span className="[font-family:'Poppins',sans-serif] text-[13px] font-medium">
                                {t(`header.languageShort.${language}`)}
                            </span>
                            <ChevronDownIcon className={`w-4 h-4 transition-transform ${showLanguageMenu ? "rotate-180" : ""}`} />
                        </button>

                        {showLanguageMenu && (
                            <div className="absolute top-full right-0 mt-2 min-w-[150px] bg-white rounded-lg border border-gray-100 shadow-lg py-1 z-50">
                                {languageOptions.map(([code, label]) => (
                                    <button
                                        key={code}
                                        type="button"
                                        onClick={() => handleLanguageChange(code)}
                                        className={`w-full text-left px-3 py-2 [font-family:'Poppins',sans-serif] text-sm transition-colors ${language === code ? "text-[#34A4B3] bg-[#F0FDFF]" : "text-[#404040] hover:bg-[#F0FDFF]"}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* User Profile Icon or Auth Buttons */}
                    {user ? (
                        <div
                            className="w-[40px] h-[39px] flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity bg-gray-200 rounded-full overflow-hidden border border-gray-300"
                            onClick={() => navigate("/dashboard")}
                            title={t("nav.miPerfil")}
                        >
                            {user.foto_url ? (
                                <img
                                    className="w-full h-full object-cover"
                                    alt="User profile"
                                    src={getStoragePublicUrl(user.foto_url) || user.foto_url}
                                />
                            ) : (
                                <img
                                    className="w-full h-full object-cover"
                                    alt="User profile fallback"
                                    src="/assets/user_header.png"
                                />
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate("/iniciar-sesion")}
                                className="bg-[#40C9DB] text-white px-6 py-2 rounded-[4px] [font-family:'Poppins',sans-serif] font-medium text-[16px] hover:bg-[#34A4B3] transition-colors"
                            >
                                {t("auth.iniciarSesion")}
                            </button>

                            <button
                                onClick={() => navigate("/crear-cuenta")}
                                className="border-2 border-[#40C9DB] text-[#40C9DB] px-6 py-2 rounded-[4px] [font-family:'Poppins',sans-serif] font-medium text-[16px] hover:bg-[#40C9DB] hover:text-white transition-colors"
                            >
                                {t("auth.crearCuenta")}
                            </button>
                        </div>
                    )}
                </nav>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 lg:hidden flex flex-col p-4 z-40 animate-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center justify-between px-1 pb-3 mb-2 border-b border-gray-100">
                            <span className="[font-family:'Poppins',sans-serif] text-[14px] text-[#4B5563] font-medium">
                                {t("header.language")}
                            </span>
                            <div className="flex items-center gap-2">
                                {languageOptions.map(([code]) => (
                                    <button
                                        key={code}
                                        type="button"
                                        onClick={() => handleLanguageChange(code)}
                                        className={`px-3 py-1.5 rounded-full text-[12px] [font-family:'Poppins',sans-serif] ${language === code ? "bg-[#34A4B3] text-white" : "bg-gray-100 text-[#4B5563]"}`}
                                    >
                                        {t(`header.languageShort.${code}`)}
                                    </button>
                                ))}
                            </div>
                        </div>
                        {navigationItems.map((item) => (
                            <div key={item.id} className="flex flex-col border-b border-gray-50 last:border-0">
                                {item.hasDropdown ? (
                                    <>
                                        <button
                                            onClick={() => handleDropdownToggle(item.id)}
                                            className="flex items-center justify-between w-full py-4 [font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[16px]"
                                        >
                                            {t(item.labelKey)}
                                            <ChevronDownIcon
                                                className={`w-5 h-5 text-[#404040] transition-transform duration-200 ${openDropdown === item.id ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {/* Mobile Dropdown Options */}
                                        {openDropdown === item.id && item.dropdownItems && (
                                            <div className="flex flex-col bg-gray-50 rounded-lg mb-2">
                                                {item.dropdownItems.map((dropdownItem) => (
                                                    <button
                                                        key={dropdownItem.id}
                                                        onClick={(e) => {
                                                            if (dropdownItem.requiresAuth && !user) {
                                                                e.preventDefault();
                                                                setShowAuthModal(true);
                                                                setIsMobileMenuOpen(false);
                                                                setOpenDropdown(null);
                                                                return;
                                                            }
                                                            handleItemClick(dropdownItem.to);
                                                        }}
                                                        disabled={!dropdownItem.to && (!dropdownItem.requiresAuth || !!user)}
                                                        className={`text-left px-5 py-3 text-[14px] [font-family:'Poppins',sans-serif] ${dropdownItem.to
                                                            ? "text-[#666] hover:text-[#34A4B3]"
                                                            : "text-gray-400"
                                                            }`}
                                                    >
                                                        {t(dropdownItem.labelKey)}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <button
                                        onClick={(e) => {
                                            if (item.requiresAuth && !user) {
                                                e.preventDefault();
                                                setShowAuthModal(true);
                                                setIsMobileMenuOpen(false);
                                                setOpenDropdown(null);
                                                return;
                                            }
                                            handleItemClick(item.to);
                                        }}
                                        className={`text-left py-4 [font-family:'Poppins',sans-serif] font-medium text-[16px] ${item.to
                                            ? "text-[#404040]"
                                            : "text-gray-400"
                                            }`}
                                    >
                                        {t(item.labelKey)}
                                    </button>
                                )}
                            </div>
                        ))}

                        {/* Mobile Auth Buttons or User Profile */}
                        <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100">
                            {user ? (
                                <button
                                    onClick={() => handleItemClick("/dashboard")}
                                    className="flex items-center gap-3 w-full py-2"
                                >
                                    <div className="w-[30px] h-[30px] rounded-full overflow-hidden bg-gray-200 border border-gray-300 flex items-center justify-center">
                                        {user.foto_url ? (
                                            <img
                                                className="w-full h-full object-cover"
                                                alt="User profile"
                                                src={getStoragePublicUrl(user.foto_url) || user.foto_url}
                                            />
                                        ) : (
                                            <img
                                                className="w-full h-full object-cover"
                                                alt="User profile fallback"
                                                src="/assets/user_header.png"
                                            />
                                        )}
                                    </div>
                                    <span className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[16px]">
                                        {t("nav.miPerfil")}
                                    </span>
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate("/iniciar-sesion")}
                                        className="w-full bg-[#40C9DB] text-white px-6 py-3 rounded-[4px] [font-family:'Poppins',sans-serif] font-medium text-[16px] active:bg-[#34A4B3]"
                                    >
                                        {t("auth.iniciarSesion")}
                                    </button>
                                    <button
                                        onClick={() => navigate("/crear-cuenta")}
                                        className="w-full border-2 border-[#40C9DB] text-[#40C9DB] px-6 py-3 rounded-[4px] [font-family:'Poppins',sans-serif] font-medium text-[16px] active:bg-gray-50"
                                    >
                                        {t("auth.crearCuenta")}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <ConfirmationCard
                open={showAuthModal}
                title={t("auth.acceso")}
                highlight={t("auth.requerido")}
                titleSuffix=""
                inlineTitle={true}
                description={t("auth.debe")}
                descriptionHighlight={t("auth.iniciarSesionAccion")}
                buttonLabel={t("auth.iniciarSesion")}
                onButtonClick={() => {
                    setShowAuthModal(false);
                    navigate("/iniciar-sesion");
                }}
                secondaryLabel={t("common.cerrar")}
                onSecondaryClick={() => setShowAuthModal(false)}
            />
        </header>
    );
};
