import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import type { UserProfile } from "../../../types/user";
import { Camera, Trash2, Loader2, RefreshCw } from "lucide-react";
import { geoService } from "../../../services/geoService";
import type { Provincia, Ciudad } from "../../../types/geo";
import { getStoragePublicUrl } from "../../../utils/storageUrl";

interface EditProfileModalProps {
    profile: UserProfile;
    onClose: () => void;
    onSuccess: (updatedProfile: UserProfile) => void;
}

export const EditProfileModal = ({ profile, onClose, onSuccess }: EditProfileModalProps) => {
    const { updateProfile, error, setError } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    // Geo states
    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [ciudades, setCiudades] = useState<Ciudad[]>([]);
    const [isLoadingGeo, setIsLoadingGeo] = useState(true);

    // Form states
    const [formData, setFormData] = useState({
        nombre: profile.persona.nombre || "",
        apellidos: profile.persona.apellidos || "",
        telefono: profile.persona.telefono || "",
        direccion: profile.persona.direccion || "",
        codigoprovincia: profile.persona.ciudad?.codigoprovincia || "",
        codigociudad: profile.persona.codigociudad || "",
    });

    // File handling
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(getStoragePublicUrl(profile.foto_url) || profile.foto_url);
    const [removePhoto, setRemovePhoto] = useState(false);

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
            } catch (error) {
                console.error("Error cargando datos geográficos:", error);
            } finally {
                setIsLoadingGeo(false);
            }
        };
        fetchGeoData();
        return () => setError(null);
    }, [setError]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setRemovePhoto(false);
        }
    };

    const handleRemovePhoto = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setRemovePhoto(true);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const data = new FormData();

        // Append text fields
        data.append("nombre", formData.nombre);
        data.append("apellidos", formData.apellidos);
        data.append("telefono", formData.telefono);
        data.append("direccion", formData.direccion);
        data.append("codigociudad", formData.codigociudad);

        // Handle photo logic
        if (selectedFile) {
            data.append("foto", selectedFile);
        } else if (removePhoto) {
            data.append("foto_url", ""); // Sending empty string triggers deletion in backend
        }

        const result = await updateProfile(data);

        if (result) {
            onSuccess(result as UserProfile);
        }
        setIsLoading(false);
    };

    const ciudadesFiltradas = ciudades.filter(
        (ciudad) => ciudad.codigoprovincia === formData.codigoprovincia
    );

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-[12px] border border-red-100 text-sm">
                    {error}
                </div>
            )}

            {/* Photo Upload Section */}
            <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                    <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-100 border-[2px] border-gray-200 flex-shrink-0">
                        <img
                            src={getStoragePublicUrl(previewUrl) || previewUrl || "/assets/user_header.png"}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />
                        <div
                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    onChange={handleFileChange}
                />

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-sm font-medium text-[#40C9DB] hover:text-[#34A4B3] transition-colors flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Cambiar foto
                    </button>
                    {(previewUrl || getStoragePublicUrl(profile.foto_url)) && !removePhoto && (
                        <button
                            type="button"
                            onClick={handleRemovePhoto}
                            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" />
                            Eliminar foto
                        </button>
                    )}
                </div>
                <p className="text-xs text-gray-500 text-center">
                    Formatos soportados: JPG, PNG, GIF o WebP. Max 5MB.
                </p>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        required
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#40C9DB] focus:ring-1 focus:ring-[#40C9DB] outline-none transition-all placeholder:text-gray-400"
                        placeholder="Tu nombre"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Apellidos</label>
                    <input
                        required
                        type="text"
                        value={formData.apellidos}
                        onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#40C9DB] focus:ring-1 focus:ring-[#40C9DB] outline-none transition-all placeholder:text-gray-400"
                        placeholder="Tus apellidos"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Número telefónico</label>
                    <input
                        required
                        type="tel"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#40C9DB] focus:ring-1 focus:ring-[#40C9DB] outline-none transition-all placeholder:text-gray-400"
                        placeholder="Ej. 809-555-5555"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Dirección</label>
                    <input
                        required
                        type="text"
                        value={formData.direccion}
                        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#40C9DB] focus:ring-1 focus:ring-[#40C9DB] outline-none transition-all placeholder:text-gray-400"
                        placeholder="Tu dirección"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 flex justify-between">
                        Provincia
                        {isLoadingGeo && <Loader2 className="w-4 h-4 animate-spin text-[#40C9DB]" />}
                    </label>
                    <div className="relative">
                        <select
                            required
                            name="codigoprovincia"
                            value={formData.codigoprovincia}
                            onChange={(e) => setFormData({ ...formData, codigoprovincia: e.target.value, codigociudad: "" })}
                            disabled={isLoadingGeo || provincias.length === 0}
                            className="w-full h-[52px] bg-white border border-[#DCD7D7] rounded-[10px] px-4 text-[#A0AEC0] text-sm md:text-base outline-none focus:border-[#40C9DB] appearance-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                        >
                            <option value="">Selecciona una provincia</option>
                            {provincias.map((prov) => (
                                <option key={prov.codigoprovincia} value={prov.codigoprovincia}>
                                    {prov.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                            <span className="text-[#A0AEC0]">▼</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 flex justify-between">
                        Ciudad
                        {isLoadingGeo && <Loader2 className="w-4 h-4 animate-spin text-[#40C9DB]" />}
                    </label>
                    <div className="relative">
                        <select
                            required
                            name="codigociudad"
                            value={formData.codigociudad}
                            onChange={(e) => setFormData({ ...formData, codigociudad: e.target.value })}
                            disabled={isLoadingGeo || ciudades.length === 0 || !formData.codigoprovincia}
                            className="w-full h-[52px] bg-white border border-[#DCD7D7] rounded-[10px] px-4 text-[#A0AEC0] text-sm md:text-base outline-none focus:border-[#40C9DB] appearance-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                        >
                            <option value="">Selecciona tu ciudad</option>
                            {ciudadesFiltradas.map((ciudad) => (
                                <option key={ciudad.codigociudad} value={ciudad.codigociudad}>
                                    {ciudad.nombre}
                                </option>
                            ))}
                        </select>
                        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 pointer-events-none">
                            <span className="text-[#A0AEC0]">▼</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button
                    type="button"
                    onClick={onClose}
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-lg bg-[#40C9DB] text-white font-medium hover:bg-[#34A4B3] transition-colors flex items-center justify-center min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Guardar Cambios"}
                </button>
            </div>
        </form>
    );
};
