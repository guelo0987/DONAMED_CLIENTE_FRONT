import { NavigationHeaderSection } from "../../components/header";
import { FooterSection } from "../../components/footer";
import { HistorialSolicitudesCard } from "../../components/HistorialSolicitudesCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const requests = [
        { date: "12/03/2024", medication: "Medicamento A", status: "En Proceso" },
        { date: "12/03/2024", medication: "Medicamento A", status: "Validacion" },
        { date: "12/03/2024", medication: "Medicamento A", status: "Procesada" },
    ];

    return (
        <div className="min-h-screen bg-white font-['Poppins'] flex flex-col">
            <NavigationHeaderSection />

            {/* Main Content */}
            <main className="flex-1 max-w-[1728px] w-full mx-auto relative pt-[50px] pb-20 px-4 xl:px-[103px]">
                <div className="flex flex-col lg:flex-row gap-8 pt-[58px]">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-[318px] flex-shrink-0 bg-[#F0F0F0]/45 rounded-[17px] p-6 hidden lg:flex flex-col min-h-[524px]">
                        {/* Gestionar Cuenta Header */}
                        <h3 className="text-[#2D3748] font-medium text-base mb-6">
                            Gestionar Cuenta
                        </h3>

                        {/* Horizontal Line */}
                        <div className="w-full h-px bg-[#404040] opacity-50 mb-6"></div>

                        {/* Menu Items */}
                        <div className="flex flex-col gap-2 flex-1">
                            {/* Active Item: Editar Información Personal */}
                            <div className="flex items-center gap-3 py-3 px-4 bg-gradient-to-r from-[#DEDEDE] to-transparent border-l-[6px] border-[#40C9DB] rounded-l-[6px] cursor-pointer">
                                <img
                                    src="/assets/editar_perfil_icon.png"
                                    alt="Editar Perfil"
                                    className="w-6 h-6 object-contain"
                                />
                                <span className="text-[#2D3748] text-base">
                                    Editar Información Personal
                                </span>
                            </div>

                            {/* Cambiar Contraseña */}
                            <Link to="/reset-password" className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                <img
                                    src="/assets/cambiar_pass_icon.png"
                                    alt="Cambiar Contraseña"
                                    className="w-6 h-6 object-contain"
                                />
                                <span className="text-[#2D3748] text-base">
                                    Cambiar Contraseña
                                </span>
                            </Link>

                            {/* Desactivar Cuenta */}
                            <div className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                <img
                                    src="/assets/desactivar_cuenta_icon.png"
                                    alt="Desactivar Cuenta"
                                    className="w-6 h-6 object-contain"
                                />
                                <span className="text-[#2D3748] text-base">
                                    Desactivar Cuenta
                                </span>
                            </div>

                            {/* Spacer */}
                            <div className="flex-1"></div>

                            {/* Cerrar Sesión */}
                            <div className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer">
                                <img
                                    src="/assets/log_out_icon.png"
                                    alt="Cerrar Sesión"
                                    className="w-6 h-6 object-contain"
                                />
                                <span className="text-[#2D3748] text-base">Cerrar Sesión</span>
                            </div>

                            {/* Eliminar Cuenta Button */}
                            <button className="w-full bg-[#1C5961] text-white py-3 px-6 rounded-[14px] text-base hover:bg-[#164950] transition-colors mt-4">
                                Eliminar Cuenta
                            </button>
                        </div>
                    </aside>

                    {/* Main Area */}
                    <div className="flex-1 max-w-[1167px] flex flex-col gap-6">
                        {/* Banner with Profile Card */}
                        <div className="relative w-full h-[241px]">
                            {/* Banner Background */}
                            <div className="absolute inset-0 rounded-[15px] overflow-hidden">
                                <div className="absolute inset-0 bg-[#4FD1C5]"></div>
                                <img
                                    src="/banners/historial_banner.png"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    alt="Banner"
                                />
                            </div>

                            {/* Profile Glassmorphism Card - Overlapping Banner */}
                            <div
                                className="absolute left-[6%] top-[40%] w-[52%] max-w-[614px] rounded-[15px] border-[1.5px] border-[#F3F3F3] shadow-sm p-4 flex items-center gap-4"
                                style={{
                                    background:
                                        "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
                                    backdropFilter: "blur(10.5px)",
                                }}
                            >
                                {/* Avatar */}
                                <div className="relative">
                                    <div className="w-[100px] h-[100px] lg:w-[121px] lg:h-[121px] rounded-[12px] overflow-hidden bg-[#C4C4C4] border-[0.5px] border-[#DCD7D7]">
                                        <img
                                            src="/assets/imagen_usuario.png"
                                            alt="User"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Edit Icon over Avatar */}
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[43px] h-[39px] bg-white border-[1.5px] border-[#F3F3F3] rounded-lg shadow-sm flex items-center justify-center cursor-pointer">
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                                                stroke="#34A4B3"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                            <path
                                                d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                                                stroke="#34A4B3"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Name and Email */}
                                <div className="flex flex-col">
                                    <h2 className="text-[#2D3748] text-[24px] lg:text-[36px] font-normal leading-[140%]">
                                        Maria Concepcion
                                    </h2>
                                    <p className="text-[#718096] text-[15px] leading-[140%]">
                                        mariacon@ejemplo.com
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Row: Profile Info + Historial */}
                        <div className="flex flex-col xl:flex-row gap-6 mt-4">
                            {/* Profile Info Card */}
                            <div className="w-full xl:w-[527px] bg-[#F0F0F0]/45 rounded-[17px] p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-[#2D3748] text-xl font-medium">
                                        Información personal
                                    </h3>
                                    <div className="w-6 h-6 cursor-pointer">
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="w-full h-px bg-[#404040] opacity-50 mb-6"></div>

                                {/* User Details */}
                                <div className="flex items-start gap-6">
                                    {/* Avatar */}
                                    <div className="w-[80px] h-[80px] rounded-[12px] overflow-hidden bg-[#C4C4C4] border-[0.5px] border-[#DCD7D7] flex-shrink-0">
                                        <img
                                            src="/assets/imagen_usuario.png"
                                            alt="User"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex flex-col gap-2">
                                        <h4 className="text-[#2D3748] text-2xl font-normal">
                                            Maria Concepcion
                                        </h4>
                                        <div className="flex flex-col gap-1 text-[#2D3748] text-base font-medium">
                                            <p>
                                                <span className="text-[#2D3748]">Nombre:</span> Maria
                                            </p>
                                            <p>
                                                <span className="text-[#2D3748]">Apellido:</span>{" "}
                                                Concepción
                                            </p>
                                            <p>
                                                <span className="text-[#2D3748]">Teléfono:</span>{" "}
                                                809-693-8956
                                            </p>
                                            <p>
                                                <span className="text-[#2D3748]">
                                                    Correo Electrónico:
                                                </span>{" "}
                                                mariacon@ejemplo.com
                                            </p>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            {/* Historial de Solicitudes Card - Using new component */}
                            <HistorialSolicitudesCard requests={requests} />
                        </div>
                    </div>
                </div>
            </main>

            <FooterSection />
        </div>
    );
};

export default Dashboard;
