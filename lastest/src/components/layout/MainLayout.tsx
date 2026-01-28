import { ReactNode } from "react";
import { NavigationHeaderSection } from "../header";
import { FooterSection } from "../footer";

interface MainLayoutProps {
    children: ReactNode;
    className?: string;
}

export const MainLayout = ({ children, className = "" }: MainLayoutProps) => {
    return (
        <div className="min-h-screen bg-white flex flex-col w-full">
            <NavigationHeaderSection />
            <main className={`flex-1 w-full ${className}`}>
                {children}
            </main>
            <FooterSection />
        </div>
    );
};
