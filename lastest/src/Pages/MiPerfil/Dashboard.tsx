import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MainLayout } from "../../components/layout/MainLayout";
import { HistorialSolicitudesCard } from "../../components/HistorialSolicitudesCard";
import { ConfirmationCard } from "../../components/ui/confirmation-card";
import { useAuth } from "../../hooks/useAuth";
import type { UserProfile } from "../../types/user";
import { getStoragePublicUrl } from "../../utils/storageUrl";
import { Modal } from "../../components/ui/modal";
import { EditProfileModal } from "./components/EditProfileModal";
import { ChangePasswordModal } from "./components/ChangePasswordModal";
import { useI18n } from "../../i18n/language-context";

const Dashboard = () => {
    const { t } = useI18n();
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

    const name = profile ? `${profile.persona.nombre} ${profile.persona.apellidos}` : user?.nombre_completo || t("detail.loadingProfile");
    const email = profile ? profile.correo : user?.correo || "";
    const phone = profile ? profile.persona.telefono : "";
    const firstName = profile ? profile.persona.nombre : "";
    const lastName = profile ? profile.persona.apellidos : "";
    const avatar = getStoragePublicUrl(profile?.foto_url || user?.foto_url) || "/assets/user_header.png";
    const joinDate = profile?.creado_en ? new Date(profile.creado_en).toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' }) : t("dashboard.unknown");
    const altPhone = profile?.persona.telefono_alternativo || t("dashboard.notSpecified");

    return (
        <MainLayout className="font-['Poppins']">
            <div className="max-w-[1240px] w-full mx-auto relative pt-6 lg:pt-10 pb-16 px-4 sm:px-5 lg:px-6">
                <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">

                    {/* Sidebar - Desktop: Left Side, Mobile: Bottom Section (Quick Actions) */}
                    <aside className="w-full lg:w-[300px] flex-shrink-0 bg-white border border-[#E8EDF3] rounded-[16px] p-5 md:p-6 flex flex-col order-2 lg:order-1 lg:min-h-[560px] shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
                        <h3 className="text-[#2D3748] font-medium text-[15px] mb-5">
                            {t("dashboard.manageAccount")}
                        </h3>
                        <div className="w-full h-px bg-[#E2E8F0] mb-5"></div>

                        {/* Menu Items */}
                        <div className="flex flex-col gap-1.5 flex-1">
                            {/* Items same as before */}
                            <div
                                onClick={() => setIsEditProfileOpen(true)}
                                className="flex items-center gap-3 py-3 px-4 bg-[#F0FDFF] border-l-[4px] border-[#40C9DB] rounded-[10px] cursor-pointer"
                            >
                                <img src="/assets/editar_perfil_icon.png" alt="Editar" className="w-6 h-6 object-contain" />
                                <span className="text-[#2D3748] text-[15px]">{t("dashboard.editPersonalInfo")}</span>
                            </div>

                            <div
                                onClick={() => setIsChangePasswordOpen(true)}
                                className="flex items-center gap-3 py-3 px-4 rounded-[10px] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                            >
                                <img src="/assets/cambiar_pass_icon.png" alt="Password" className="w-6 h-6 object-contain" />
                                <span className="text-[#2D3748] text-[15px]">{t("dashboard.changePassword")}</span>
                            </div>

                            <div
                                onClick={() => setIsDeactivateOpen(true)}
                                className="flex items-center gap-3 py-3 px-4 rounded-[10px] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                            >
                                <img src="/assets/desactivar_cuenta_icon.png" alt="Desactivar" className="w-6 h-6 object-contain" />
                                <span className="text-[#2D3748] text-[15px]">{t("dashboard.deactivateAccount")}</span>
                            </div>

                            <div className="flex-1 lg:block"></div>

                            <button
                                type="button"
                                onClick={() => setIsLogoutOpen(true)}
                                className="flex items-center gap-3 py-3 px-4 rounded-[10px] hover:bg-[#F8FAFC] transition-colors cursor-pointer w-full text-left"
                            >
                                <img src="/assets/log_out_icon.png" alt="Logout" className="w-6 h-6 object-contain" />
                                <span className="text-[#2D3748] text-[15px]">{t("dashboard.logout")}</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsDeleteOpen(true)}
                                className="w-full bg-[#1C5961] text-white py-3 px-6 rounded-[12px] text-[15px] hover:bg-[#164950] transition-colors mt-4"
                            >
                                {t("dashboard.deleteAccount")}
                            </button>
                        </div>
                    </aside>

                    {/* Main Area - Desktop: Right Side, Mobile: Top Section */}
                    <div className="flex-1 w-full flex flex-col gap-5 lg:gap-6 order-1 lg:order-2">

                        {/* Profile Banner & Card Wrapper */}
                        <div className="relative w-full flex flex-col">
                            {/* Banner Background */}
                            <div className="w-full h-[165px] sm:h-[190px] lg:h-[220px] rounded-[16px] overflow-hidden relative z-0 border border-[#D7E6EA] shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
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
                                           mt-[-56px] mx-4 lg:mt-0 lg:mx-0
                                           lg:left-[6%] lg:top-[40%] 
                                           w-auto lg:w-[56%] max-w-[650px] 
                                           bg-white/80 backdrop-blur-[10.5px] 
                                           rounded-[14px] border border-[#E8EDF3] shadow-[0_10px_26px_rgba(15,23,42,0.08)] 
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
                                    <h2 className="text-[#2D3748] text-[20px] sm:text-[24px] lg:text-[34px] font-medium leading-[125%]">
                                        {name}
                                    </h2>
                                    <p className="text-[#64748B] text-[13px] sm:text-[14px] leading-[140%] break-all">
                                        {email}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Content Row: Profile Info + Historial */}
                        <div className="flex flex-col xl:flex-row gap-5 lg:gap-6 lg:mt-24 xl:mt-0">

                            {/* Profile Info Card */}
                            <div className="w-full xl:w-[48%] bg-white border border-[#E8EDF3] rounded-[16px] p-5 sm:p-6 shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-[#2D3748] text-[19px] sm:text-[20px] font-semibold">{t("dashboard.personalInfo")}</h3>
                                </div>
                                <div className="w-full h-px bg-[#E2E8F0] mb-5"></div>
                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                                    <div className="flex flex-col gap-2">
                                        <h4 className="text-[#2D3748] text-[24px] font-medium mb-1">{name}</h4>
                                        <div className="flex flex-col gap-2 text-[#334155] text-[14px] sm:text-[15px] font-medium">
                                            <p><span className="text-[#64748B]">{t("dashboard.field.firstName")}:</span> {firstName}</p>
                                            <p><span className="text-[#64748B]">{t("dashboard.field.lastName")}:</span> {lastName}</p>
                                            <p><span className="text-[#64748B]">{t("dashboard.field.id")}:</span> {profile?.cedula_usuario || ""}</p>
                                            <p><span className="text-[#64748B]">{t("dashboard.field.phone")}:</span> {phone}</p>
                                            <p><span className="text-[#64748B]">{t("dashboard.field.altPhone")}:</span> {altPhone}</p>
                                            <p><span className="text-[#64748B]">{t("dashboard.field.email")}:</span> <span className="break-all">{email}</span></p>
                                            <p><span className="text-[#64748B] mt-2 block border-t border-[#E2E8F0] pt-2">{t("dashboard.memberSince")}: {joinDate}</span></p>
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
                title={t("dashboard.logoutConfirmTitle")}
                highlight={t("dashboard.logoutConfirmHighlight")}
                buttonLabel={t("dashboard.yes")}
                onButtonClick={() => {
                    setIsLogoutOpen(false);
                    logout();
                    navigate("/");
                }}
                secondaryLabel={t("dashboard.no")}
                onSecondaryClick={() => setIsLogoutOpen(false)}
            />
            <ConfirmationCard
                open={isDeleteOpen}
                title={t("dashboard.logoutConfirmTitle")}
                highlight={t("dashboard.deleteConfirmHighlight")}
                description={t("dashboard.deleteConfirmDesc")}
                descriptionHighlight={t("dashboard.deleteConfirmDescHighlight")}
                buttonLabel={t("dashboard.deleteYes")}
                onButtonClick={async () => {
                    const success = await deleteAccount();
                    if (success) {
                        setIsDeleteOpen(false);
                        navigate("/");
                    }
                }}
                secondaryLabel={t("dashboard.no")}
                onSecondaryClick={() => setIsDeleteOpen(false)}
            />

            <ConfirmationCard
                open={isDeactivateOpen}
                title={t("dashboard.logoutConfirmTitle")}
                highlight={t("dashboard.deactivateConfirmHighlight")}
                description={t("dashboard.deactivateDesc")}
                descriptionHighlight={t("dashboard.deactivateDescHighlight")}
                buttonLabel={t("dashboard.deactivateYes")}
                onButtonClick={async () => {
                    const success = await deactivateAccount();
                    if (success) {
                        setIsDeactivateOpen(false);
                        navigate("/");
                    }
                }}
                secondaryLabel={t("dashboard.cancel")}
                onSecondaryClick={() => setIsDeactivateOpen(false)}
            />

            {/* Application Modals */}
            <Modal
                isOpen={isEditProfileOpen}
                onClose={() => setIsEditProfileOpen(false)}
                title={t("dashboard.editModalTitle")}
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
                title={t("dashboard.changePassword")}
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
