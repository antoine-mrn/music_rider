import type { SummaryBand } from "../../features/band/types";
import type { Pagination } from "../../shared/types/pagination.interface";
import SectionTitle from "../ui/typography/SectionTitle";
import BandCardSummary from "./BandCardSummary";

interface MyBandsSummaryProps {
    bandSummary: Pagination<SummaryBand>;
}

export default function MyBandsSummary({ bandSummary }: MyBandsSummaryProps) {
    return (
        <section>
            <div className="flex justify-between items-center">
                <SectionTitle title="Mes groupes" />
                <button className="btn btn-primary rounded-lg">
                    + <span className="hidden md:inline">Nouveau</span>
                </button>
            </div>

            {/* TODO: PRévoir un bouton load more pour les groupes */}
            {bandSummary.data ? (
                <ul className="mt-4 gap-2 grid grid-cols-1 md:grid-cols-2">
                    {bandSummary.data.map((band: SummaryBand) => (
                        <BandCardSummary key={band.id} band={band} />
                    ))}
                </ul>
            ) : (
                <p>Pas de groupes</p>
            )}
        </section>
    );
}
