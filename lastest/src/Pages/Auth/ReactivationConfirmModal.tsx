import { Button } from "../../components/ui/buttons";

interface ReactivationConfirmModalProps {
    title: string;
    highlight: string;
    description: string;
    confirmLabel: string;
    cancelLabel: string;
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ReactivationConfirmModal = ({
    title,
    highlight,
    description,
    confirmLabel,
    cancelLabel,
    isLoading = false,
    onConfirm,
    onCancel,
}: ReactivationConfirmModalProps) => {
    return (
        <div className="grid w-full h-full min-h-0 grid-cols-1 md:grid-cols-[40%_60%] bg-white overflow-hidden font-['Poppins']">
            <aside className="relative hidden md:block h-full min-h-0 bg-[#40C9DB] overflow-hidden">
                <img
                    src="/logos/donamed_logo_auth.png"
                    alt="Donamed Logo"
                    className="absolute top-8 left-8 lg:top-10 lg:left-10 z-30 w-[220px] lg:w-[255px] xl:w-[290px] h-auto object-contain"
                />

                <div className="absolute inset-x-0 bottom-0 h-[68%] lg:h-[72%] z-10 flex items-end justify-start pl-4 lg:pl-8 overflow-hidden">
                    <img
                        src="/banners/restablecer_pass_banner.png"
                        alt="Doctora"
                        className="w-auto h-full object-contain object-bottom"
                    />
                </div>

                <div
                    className="absolute bottom-0 w-full h-[40%] z-20 pointer-events-none"
                    style={{
                        background: "linear-gradient(0deg, #40C9DB -10%, rgba(64, 201, 219, 0) 100%)",
                    }}
                />
            </aside>

            <section className="min-h-0 h-full bg-white flex items-center justify-center px-8 md:px-10 lg:px-14 xl:px-20 py-8 overflow-y-auto">
                <div className="w-full max-w-[420px] text-center">
                    <h1 className="text-[#2D3748] text-[24px] md:text-[28px] font-medium leading-[1.15]">
                        {title}
                    </h1>
                    <p className="text-[#34A4B3] text-[22px] md:text-[26px] font-semibold mt-1 font-['Merienda']">
                        {highlight}
                    </p>
                    <p className="text-[#2D3748] text-[13px] md:text-[14px] font-medium mt-3 leading-relaxed">
                        {description}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 items-center">
                        <Button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className="w-full md:w-[220px] h-[38px] bg-[#34A4B3] hover:bg-[#2d8f9c] disabled:opacity-50 rounded-[10px] text-white text-[12px] font-medium shadow-none hover:shadow-lg transition-all"
                        >
                            {isLoading ? "..." : confirmLabel}
                        </Button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="text-[#34A4B3] text-[12px] font-medium hover:underline"
                        >
                            {cancelLabel}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};
