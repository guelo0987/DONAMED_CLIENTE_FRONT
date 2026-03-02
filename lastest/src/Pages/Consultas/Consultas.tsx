import { ChevronDown, Loader2, Search } from "lucide-react";
import { MainLayout } from "../../components/layout/MainLayout";
import { Button } from "../../components/ui/buttons";
import { MedicationDetailModal } from "../../components/ui/medication-detail-modal";
import { useCallback, useEffect, useRef, useState } from "react";
import { medicamentoService } from "../../services/medicamentoService";
import type { MedicamentoListItem, MedicamentoDetalle, CategoriaItem } from "../../types/medicamento";
import { getStoragePublicUrl } from "../../utils/storageUrl";

// Placeholder para imagen cuando no hay foto_url
const PLACEHOLDER_IMAGE = "/assets/Rectangulo%20Medicamentos.png";

export const Consultas = () => {
    const [medicamentos, setMedicamentos] = useState<MedicamentoListItem[]>([]);
    const [categorias, setCategorias] = useState<CategoriaItem[]>([]);
    const [selectedMedicamento, setSelectedMedicamento] = useState<MedicamentoDetalle | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoriaFilter, setCategoriaFilter] = useState<string>("");
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
            const msg = err instanceof Error ? err.message : "Error al buscar medicamentos";
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
            <section className="w-full px-4 py-6 lg:py-10">
                <div className="max-w-[1200px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-10 items-center lg:justify-items-center">
                        <div className="space-y-10 max-w-[700px]">
                            <h1 className="text-[#2D3748] text-[40px] md:text-[40px] xl:text-[44px] font-semibold leading-tight">
                                <span className="text-[#34A4B3] font-['Merienda']">
                                    Encuentra{" "}
                                </span>
                                el apoyo que necesitas para tu bienestar
                            </h1>

                            <div className="bg-white backdrop-blur-[20px] rounded-[20px] lg:rounded-[22px] shadow-[0px_18px_40px_rgba(0,0,0,0.08)] p-5 lg:p-6 border border-gray-50/50 max-w-[700px]">
                                <p className="text-[#404040] font-semibold text-[12px] lg:text-[14px] mb-4 [font-family:'Poppins',sans-serif] ml-2 text-center lg:text-left">
                                    Encuentra medicamentos disponibles
                                </p>
                                <form
                                    onSubmit={(e) => { e.preventDefault(); buscarMedicamentos(); }}
                                    className="flex flex-col lg:flex-row gap-4 items-center"
                                >
                                    <div className="flex-[2] w-full">
                                        <input
                                            type="text"
                                            placeholder="Nombre del Medicamento"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-[#F3F4F6] rounded-full px-6 lg:px-7 py-4 lg:py-4.5 text-[#4A5568] placeholder:text-[#A0AEC0] text-[13px] lg:text-[14px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 transition-all"
                                        />
                                    </div>
                                    <div className="flex-[1] w-full relative">
                                        <select
                                            value={categoriaFilter}
                                            onChange={(e) => setCategoriaFilter(e.target.value)}
                                            className="w-full bg-[#F3F4F6] rounded-full px-6 lg:px-7 py-3 lg:py-3.5 text-[#4A5568] text-[13px] lg:text-[14px] [font-family:'Poppins',sans-serif] outline-none focus:ring-2 focus:ring-[#40C9DB]/30 appearance-none cursor-pointer pr-12 transition-all"
                                        >
                                            <option value="">Todas las categorías</option>
                                            {categorias.map((c) => (
                                                <option key={c.id} value={c.id.toString()}>
                                                    {c.nombre}
                                                </option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 lg:w-5 lg:h-5 text-[#718096] pointer-events-none" />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-[#34A4B3] text-white px-7 lg:px-9 py-3 lg:py-3.5 rounded-full flex items-center justify-center gap-2 [font-family:'Poppins',sans-serif] font-semibold text-[13px] lg:text-[14px] hover:bg-[#2B93A1] transition-all transform hover:scale-[1.02] shadow-lg shadow-[#34A4B3]/30 w-full lg:w-auto min-w-[140px] disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 lg:w-5 lg:h-5 animate-spin" /> : <Search className="w-4 h-4 lg:w-5 lg:h-5" />}
                                        Buscar
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="relative hidden lg:flex items-center justify-center w-full">
                            <img
                                src="/banners/Banner%20de%20Consulta.png"
                                alt="Banner de consulta"
                                className="w-full max-w-[420px] h-auto object-contain mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full px-4 pb-10 mt-10">
                {error && (
                    <div className="max-w-[1200px] mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                        {error}
                    </div>
                )}
                <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
                    {loading && medicamentos.length === 0 ? (
                        <div className="col-span-full flex justify-center py-16">
                            <Loader2 className="w-10 h-10 text-[#34A4B3] animate-spin" />
                        </div>
                    ) : medicamentos.length === 0 ? (
                        <div className="col-span-full text-center py-16 text-[#718096]">
                            No se encontraron medicamentos. Prueba con otros términos o filtros.
                        </div>
                    ) : (
                        medicamentos.map((med) => (
                            <div
                                key={med.codigo}
                                className="bg-white rounded-[20px] shadow-[0px_10px_28px_rgba(0,0,0,0.12)] border border-[#EFEFEF] px-6 py-8 flex flex-col items-center text-center h-[410px] w-full max-w-[300px] mx-auto transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_16px_36px_rgba(0,0,0,0.14)]"
                            >
                                <div className="relative w-full h-[215px] flex items-center justify-center">
                                    <img
                                        src={PLACEHOLDER_IMAGE}
                                        alt=""
                                        className="absolute w-[230px] h-auto object-contain translate-y-12"
                                    />
                                    <img
                                        src={getStoragePublicUrl(med.foto_url) || PLACEHOLDER_IMAGE}
                                        alt={med.nombre}
                                        className="relative max-h-[220px] object-contain -translate-y-2"
                                        onError={(e) => { e.currentTarget.src = PLACEHOLDER_IMAGE; }}
                                    />
                                </div>
                                <div className="mt-3">
                                    <p className="text-[#404040] text-[14px] xl:text-[15px] font-medium">
                                        {med.nombre}
                                    </p>
                                    <p className="text-[#404040] text-[12px] xl:text-[13px] opacity-80">
                                        {med.categorias?.join(", ") || "—"}
                                    </p>
                                </div>
                                <Button
                                    onClick={() => handleVerDetalles(med.codigo)}
                                    disabled={loadingDetailFor === med.codigo}
                                    className="mt-6 w-[130px] h-[36px] bg-[#34A4B3] hover:bg-[#2d8f9c] rounded-[12px] text-white text-[12px] xl:text-[13px] font-medium shadow-none hover:shadow-lg transition-all disabled:opacity-70"
                                >
                                    {loadingDetailFor === med.codigo ? <Loader2 className="w-4 h-4 animate-spin" /> : "Ver detalles"}
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
                subtitle={selectedMedicamento?.compuesto_principal ?? undefined}
                treatment={selectedMedicamento?.via_administracion ?? undefined}
                itemCode={selectedMedicamento?.codigo}
                category={selectedMedicamento?.categorias?.join(", ")}
                description={selectedMedicamento?.descripcion ?? undefined}
            />
        </MainLayout>
    );
};
