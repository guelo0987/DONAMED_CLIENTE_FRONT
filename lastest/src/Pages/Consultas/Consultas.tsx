import { Loader2, Search } from "lucide-react";
import { MainLayout } from "../../components/layout/MainLayout";
import { Button } from "../../components/ui/buttons";
import { MedicationDetailModal } from "../../components/ui/medication-detail-modal";
import { DropdownSelect } from "../../components/ui/dropdown-select";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { medicamentoService } from "../../services/medicamentoService";
import type { MedicamentoListItem, MedicamentoDetalle, CategoriaItem } from "../../types/medicamento";
import { getStoragePublicUrl } from "../../utils/storageUrl";
import { useI18n } from "../../i18n/language-context";

// Placeholder para imagen cuando no hay foto_url
const PLACEHOLDER_IMAGE = "/assets/Rectangulo%20Medicamentos.png";

export const Consultas = () => {
    const { t } = useI18n();
    const [searchParams] = useSearchParams();
    const [medicamentos, setMedicamentos] = useState<MedicamentoListItem[]>([]);
    const [categorias, setCategorias] = useState<CategoriaItem[]>([]);
    const [selectedMedicamento, setSelectedMedicamento] = useState<MedicamentoDetalle | null>(null);
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [categoriaFilter, setCategoriaFilter] = useState<string>(searchParams.get("categoria") || "");
    const [loading, setLoading] = useState(false);
    const [loadingDetailFor, setLoadingDetailFor] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const buscarMedicamentos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await medicamentoService.buscarMedicamentos({
                q: searchQuery.trim() || undefined,
                categoria: categoriaFilter ? parseInt(categoriaFilter, 10) : undefined,
                page: 1,
                limit: 50,
            });
            setMedicamentos(res.data?.medicamentos ?? []);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : t("consultas.searchError");
            setError(msg);
            setMedicamentos([]);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, categoriaFilter]);

    useEffect(() => {
        medicamentoService.listarCategorias()
            .then((res) => setCategorias(res.data ?? []))
            .catch(() => setCategorias([]));
    }, []);

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => buscarMedicamentos(), 400);
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [searchQuery, categoriaFilter, buscarMedicamentos]);

    const handleVerDetalles = async (codigo: string) => {
        setLoadingDetailFor(codigo);
        try {
            const res = await medicamentoService.obtenerMedicamento(codigo);
            setSelectedMedicamento(res.data ?? null);
        } catch {
            setSelectedMedicamento(null);
        } finally {
            setLoadingDetailFor(null);
        }
    };

    return (
        <MainLayout className="bg-[#FFFFFF]">
            <section className="w-full px-4 sm:px-5 md:px-6 lg:px-7 py-6 lg:py-8">
                <div className="max-w-[1060px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] gap-5 lg:gap-8 items-center lg:justify-items-center">
                        <div className="space-y-7 max-w-[760px]">
                            <h1 className="text-[#2D3748] text-[32px] md:text-[34px] xl:text-[38px] font-semibold leading-tight">
                                <span className="text-[#34A4B3] font-['Merienda']">
                                    {t("consultas.title.highlight")}
                                </span>
                                {t("consultas.title.rest")}
                            </h1>

                            <div className="bg-white backdrop-blur-[20px] rounded-[18px] lg:rounded-[22px] shadow-[0px_18px_40px_rgba(0,0,0,0.08)] p-4 lg:p-5 border border-gray-50/50 max-w-[760px]">
                                <p className="text-[#404040] font-semibold text-[12px] lg:text-[13px] mb-3.5 [font-family:'Poppins',sans-serif] ml-1 text-center lg:text-left">
                                    {t("consultas.searchTitle")}
                                </p>
                                <form
                                    onSubmit={(e) => { e.preventDefault(); buscarMedicamentos(); }}
                                    className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(190px,220px)_auto] gap-3 items-center"
                                >
                                    <div className="w-full min-w-0">
                                        <input
                                            type="text"
                                            placeholder={t("consultas.searchPlaceholder")}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-[#F3F4F6] rounded-full px-5 lg:px-6 py-3 lg:py-3.5 text-[#4A5568] placeholder:text-[#A0AEC0] text-[13px] lg:text-[14px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 transition-all"
                                        />
                                    </div>
                                    <div className="w-full min-w-0 relative">
                                        <DropdownSelect
                                            value={categoriaFilter}
                                            onChange={setCategoriaFilter}
                                            options={categorias.map((c) => ({ value: c.id.toString(), label: c.nombre }))}
                                            placeholder={t("consultas.allCategories")}
                                            buttonClassName="bg-[#F3F4F6] rounded-full px-5 lg:px-6 py-3 lg:py-3.5 text-[#4A5568] text-[13px] lg:text-[14px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 transition-all"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#34A4B3] text-white px-6 lg:px-8 py-3 lg:py-3.5 rounded-full flex items-center justify-center gap-2 [font-family:'Poppins',sans-serif] font-semibold text-[13px] lg:text-[14px] hover:bg-[#2B93A1] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#34A4B3]/30 w-full lg:w-auto min-w-[135px] disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" /> : <Search className="w-4 h-4 lg:w-5 lg:h-5" />}
                                        {t("common.buscar")}
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="relative hidden lg:flex items-center justify-center w-full">
                            <img
                                src="/banners/Banner%20de%20Consulta.png"
                                alt="Banner de consulta"
                                className="w-full max-w-[360px] h-auto object-contain mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 sm:px-5 md:px-6 lg:px-7 pb-10 mt-7 lg:mt-8">
                {error && (
                    <div className="max-w-[1060px] mx-auto mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {error}
                    </div>
                )}
                <div className="max-w-[1060px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
                    {loading && medicamentos.length === 0 ? (
                        <div className="col-span-full flex justify-center py-12">
                            <Loader2 className="w-10 h-10 text-[#34A4B3] animate-spin" />
                        </div>
                    ) : medicamentos.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-[#718096]">
                            {t("consultas.empty")}
                        </div>
                    ) : (
                        medicamentos.map((med) => (
                            <div
                                key={med.codigo}
                                className="bg-white rounded-[18px] shadow-[0px_10px_28px_rgba(0,0,0,0.12)] border border-[#EFEFEF] px-5 py-6 flex flex-col items-center text-center h-[380px] w-full max-w-[280px] mx-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_16px_36px_rgba(0,0,0,0.14)]"
                            >
                                <div className="relative w-full h-[192px] flex items-center justify-center">
                                    <img
                                        src={PLACEHOLDER_IMAGE}
                                        alt=""
                                        className="absolute w-[205px] h-auto object-contain translate-y-10"
                                    />
                                    <img
                                        src={getStoragePublicUrl(med.foto_url) || PLACEHOLDER_IMAGE}
                                        alt={med.nombre}
                                        className="relative max-h-[190px] object-contain -translate-y-1.5"
                                        onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                                    />
                                </div>
                                <div className="mt-2.5">
                                    <p className="text-[#404040] text-[13px] xl:text-[14px] font-medium">
                                        {med.nombre}
                                    </p>
                                    <p className="text-[#404040] text-[11px] xl:text-[12px] opacity-80">
                                        {med.categorias?.join(", ") || "—"}
                                    </p>
                                </div>
                                <Button
                                    onClick={() => handleVerDetalles(med.codigo)}
                                    disabled={loadingDetailFor === med.codigo}
                                    className="mt-5 w-[120px] h-[34px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[12px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all disabled:opacity-70"
                                >
                                    {loadingDetailFor === med.codigo ? <Loader2 className="w-4 h-4 animate-spin" /> : t("landing.meds.viewDetails")}
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <MedicationDetailModal
                open={!!selectedMedicamento}
                onClose={() => setSelectedMedicamento(null)}
                name={selectedMedicamento?.nombre ?? ""}
                image={getStoragePublicUrl(selectedMedicamento?.foto_url) ?? PLACEHOLDER_IMAGE}
                compuesto={selectedMedicamento?.compuesto_principal ?? undefined}
                viaAdministracion={selectedMedicamento?.via_administracion ?? undefined}
                formaFarmaceutica={selectedMedicamento?.forma_farmaceutica ?? undefined}
                itemCode={selectedMedicamento?.codigo}
                categorias={selectedMedicamento?.categorias}
                enfermedades={selectedMedicamento?.enfermedades}
                description={selectedMedicamento?.descripcion ?? undefined}
                proveedor={selectedMedicamento?.proveedor}
            />
        </MainLayout>
    );
};
