import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { HistorialSolicitudesCard } from "../../components/HistorialSolicitudesCard";
import { ConfirmationCard } from "../../components/ui/confirmation-card";
import { useAuth } from "../../hooks/useAuth";
import type { UserProfile } from "../../types/user";
import { Modal } from "../../components/ui/modal";
import { EditProfileModal } from "./components/EditProfileModal";
import { ChangePasswordModal } from "./components/ChangePasswordModal";

const Dashboard = () => {
    const navigate = useNavigate();
    const { fetchProfile, getUser, logout, deactivateAccount, deleteAccount } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const user = getUser();

    // UI states
    const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);


    useEffect(() => {
        const loadProfile = async () => {
            const data = await fetchProfile();
            if (data) {
                setProfile(data);
            }
        };
        loadProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const name = profile ? `${profile.persona.nombre} ${profile.persona.apellidos}` : user?.nombre_completo || "Cargando...";
    const email = profile ? profile.correo : user?.correo || "";
    const phone = profile ? profile.persona.telefono : "";
    const firstName = profile ? profile.persona.nombre : "";
    const lastName = profile ? profile.persona.apellidos : "";
    const avatar = profile?.foto_url || user?.foto_url || "/assets/user_header.png";
    const joinDate = profile?.creado_en ? new Date(profile.creado_en).toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' }) : "Desconocido";
    const altPhone = profile?.persona.telefono_alternativo || "No especificado";

    return (
        <MainLayout className="font-['Poppins']">
            {/* Main Content Container */}
            <div className="max-w-[1728px] w-full mx-auto relative pt-8 lg:pt-[50px] pb-20 px-4 xl:px-[103px]">

                <div className="flex flex-col lg:flex-row gap-8 pt-4 lg:pt-[58px]">

                    {/* Sidebar - Desktop: Left Side, Mobile: Bottom Section (Quick Actions) */}
                    <aside className="w-full lg:w-[318px] flex-shrink-0 bg-[#F0F0F0]/45 rounded-[17px] p-6 flex flex-col order-2 lg:order-1 lg:min-h-[524px]">
                        <h3 className="text-[#2D3748] font-medium text-base mb-6">
                            Gestionar Cuenta
                        </h3>
                        <div className="w-full h-px bg-[#404040] opacity-50 mb-6"></div>

                        {/* Menu Items */}
                        <div className="flex flex-col gap-2 flex-1">
                            {/* Items same as before */}
                            <div
                                onClick={() => setIsEditProfileOpen(true)}
                                className="flex items-center gap-3 py-3 px-4 bg-gradient-to-r from-[#DEDEDE] to-transparent border-l-[6px] border-[#40C9DB] rounded-l-[6px] cursor-pointer"
                            >
                                <img src="/assets/editar_perfil_icon.png" alt="Editar" className="w-6 h-6 object-contain" />
                                <span className="text-[#2D3748] text-base">Editar Información Personal</span>
                            </div>

                            <div
                                onClick={() => setIsChangePasswordOpen(true)}
                                className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <img src="/assets/cambiar_pass_icon.png" alt="Password" className="w-6 h-6 object-contain" />
                                <span className="text-[#2D3748] text-base">Cambiar Contraseña</span>
                            </div>

                            <div
                                onClick={() => setIsDeactivateOpen(true)}
                                className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <img src="/assets/desactivar_cuenta_icon.png" alt="Desactivar" className="w-6 h-6 object-contain" />
                                <span className="text-[#2D3748] text-base">Desactivar Cuenta</span>
                            </div>

                            <div className="flex-1 lg:block"></div>

                            <button
                                type="button"
                                onClick={() => setIsLogoutOpen(true)}
                                className="flex items-center gap-3 py-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer w-full text-left"
                            >
                                <img src="/assets/log_out_icon.png" alt="Logout" className="w-6 h-6 object-contain" />
                                <span className="text-[#2D3748] text-base">Cerrar Sesión</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsDeleteOpen(true)}
                                className="w-full bg-[#1C5961] text-white py-3 px-6 rounded-[14px] text-base hover:bg-[#164950] transition-colors mt-4"
                            >
                                Eliminar Cuenta
                            </button>
                        </div>
                    </aside>

                    {/* Main Area - Desktop: Right Side, Mobile: Top Section */}
                    <div className="flex-1 w-full max-w-[1167px] flex flex-col gap-6 order-1 lg:order-2">

                        {/* Profile Banner & Card Wrapper */}
                        <div className="relative w-full flex flex-col">
                            {/* Banner Background */}
                            <div className="w-full h-[180px] lg:h-[241px] rounded-[15px] overflow-hidden relative z-0">
                                <div className="absolute inset-0 bg-[#4FD1C5]"></div>
                                <img
                                    src="/banners/historial_banner.png"
                                    className="absolute inset-0 w-full h-full object-cover"
                                    alt="Banner"
                                />
                            </div>

                            {/* Profile Card - Overlapping using Negative Margin on Mobile, Absolute on Desktop */}
                            <div
                                className="relative lg:absolute z-10 
                                           mt-[-60px] mx-4 lg:mt-0 lg:mx-0
                                           lg:left-[6%] lg:top-[40%] 
                                           w-auto lg:w-[52%] max-w-[614px] 
                                           bg-white/80 backdrop-blur-[10.5px] 
                                           rounded-[15px] border-[1.5px] border-[#F3F3F3] shadow-sm 
                                           p-4 flex flex-col sm:flex-row items-center sm:items-start lg:items-center gap-4 text-center sm:text-left"
                                style={{
                                    background: "linear-gradient(112.83deg, rgba(255, 255, 255, 0.82) 0%, rgba(255, 255, 255, 0.8) 110.84%)",
                                }}
                            >
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-[100px] h-[100px] lg:w-[121px] lg:h-[121px] rounded-[12px] overflow-hidden  border-[0.5px] border-[#DCD7D7]">
                                        <img
                                            src={avatar}
                                            alt="User"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[43px] h-[39px] bg-white border-[1.5px] border-[#F3F3F3] rounded-lg shadow-sm flex items-center justify-center cursor-pointer" onClick={() => setIsEditProfileOpen(true)}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#34A4B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="#34A4B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Name and Email */}
                                <div className="flex flex-col">
                                    <h2 className="text-[#2D3748] text-[20px] sm:text-[24px] lg:text-[36px] font-normal leading-[140%]">
                                        {name}
                                    </h2>
                                    <p className="text-[#718096] text-[13px] sm:text-[15px] leading-[140%] break-all">
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Row: Profile Info + Historial */}
                        <div className="flex flex-col xl:flex-row gap-6 lg:mt-24 xl:mt-0"> {/* lg:mt-24 compensates for absolute card height on desktop */}

                            {/* Profile Info Card */}
                            <div className="w-full xl:w-[527px] bg-[#F0F0F0]/45 rounded-[17px] p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-[#2D3748] text-lg sm:text-xl font-medium">Información personal</h3>
                                </div>
                                <div className="w-full h-px bg-[#404040] opacity-50 mb-6"></div>
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                                    <div className="flex flex-col gap-2">
                                        <h4 className="text-[#2D3748] text-xl sm:text-2xl font-normal mb-2">{name}</h4>
                                        <div className="flex flex-col gap-2 text-[#2D3748] text-sm sm:text-base font-medium">
                                            <p><span className="text-[#2D3748] opacity-70">Nombre:</span> {firstName}</p>
                                            <p><span className="text-[#2D3748] opacity-70">Apellido:</span> {lastName}</p>
                                            <p><span className="text-[#2D3748] opacity-70">Cédula:</span> {profile?.cedula_usuario || ""}</p>
                                            <p><span className="text-[#2D3748] opacity-70">Teléfono:</span> {phone}</p>
                                            <p><span className="text-[#2D3748] opacity-70">Tel. Alternativo:</span> {altPhone}</p>
                                            <p><span className="text-[#2D3748] opacity-70">Correo:</span> <span className="break-all">{email}</span></p>
                                            <p><span className="text-[#2D3748] opacity-70 mt-2 block border-t border-gray-300/50 pt-2">Miembro desde: {joinDate}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Historial de Solicitudes Card */}
                            <div className="w-full">
                                <HistorialSolicitudesCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmationCard
                open={isLogoutOpen}
                title="¿Está seguro de que quiere"
                highlight="cerrar sesión?"
                buttonLabel="Sí"
                onButtonClick={() => {
                    setIsLogoutOpen(false);
                    logout();
                    navigate("/");
                }}
                secondaryLabel="No"
                onSecondaryClick={() => setIsLogoutOpen(false)}
            />
            <ConfirmationCard
                open={isDeleteOpen}
                title="¿Está seguro de que quiere"
                highlight="eliminar su cuenta?"
                description="¡Esto borrará tus datos"
                descriptionHighlight="para siempre!"
                buttonLabel="Sí, eliminar"
                onButtonClick={async () => {
                    const success = await deleteAccount();
                    if (success) {
                        setIsDeleteOpen(false);
                        navigate("/");
                    }
                }}
                secondaryLabel="No"
                onSecondaryClick={() => setIsDeleteOpen(false)}
            />

            <ConfirmationCard
                open={isDeactivateOpen}
                title="¿Está seguro de que quiere"
                highlight="desactivar su cuenta?"
                description="Tu cuenta quedará en pausa, pero podrás"
                descriptionHighlight="reactivarla en el futuro."
                buttonLabel="Sí, desactivar"
                onButtonClick={async () => {
                    const success = await deactivateAccount();
                    if (success) {
                        setIsDeactivateOpen(false);
                        navigate("/");
                    }
                }}
                secondaryLabel="Cancelar"
                onSecondaryClick={() => setIsDeactivateOpen(false)}
            />

            {/* Application Modals */}
            <Modal
                isOpen={isEditProfileOpen}
                onClose={() => setIsEditProfileOpen(false)}
                title="Editar Información Personal"
            >
                {profile && (
                    <EditProfileModal
                        profile={profile}
                        onClose={() => setIsEditProfileOpen(false)}
                        onSuccess={(updatedProfile) => {
                            setProfile(updatedProfile);
                            setIsEditProfileOpen(false);
                        }}
                    />
                )}
            </Modal>

            <Modal
                isOpen={isChangePasswordOpen}
                onClose={() => setIsChangePasswordOpen(false)}
                title="Cambiar Contraseña"
            >
                <ChangePasswordModal
                    onClose={() => setIsChangePasswordOpen(false)}
                    onSuccess={() => {
                        setIsChangePasswordOpen(false);
                        // Optional: Show a small toast/success message
                    }}
                />
            </Modal>
        </MainLayout>
    );
};

export default Dashboard;
