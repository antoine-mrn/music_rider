interface QuickOverviewProps {
    overview: {
        totalBands: number;
        totalTechnicalRiders: number;
    };
}

export default function QuickOverview({ overview }: QuickOverviewProps) {
    return (
        <article className="card w-full h-fit bg-info-content text-neutral-content sm:w-64 lg:w-80">
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
