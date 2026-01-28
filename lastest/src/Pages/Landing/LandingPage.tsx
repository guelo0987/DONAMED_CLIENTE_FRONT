import { LandingHeader } from "../../components/LandingHeader";
import { FooterSection } from "../../components/footer";
import {
    HeroSection,
    PartnersSection,
    MedicationsSection,
    AssistanceSection,
} from "../../components/landing";

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white font-['Poppins'] flex flex-col">
            {/* Header with Auth Buttons */}
            <LandingHeader />

            {/* Hero Section */}
            <HeroSection />

            {/* Partners Section */}
            <PartnersSection />

            {/* Medications Section */}
            <MedicationsSection />

            {/* Assistance Section */}
            <AssistanceSection />

            {/* Footer */}
            <FooterSection />
        </div>
    );
};

export default LandingPage;
