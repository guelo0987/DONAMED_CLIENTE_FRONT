import { ArrowRight, Search, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { medicamentoService } from "../../services/medicamentoService";
import { DropdownSelect } from "../ui/dropdown-select";
import { getStoragePublicUrl } from "../../utils/storageUrl";
import type { MedicamentoListItem, CategoriaItem } from "../../types/medicamento";
import { useI18n } from "../../i18n/language-context";

const PLACEHOLDER_IMAGE = "/assets/Rectangulo%20Medicamentos.png";

export const HeroSection = () => {
    const navigate = useNavigate();
    const { t } = useI18n();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<MedicamentoListItem[]>([]);
    const [categorias, setCategorias] = useState<CategoriaItem[]>([]);
    const [categoriaFilter, setCategoriaFilter] = useState<string>("");
    const [searching, setSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Load categories on mount
    useEffect(() => {
        medicamentoService.listarCategorias()
            .then((res) => setCategorias(res.data ?? []))
            .catch(() => setCategorias([]));
    }, []);

    // Debounced search as user types
    const searchMeds = useCallback(async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }
        setSearching(true);
        try {
            const res = await medicamentoService.buscarMedicamentos({
                q: query.trim(),
                limit: 6,
            });
            const results = res.data?.medicamentos ?? [];
            setSearchResults(results);
            setShowDropdown(results.length > 0);
        } catch {
            setSearchResults([]);
            setShowDropdown(false);
        } finally {
            setSearching(false);
        }
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }
        debounceRef.current = setTimeout(() => searchMeds(searchQuery), 400);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [searchQuery, searchMeds]);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleResultClick = (med: MedicamentoListItem) => {
        setShowDropdown(false);
        navigate(`/consultas?q=${encodeURIComponent(med.nombre)}`);
    };

    const handleBuscar = () => {
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.set("q", searchQuery.trim());
        if (categoriaFilter) params.set("categoria", categoriaFilter);
        navigate(`/consultas${params.toString() ? `?${params.toString()}` : ""}`);
    };

    return (
        <section className="relative z-[80] w-full max-w-[1060px] mx-auto px-4 sm:px-5 md:px-6 lg:px-7 pb-10 lg:pb-16 overflow-visible">
            <div className="flex flex-col lg:flex-row items-center justify-between min-h-[auto] lg:min-h-[560px] relative">

                {/* Left Content */}
                <div className="flex-1 w-full max-w-[560px] z-20 pt-6 lg:pt-6 flex flex-col items-start text-center lg:text-left pointer-events-none mb-6 lg:mb-0">
                    <div className="pointer-events-auto w-full flex flex-col items-center lg:items-start">
                        {/* Title */}
                        <h1 className="text-[32px] sm:text-[38px] lg:text-[56px] leading-[1.1] mb-3 lg:mb-5">
                            <span className="[font-family:'Merienda',cursive] italic text-[#40C9DB] font-bold">{t("landing.hero.title.highlight")}</span>{" "}
                            <span className="[font-family:'Poppins',sans-serif] font-bold text-[#404040]">{t("landing.hero.title.line1")}</span>
                            <br />
                            <span className="[font-family:'Poppins',sans-serif] font-bold text-[#404040]">{t("landing.hero.title.line2")}</span>
                        </h1>

                        {/* Description */}
                        <p className="text-[#4A5568] text-[13px] lg:text-[16px] leading-[1.6] mb-6 max-w-[460px] [font-family:'Poppins',sans-serif] font-normal mx-auto lg:mx-0">
                            {t("landing.hero.description")}
                        </p>

                        {/* CTA Button */}
                        <button
                            onClick={() => navigate("/consultas")}
                            className="bg-[#34A4B3] text-white px-7 py-2.5 lg:px-8 lg:py-3 rounded-[8px] flex items-center gap-2.5 [font-family:'Poppins',sans-serif] font-medium text-[14px] lg:text-[15px] hover:bg-[#2D8A96] transition-colors shadow-[0px_4px_33px_rgba(64,201,219,0.25)] mb-7 lg:mb-10"
                        >
                            {t("landing.hero.cta")}
                            <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                    </div>
                </div>

                {/* Right Content - Visual Composition */}
                <div className="relative flex-1 w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[620px] aspect-square lg:h-[560px] flex items-center justify-center lg:justify-end lg:mr-[-20px] mt-0 lg:mt-[20px]">

                    {/* Main Visual Container - Responsive Scaling */}
                    <div className="relative w-full h-full lg:w-[560px] lg:h-[560px] lg:translate-y-[10px] lg:translate-x-[10px]">

                        {/* Grey Ring - Background */}
                        <img
                            src="/banners/circle_grey.png"
                            alt=""
                            className="absolute right-[5%] top-[5%] w-[90%] h-[90%] object-contain z-0 opacity-100"
                        />

                        {/* Teal Circle - Middle */}
                        <img
                            src="/assets/eclipse_grande.png"
                            alt=""
                            className="absolute right-[17%] top-[17%] w-[68%] h-[68%] object-contain z-[1]"
                        />

                        {/* Doctors Layer 1: Bodies inside circle (Masked) */}
                        <div className="absolute right-[17%] top-[17%] w-[68%] h-[68%] rounded-full overflow-hidden z-[2] flex items-end justify-center">
                            <img
                                src="/banners/medicos_2_banner.png"
                                alt="Médicos Cuerpo"
                                className="w-[115%] max-w-none h-auto object-cover translate-y-[2%] translate-x-[0%]"
                            />
                        </div>

                        {/* Doctors Layer 2: Full Image / Heads Pop-out (Overlay) */}
                        <img
                            src="/banners/medicos_banner.png"
                            alt="Médicos Completo"
                            className="absolute right-[10%] top-[-8%] w-[80%] h-auto object-contain z-[3]"
                        />

                        {/* Glass Card: Donaciones Seguras */}
                        <div className="absolute top-[18%] left-[5%] lg:left-[12%] bg-white/95 backdrop-blur-[20px] rounded-[12px] px-3 py-2 lg:px-5 lg:py-3 shadow-[0px_10px_30px_rgba(0,0,0,0.08)] z-[4] flex items-center gap-2 lg:gap-3 border border-white/50 animate-fade-in-up scale-90 lg:scale-100 origin-left">
                            <div className="text-[#40C9DB]">
                                <img
                                    src="/assets/donaciones_seguras_icon.png"
                                    alt="Lock"
                                    className="w-5 h-5 lg:w-7 lg:h-7 object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#404040] font-bold text-[11px] lg:text-[13px] [font-family:'Poppins',sans-serif]">
                                    Donaciones Seguras
                                </span>
                                <span className="text-[#9D9D9D] text-[9px] lg:text-[11px] [font-family:'Poppins',sans-serif]">
                                    Revisados y aprobados
                                </span>
                            </div>
                        </div>

                        {/* Glass Card: Solicita Medicamentos */}
                        <div className="absolute bottom-[28%] right-[-2%] lg:right-[2%] bg-white/95 backdrop-blur-[20px] rounded-[12px] px-3 py-2 lg:px-5 lg:py-3 shadow-[0px_10px_30px_rgba(0,0,0,0.08)] z-[4] flex items-center gap-2 lg:gap-3 border border-white/50 animate-fade-in-up delay-100 scale-90 lg:scale-100 origin-right">
                            <div className="text-[#40C9DB]">
                                <img
                                    src="/assets/solicita_medicamento_icon.png"
                                    alt="Meds"
                                    className="w-5 h-5 lg:w-7 lg:h-7 object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#404040] font-bold text-[11px] lg:text-[13px] [font-family:'Poppins',sans-serif]">
                                    Solicita medicamentos
                                </span>
                                <span className="text-[#9D9D9D] text-[9px] lg:text-[11px] [font-family:'Poppins',sans-serif]">
                                    Solicitud en línea
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Section - Overlapping Visuals or Stacked */}
            <div className="relative z-[120] -mt-12 sm:-mt-16 lg:-mt-16 w-full max-w-[860px] mx-auto lg:ml-0 px-2 sm:px-3 lg:px-0">
                <div className="bg-white backdrop-blur-[20px] rounded-[18px] lg:rounded-[22px] shadow-[0px_20px_50px_rgba(0,0,0,0.08)] p-5 lg:p-6 border border-gray-50/50">
                    <p className="text-[#404040] font-semibold text-[13px] lg:text-[15px] mb-3.5 [font-family:'Poppins',sans-serif] ml-1.5 text-center lg:text-left">
                        {t("landing.hero.searchTitle")}
                    </p>

                    <div className="flex flex-col lg:flex-row gap-3.5 items-center">
                        {/* Search Input with Dropdown */}
                        <div className="flex-[2] w-full relative">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder={t("landing.hero.searchPlaceholder")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onFocus={() => {
                                    if (searchResults.length > 0) setShowDropdown(true);
                                }}
                                className="w-full bg-[#F3F4F6] rounded-full px-5 lg:px-7 py-2.5 lg:py-3.5 text-[#4A5568] placeholder:text-[#A0AEC0] text-[13px] lg:text-[14px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 transition-all"
                            />

                            {/* Live Search Dropdown */}
                            {showDropdown && (
                                <div
                                    ref={dropdownRef}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-[16px] shadow-[0px_12px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50 max-h-[320px] overflow-y-auto animate-in fade-in slide-in-from-top-2"
                                >
                                    {searchResults.map((med) => (
                                        <button
                                            key={med.codigo}
                                            onClick={() => handleResultClick(med)}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F0FDFF] transition-colors text-left border-b border-gray-50 last:border-b-0"
                                        >
                                            <div className="w-10 h-10 rounded-[8px] bg-[#F3F4F6] flex-shrink-0 overflow-hidden flex items-center justify-center">
                                                <img
                                                    src={getStoragePublicUrl(med.foto_url) || PLACEHOLDER_IMAGE}
                                                    alt={med.nombre}
                                                    className="w-8 h-8 object-contain"
                                                    onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                                                />
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-[#2D3748] text-[14px] font-medium [font-family:'Poppins',sans-serif] truncate">
                                                    {med.nombre}
                                                </span>
                                                <span className="text-[#A0AEC0] text-[12px] [font-family:'Poppins',sans-serif] truncate">
                                                    {med.categorias?.join(", ") || t("common.sinCategoria")}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Searching indicator */}
                            {searching && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <Loader2 className="w-4 h-4 text-[#40C9DB] animate-spin" />
                                </div>
                            )}
                        </div>

                        {/* Category filter */}
                        <div className="flex-[1] w-full relative">
                            <DropdownSelect
                                value={categoriaFilter}
                                onChange={setCategoriaFilter}
                                options={categorias.map((c) => ({ value: c.id.toString(), label: c.nombre }))}
                                placeholder={t("landing.hero.allCategories")}
                                openUpward
                                buttonClassName="bg-[#F3F4F6] rounded-full px-5 lg:px-7 py-2.5 lg:py-3.5 text-[#4A5568] text-[13px] lg:text-[14px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 transition-all"
                            />
                        </div>

                        <button
                            onClick={handleBuscar}
                            className="bg-[#34A4B3] text-white px-7 lg:px-10 py-2.5 lg:py-3.5 rounded-full flex items-center justify-center gap-2.5 [font-family:'Poppins',sans-serif] font-semibold text-[14px] lg:text-[15px] hover:bg-[#2B93A1] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#34A4B3]/30 w-full lg:w-auto min-w-[135px]"
                        >
                            <Search className="w-4 h-4 lg:w-5 lg:h-5" />
                            {t("common.buscar")}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
