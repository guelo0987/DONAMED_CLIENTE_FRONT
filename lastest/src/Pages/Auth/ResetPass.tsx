import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/buttons";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export const ResetPass = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center p-2 bg-[#F5F5F5] font-['Poppins']">
            {/* Main Card Container - Responsive Sizing - Occupying more screen space */}
            <div className="relative w-full h-[95vh] bg-white rounded-[38px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">

                {/* Close Button - Fixed to Card */}
                <Link to="/" className="absolute top-6 right-6 lg:top-8 lg:right-8 z-50 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6 lg:w-8 lg:h-8 text-[#5F6368] hover:text-black" />
                </Link>

                {/* Left Side - Banner (Hidden on Mobile, Visible on LG screens) */}
                <div className="hidden lg:block w-[40%] h-full relative bg-[#40C9DB]">
                    {/* Logo */}
                    <div className="absolute top-12 left-12 z-30">
                        <img
                            src="/logos/donamed_logo_auth.png"
                            alt="Donamed Logo"
                            className="w-[280px] xl:w-[350px] h-auto object-contain"
                        />
                    </div>

                    {/* Banner Image with Gradient */}
                    <div className="absolute inset-x-0 bottom-0 h-[85%] z-10 flex items-end justify-center overflow-hidden">
                        <img
                            src="/banners/restablecer_pass_banner.png"
                            alt="Doctora"
                            className="w-auto h-full object-cover object-bottom translate-y-2" // Small offset to fix fit
                        />
                    </div>

                    {/* Gradient Overlay matching Figma */}
                    <div
                        className="absolute bottom-0 w-full h-[40%] z-20 pointer-events-none"
                        style={{
                            background: "linear-gradient(0deg, #40C9DB -10%, rgba(64, 201, 219, 0) 100%)"
                        }}
                    />
                </div>

                {/* Right Side - Form */}
                <div className="w-full lg:w-[60%] h-full flex flex-col justify-center items-center relative px-6 md:px-12 xl:px-32 py-12">

                    <div className="w-full max-w-[650px] space-y-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Header */}
                        <div className="space-y-6 w-full text-center">
                            <h1 className="text-[#404040] text-[32px] md:text-[40px] xl:text-[50px] font-medium leading-[1.2] tracking-normal">
                                Restablecer Contraseña
                            </h1>
                            <p className="text-[#2D3748] text-[16px] md:text-[18px] xl:text-[22px] font-medium leading-relaxed">
                                Ingrese su nueva contraseña
                            </p>
                        </div>

                        {/* Form */}
                        <div className="w-full space-y-10 mt-4">
                            {/* New Password */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-center lg:justify-start gap-2">
                                    <Label className="text-[#404040] text-[20px] xl:text-[24px] font-medium">
                                        Nueva Contraseña
                                    </Label>
                                    <img
                                        src="/assets/plus_icon.png"
                                        alt="required"
                                        className="w-3 h-3 lg:w-4 lg:h-4 mb-2 mt-2"
                                    />
                                </div>
                                <Input
                                    type="password"
                                    placeholder="Nueva Contraseña"
                                    className="h-[60px] xl:h-[72px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[18px] text-center text-[#9A9A9A] text-[18px] xl:text-[20px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all"
                                />
                            </div>

                            {/* Repeat Password */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-center lg:justify-start gap-2">
                                    <Label className="text-[#404040] text-[20px] xl:text-[24px] font-medium">
                                        Repita la Contraseña
                                    </Label>
                                    <img
                                        src="/assets/plus_icon.png"
                                        alt="required"
                                        className="w-3 h-3 lg:w-4 lg:h-4 mb-2 mt-2"
                                    />
                                </div>
                                <Input
                                    type="password"
                                    placeholder="Repita la Contraseña"
                                    className="h-[60px] xl:h-[72px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[18px] text-center text-[#9A9A9A] text-[18px] xl:text-[20px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all"
                                />
                            </div>

                            <div className="flex justify-center lg:justify-center">
                                <Button
                                    className="w-full md:w-[320px] h-[70px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[18px] text-white text-[22px] font-medium shadow-none hover:shadow-lg transition-all"
                                >
                                    Confirmar Contraseña
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
