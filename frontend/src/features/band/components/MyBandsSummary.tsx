import SectionTitle from "../../../components/ui/typography/SectionTitle";
import type { Pagination } from "../../../shared/types/pagination.interface";
import type { SummaryBand } from "../types";
import BandCardSummary from "./BandCardSummary";

interface MyBandsSummaryProps {
    bandSummary: Pagination<SummaryBand>;
    className?: string;
}

export default function MyBandsSummary({
    bandSummary,
    className,
}: MyBandsSummaryProps) {
    return (
        <section className={className}>
            <SectionTitle title="Mes groupes" />

            {bandSummary.data.length > 0 ? (
                <ul className="mt-4 gap-2 grid grid-cols-1 md:grid-cols-2">
                    {bandSummary.data.map((band: SummaryBand) => (
                        <BandCardSummary key={band.id} band={band} />
                    ))}
                </ul>
            ) : (
                <p className="mt-2 italic font-bold text-base-content/70">
                    Vous n'avez pas de groupe pour le moment
                </p>
            )}
        </section>
    );
}
