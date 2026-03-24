import { Calendar, Check, Eye, EyeOff, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/buttons";
import { ConfirmationCard } from "../../components/ui/confirmation-card";
import { DropdownSelect } from "../../components/ui/dropdown-select";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import LandingPage from "../Landing/LandingPage";
import { useAuth } from "../../hooks/useAuth";
import type { RegisterData } from "../../types/auth";
import type { Provincia, Ciudad } from "../../types/geo";
import { geoService } from "../../services/geoService";
import { validarCedulaDominicana, validarContrasena, validarCorreo } from "../../utils/validators";
import { useI18n } from "../../i18n/language-context";

export const CreateAccount = () => {
    const { t, language } = useI18n();
    const isEn = language !== "es";
    const { register, checkCedulaAndEmail, isLoading, error, setError } = useAuth();
    const [showConfirmation, setShowConfirmation] = useState(false);

    const [formData, setFormData] = useState<RegisterData>({
        nombre: "",
        apellidos: "",
        cedula: "",
        fecha_nacimiento: "",
        sexo: "",
        codigoprovincia: "",
        codigociudad: "",
        direccion: "",
        telefono: "",
        telefono_alternativo: "",
        correo: "",
        contrasena: ""
    });
    const [confirmarContrasena, setConfirmarContrasena] = useState("");
    const [showContrasena, setShowContrasena] = useState(false);
    const [showConfirmarContrasena, setShowConfirmarContrasena] = useState(false);

    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [ciudades, setCiudades] = useState<Ciudad[]>([]);
    const [isLoadingGeo, setIsLoadingGeo] = useState(false);

    useEffect(() => {
        const fetchGeoData = async () => {
            setIsLoadingGeo(true);
            try {
                const resProvincias = await geoService.getProvincias();
                if (resProvincias.success && resProvincias.data) {
                    setProvincias(resProvincias.data);
                }
                const resCiudades = await geoService.getCiudades();
                if (resCiudades.success && resCiudades.data) {
                    setCiudades(resCiudades.data);
                }
            } catch (err) {
                console.error("Error cargando datos geográficos:", err);
            } finally {
                setIsLoadingGeo(false);
            }
        };

        fetchGeoData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        setError(null);

        if (!validarCedulaDominicana(formData.cedula)) {
            setError(isEn ? "The ID entered is not valid." : "La cédula ingresada no es válida.");
            return;
        }

        if (!validarCorreo(formData.correo)) {
            setError(t("auth.invalidEmailFormat"));
            return;
        }

        if (formData.contrasena !== confirmarContrasena) {
            setError(isEn ? "Passwords do not match." : "Las contraseñas no coinciden.");
            return;
        }

        if (!validarContrasena(formData.contrasena)) {
            setError(isEn ? "Password must be at least 8 characters." : "La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        // Validación adicional en servidor (evita 409 conflict abortando antes)
        const isDataAvailable = await checkCedulaAndEmail(formData.cedula, formData.correo);
        if (!isDataAvailable) {
            return;
        }

        const success = await register(formData);
        if (success) {
            setShowConfirmation(true);
        }
    };

    return (
        <div className="relative min-h-screen">
            <LandingPage />
            <div className="fixed inset-0 z-50 w-full flex items-center justify-center p-5 sm:p-6 md:p-8 bg-black/40 backdrop-blur-[2px] font-['Poppins']">
                <div className="relative w-full max-w-[1200px] h-[88vh] lg:h-[86vh] bg-white rounded-[24px] lg:rounded-[38px] shadow-2xl overflow-hidden flex flex-col lg:flex-row">
                    <Link
                        to="/"
                        className="absolute top-6 right-6 lg:top-8 lg:right-10 z-50 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 lg:w-8 lg:h-8 text-[#5F6368] hover:text-black" />
                    </Link>

                    <div className="hidden lg:block w-[40%] h-full relative bg-[#40C9DB]">
                        <div className="absolute top-12 left-12 z-30">
                            <img
                                src="/logos/donamed_logo_auth.png"
                                alt="Donamed Logo"
                                className="w-[280px] xl:w-[350px] h-auto object-contain"
                            />
                        </div>

                        <div className="absolute inset-x-0 bottom-0 h-[70%] z-10 flex items-end justify-center overflow-hidden">
                            <img
                                src="/banners/crear%20cuenta%20banner.png"
                                alt="Doctora"
                                className="w-auto h-full object-cover object-bottom translate-y-2"
                            />
                        </div>

                        <div
                            className="absolute bottom-0 w-full h-[40%] z-20 pointer-events-none"
                            style={{
                                background:
                                    "linear-gradient(0deg, #40C9DB -10%, rgba(64, 201, 219, 0) 100%)",
                            }}
                        />
                    </div>

                    <div className="w-full lg:w-[58%] h-full flex flex-col justify-center items-center relative px-12 md:px-14 xl:px-16 py-10 lg:pt-36 overflow-y-auto">
                        <form onSubmit={handleRegister} className="w-full max-w-[620px] space-y-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className="space-y-3 w-full">
                                <h1 className="text-[#404040] text-[20px] md:text-[24px] xl:text-[26px] font-medium leading-[1.2] tracking-normal">
                                    {t("auth.createAccountTitle")}
                                </h1>
                                {error && (
                                    <p className="text-red-500 text-sm">{error}</p>
                                )}
                            </div>

                            <div className="w-full space-y-3.5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{isEn ? "First names" : "Nombres"}</Label>
                                            <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                        </div>
                                        <Input
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            required
                                            placeholder={isEn ? "Your first names" : "Tus nombres"}
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{isEn ? "Last names" : "Apellidos"}</Label>
                                            <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                        </div>
                                        <Input
                                            name="apellidos"
                                            value={formData.apellidos}
                                            onChange={handleChange}
                                            required
                                            placeholder={isEn ? "Your last names" : "Tus apellidos"}
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{isEn ? "ID" : "Cédula"}</Label>
                                            <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                        </div>
                                        <Input
                                            name="cedula"
                                            value={formData.cedula}
                                            onChange={handleChange}
                                            required
                                            placeholder={isEn ? "Identity document" : "Documento de identidad"}
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{isEn ? "Date of Birth" : "Fecha de Nacimiento"}</Label>
                                            <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                        </div>
                                        <div className="relative">
                                            <Input
                                                type="date"
                                                name="fecha_nacimiento"
                                                value={formData.fecha_nacimiento}
                                                onChange={handleChange}
                                                required
                                                className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3 pr-9 appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0"
                                            />
                                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A] pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{isEn ? "Gender" : "Sexo"}</Label>
                                            <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                        </div>
                                        <DropdownSelect
                                            value={formData.sexo}
                                            onChange={(value) => setFormData((prev) => ({ ...prev, sexo: value }))}
                                            placeholder={isEn ? "Gender" : "Sexo"}
                                            options={[
                                                { value: "F", label: isEn ? "Female" : "Femenino" },
                                                { value: "M", label: isEn ? "Male" : "Masculino" },
                                                { value: "O", label: isEn ? "Other" : "Otro" },
                                            ]}
                                            buttonClassName="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium focus:border-[#40C9DB] focus:ring-2 focus:ring-[#40C9DB]/20 transition-all px-3"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{isEn ? "Province" : "Provincia"}</Label>
                                            <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                        </div>
                                        <DropdownSelect
                                            value={formData.codigoprovincia}
                                            onChange={(value) =>
                                                setFormData((prev) => ({ ...prev, codigoprovincia: value, codigociudad: "" }))
                                            }
                                            placeholder={isEn ? "Province (Ex: Distrito Nacional)" : "Provincia (Ej: Distrito Nacional)"}
                                            options={provincias.map((prov) => ({
                                                value: prov.codigoprovincia,
                                                label: prov.nombre,
                                            }))}
                                            disabled={isLoadingGeo}
                                            buttonClassName="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium focus:border-[#40C9DB] focus:ring-2 focus:ring-[#40C9DB]/20 transition-all px-3"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{isEn ? "City" : "Ciudad"}</Label>
                                            <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                        </div>
                                        <DropdownSelect
                                            value={formData.codigociudad}
                                            onChange={(value) => setFormData((prev) => ({ ...prev, codigociudad: value }))}
                                            placeholder={isEn ? "City (Ex: Santo Domingo)" : "Ciudad (Ej: Santo Domingo)"}
                                            options={ciudades
                                                .filter((c) => c.codigoprovincia === formData.codigoprovincia)
                                                .map((ciudad) => ({
                                                    value: ciudad.codigociudad,
                                                    label: ciudad.nombre,
                                                }))}
                                            disabled={isLoadingGeo || !formData.codigoprovincia}
                                            buttonClassName="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium focus:border-[#40C9DB] focus:ring-2 focus:ring-[#40C9DB]/20 transition-all px-3"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{isEn ? "Address" : "Dirección"}</Label>
                                        <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                    </div>
                                    <Input
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleChange}
                                        required
                                        placeholder={isEn ? "Full address" : "Dirección completa"}
                                        className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{isEn ? "Phone" : "Teléfono"}</Label>
                                            <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                        </div>
                                        <Input
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            required
                                            placeholder={isEn ? "Mobile phone" : "Teléfono Celular"}
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{isEn ? "Additional Phone" : "Teléfono Adicional"}</Label>
                                        </div>
                                        <Input
                                            name="telefono_alternativo"
                                            value={formData.telefono_alternativo}
                                            onChange={handleChange}
                                            placeholder={isEn ? "Secondary phone" : "Teléfono Secundario"}
                                            className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2">
                                        <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{t("auth.email")}</Label>
                                        <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                    </div>
                                    <Input
                                        type="email"
                                        name="correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                        required
                                        placeholder={t("auth.emailPlaceholder")}
                                        className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{t("auth.password")}</Label>
                                            <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                        </div>
                                        <div className="relative">
                                            <Input
                                                type={showContrasena ? "text" : "password"}
                                                name="contrasena"
                                                value={formData.contrasena}
                                                onChange={handleChange}
                                                required
                                                placeholder={t("auth.passwordPlaceholder")}
                                                className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowContrasena((prev) => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c] transition-colors"
                                                aria-label={showContrasena ? t("auth.hidePassword") : t("auth.showPassword")}
                                            >
                                                {showContrasena ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <Label className="text-[#404040] text-[12px] xl:text-[13px] font-medium">{isEn ? "Confirm Password" : "Confirmar Contraseña"}</Label>
                                            <img src="/assets/plus_icon.png" alt="required" className="w-2 h-2 lg:w-3 lg:h-3" />
                                        </div>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmarContrasena ? "text" : "password"}
                                                value={confirmarContrasena}
                                                onChange={(e) => setConfirmarContrasena(e.target.value)}
                                                required
                                                placeholder={isEn ? "Confirm your password" : "Confirmar tu contraseña"}
                                                className="h-[36px] xl:h-[40px] w-full bg-[#F8F7F7] border-[#DCD7D7] rounded-[10px] text-left text-[#9A9A9A] text-[12px] xl:text-[13px] font-medium placeholder:text-[#9A9A9A]/80 focus:border-[#40C9DB] transition-all px-3 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmarContrasena((prev) => !prev)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#34A4B3] hover:text-[#2d8f9c] transition-colors"
                                                aria-label={showConfirmarContrasena ? t("auth.hidePassword") : t("auth.showPassword")}
                                            >
                                                {showConfirmarContrasena ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <label className="flex items-center gap-3 text-[#404040] text-[11px] xl:text-[12px] font-medium cursor-pointer">
                                        <input
                                            type="checkbox"
                                            required
                                            className="peer sr-only"
                                        />
                                        <span className="h-4 w-4 rounded-[4px] border border-[#DCD7D7] bg-white flex items-center justify-center transition-colors text-transparent peer-checked:bg-[#34A4B3] peer-checked:border-[#34A4B3] peer-checked:text-white">
                                            <Check className="w-3 h-3" strokeWidth={3.2} />
                                        </span>
                                        <span>
                                            {t("auth.acceptTerms")} <Link to="/" className="text-[#34A4B3] hover:underline">{t("auth.termsAndConditions")}</Link>
                                        </span>
                                    </label>

                                    <div className="flex justify-center lg:justify-center mt-2">
                                        <Button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] disabled:opacity-50 rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                                        >
                                            {isLoading ? t("auth.registering") : t("auth.registerButton")}
                                        </Button>
                                    </div>

                                    <p className="text-center text-[#404040] text-[11px] xl:text-[12px] font-medium mt-1">
                                        {t("auth.hasAccountQ")} <Link to="/iniciar-sesion" className="text-[#34A4B3] hover:underline">{t("auth.signInLink")}</Link>
                                    </p>
                                </div>
                            </div>
                        </form>

                        <ConfirmationCard
                            open={showConfirmation}
                            title={t("auth.accountCreated")}
                            highlight={t("auth.successfully")}
                            description={t("auth.verifyEmailDescription")}
                            buttonLabel={t("auth.goToSignIn")}
                            to="/iniciar-sesion"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
