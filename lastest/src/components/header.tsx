import { ChevronDownIcon } from "lucide-react";
import { Link } from "react-router-dom";


const navigationItems = [
    {
        label: "Consultas",
        hasDropdown: false,
        to: "/consultas",
    },
    {
        label: "Solicitudes",
        hasDropdown: true,
        to: "/solicitudes",
    },
    {
        label: "Ayuda",
        hasDropdown: true,
        to: "/ayuda",
    },
];

export const NavigationHeaderSection = () => {
    return (
        <header className="relative w-full bg-transparent py-8">
            <div className="flex items-center justify-between max-w-[1299px] mx-auto px-4">
                {/* Logo */}
                <img
                    className="h-auto w-[200px] object-contain"
                    alt="Donamed Logo"
                    src="/logos/donamed_logo_header.png"
                />

                {/* Navigation & User Profile */}
                <nav className="flex items-center gap-[60px]">
                    {navigationItems.map((item, index) => (
                        <div key={index} className="flex items-center gap-[9px] cursor-pointer">
                            <Link
                                to={item.to}
                                className="[font-family:'Poppins',sans-serif] font-medium text-[#404040] text-[20px] leading-[30px] hover:text-black transition-colors"
                            >
                                {item.label}
                            </Link>

                            {item.hasDropdown && (
                                <ChevronDownIcon className="w-[20px] h-[11px] text-[#404040]" />
                            )}
                        </div>
                    ))}

                    {/* User Profile Icon */}
                    <div className="w-[40px] h-[39px] flex items-center justify-center cursor-pointer">
                        <img
                            className="w-full h-full object-contain"
                            alt="User profile"
                            src="/assets/user_header.png"
                        />
                    </div>
                </nav>
            </div>
        </header>
    );
};
