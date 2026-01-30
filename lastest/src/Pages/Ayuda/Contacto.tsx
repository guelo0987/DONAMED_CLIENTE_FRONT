import { Mail, MapPin, Phone } from "lucide-react";
import { MainLayout } from "../../components/layout/MainLayout";

export const Contacto = () => {
    return (
        <MainLayout className="bg-white">
            <section className="w-full px-4 py-8 lg:py-10">
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-10 items-center">
                    <div className="space-y-5">
                        <h1 className="text-[#2D3748] text-[38px] md:text-[44px] lg:text-[46px] font-semibold leading-tight">
                            <span className="text-[#34A4B3] font-['Merienda']">
                                Contáctanos
                            </span>{" "}
                            estamos aquí para ayudarte
                        </h1>
                        <p className="text-[#4A5568] text-[16px] lg:text-[17px] font-medium [font-family:'Poppins',sans-serif] max-w-[420px]">
                            Escríbenos y cuéntanos tu caso. Nuestro equipo te responderá lo
                            antes posible.
                        </p>
                        <button className="bg-[#34A4B3] text-white px-6 py-2.5 rounded-[10px] text-[13px] lg:text-[14px] font-medium [font-family:'Poppins',sans-serif] hover:bg-[#2B93A1] transition-all">
                            Contáctanos
                        </button>
                    </div>

                    <div className="w-full flex justify-center lg:justify-end">
                        <div className="w-full max-w-[420px] bg-[#F7FBFC] rounded-[20px] p-6 shadow-[0px_6px_20px_rgba(0,0,0,0.08)] border border-[#EAF2F4]">
                            <h3 className="text-[#2D3748] text-[18px] font-semibold mb-4">
                                Información de contacto
                            </h3>
                            <div className="space-y-4 text-[#4A5568] text-[14px] [font-family:'Poppins',sans-serif]">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-5 h-5 text-[#34A4B3]" />
                                    <div>
                                        <p className="font-medium">Teléfono</p>
                                        <p>+1 829-829-1829</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-5 h-5 text-[#34A4B3]" />
                                    <div>
                                        <p className="font-medium">Correo</p>
                                        <p>contacto@donamed.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin className="w-5 h-5 text-[#34A4B3]" />
                                    <div>
                                        <p className="font-medium">Dirección</p>
                                        <p>Santo Domingo, República Dominicana</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 pb-12">
                <div className="max-w-[1200px] mx-auto">
                    <h2 className="text-[#2D3748] text-[30px] lg:text-[32px] font-semibold mb-8">
                        Envíanos un mensaje
                    </h2>

                    <div className="bg-white rounded-[16px] border border-[#EFEFEF] shadow-[0px_3px_10px_rgba(0,0,0,0.06)] p-6 lg:p-8 max-w-[720px]">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-[#404040] text-[13px] font-medium [font-family:'Poppins',sans-serif]">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    placeholder="Tu nombre"
                                    className="w-full bg-[#F3F4F6] rounded-[10px] px-4 py-3 text-[#4A5568] text-[13px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[#404040] text-[13px] font-medium [font-family:'Poppins',sans-serif]">
                                    Correo
                                </label>
                                <input
                                    type="email"
                                    placeholder="tucorreo@dominio.com"
                                    className="w-full bg-[#F3F4F6] rounded-[10px] px-4 py-3 text-[#4A5568] text-[13px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-[#404040] text-[13px] font-medium [font-family:'Poppins',sans-serif]">
                                    Asunto
                                </label>
                                <input
                                    type="text"
                                    placeholder="¿En qué podemos ayudarte?"
                                    className="w-full bg-[#F3F4F6] rounded-[10px] px-4 py-3 text-[#4A5568] text-[13px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30"
                                />
                            </div>
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label className="text-[#404040] text-[13px] font-medium [font-family:'Poppins',sans-serif]">
                                    Mensaje
                                </label>
                                <textarea
                                    rows={5}
                                    placeholder="Escribe tu mensaje"
                                    className="w-full bg-[#F3F4F6] rounded-[10px] px-4 py-3 text-[#4A5568] text-[13px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 resize-none"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <button
                                    type="button"
                                    className="bg-[#34A4B3] text-white px-7 py-3 rounded-[10px] text-[13px] lg:text-[14px] font-medium [font-family:'Poppins',sans-serif] hover:bg-[#2B93A1] transition-all"
                                >
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
};
