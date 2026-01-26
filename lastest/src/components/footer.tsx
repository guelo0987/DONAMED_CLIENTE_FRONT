export const FooterSection = () => {
    return (
        <footer className="w-full bg-[#F0F0F0] py-12">
            <div className="max-w-[1400px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">

                {/* Logo Section */}
                <div className="flex-shrink-0">
                    <img
                        className="h-auto w-[250px] object-contain"
                        alt="Donamed Logo"
                        src="/logos/donamed_logo_footer.png"
                    />
                </div>

                {/* Slogan Section */}
                <div className="flex-1 flex justify-center text-center">
                    <p className="[font-family:'Poppins',sans-serif] font-light italic text-[#000000] text-[18.5px] leading-[28px]">
                        Juntos llevamos salud a quienes más lo necesitan
                    </p>
                </div>

                {/* Contact/Social Media Section */}
                <div className="flex flex-col gap-4">
                    {/* Instagram */}
                    <div className="flex items-center gap-3">
                        <img
                            className="w-6 h-6 object-contain"
                            alt="Instagram"
                            src="/assets/instagram_footer.png"
                        />
                        <span className="[font-family:'Poppins',sans-serif] font-normal text-[#000000] text-[16px] leading-[24px]">
                            @donamed
                        </span>
                    </div>

                    {/* Facebook */}
                    <div className="flex items-center gap-3">
                        <img
                            className="w-6 h-6 object-contain"
                            alt="Facebook"
                            src="/assets/face_footer.png"
                        />
                        <span className="[font-family:'Poppins',sans-serif] font-normal text-[#000000] text-[16px] leading-[24px]">
                            @donamed
                        </span>
                    </div>

                    {/* WhatsApp */}
                    <div className="flex items-center gap-3">
                        <img
                            className="w-6 h-6 object-contain"
                            alt="WhatsApp"
                            src="/assets/wasap_footer.png"
                        />
                        <span className="[font-family:'Poppins',sans-serif] font-normal text-[#000000] text-[14px] leading-[21px]">
                            829-829-1829
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
