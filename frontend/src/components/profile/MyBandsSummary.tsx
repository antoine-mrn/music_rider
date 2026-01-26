import SectionTitle from "../ui/typography/SectionTitle";
import BandCardSummary from "./BandCardSummary";

export default function MyBandsSummary() {
    return (
        <section>
            <div className="flex justify-between items-center">
                <SectionTitle title="Mes groupes" />
                <button className="btn btn-primary rounded-lg">
                    + <span className="hidden md:inline">Nouveau</span>
                </button>
            </div>

            {/* TODO: PRévoir un bouton load more pour les groupes */}
            <section className="mt-4 gap-2 grid grid-cols-1 md:grid-cols-2">
                <BandCardSummary />
                <BandCardSummary />
                <BandCardSummary />
            </section>
        </section>
    );
}
