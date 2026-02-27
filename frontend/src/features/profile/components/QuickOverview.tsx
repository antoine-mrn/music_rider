interface QuickOverviewProps {
    overview: {
        totalBands: number;
        totalTechnicalRiders: number;
    };
    className?: string;
}

export default function QuickOverview({
    overview,
    className,
}: QuickOverviewProps) {
    return (
        <article
            className={`card bg-info-content text-neutral-content ${className}`}
        >
            <div className="card-body">
                <h2 className="card-title italic font-black text-xl">
                    Aperçu rapide
                </h2>
                <div className="flex flex-col gap-4 mt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-neutral-content/70 uppercase tracking-widest">
                            Groupes
                        </span>
                        <span className="text-2xl font-black tracking-tighter italic">
                            {overview.totalBands.toString().padStart(2, "0")}
                        </span>
                    </div>
                    <div className="w-full h-0.5 bg-neutral-content/70"></div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-neutral-content/70 uppercase tracking-widest">
                            Fiches
                        </span>
                        <span className="text-2xl font-black tracking-tighter italic">
                            {overview.totalTechnicalRiders
                                .toString()
                                .padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}
