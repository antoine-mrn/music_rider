import SectionTitle from "../ui/typography/SectionTitle";
import BandCardSummary from "./BandCardSummary";

export default function MyBandsSummary() {
    return (
        <section>
            <div className="flex justify-between items-center">
                <SectionTitle title="Mes groupes" />
                <button className="btn btn-primary rounded-2xl shadow-md shadow-primary/20">
                    + Nouveau
                </button>
            </div>

            {/* TODO: Prévoir d'ajuster la grid quand la card aperçu rapide sera là */}
            <section className="mt-4 gap-2 grid grid-cols-1 md:grid-cols-2">
                <BandCardSummary />
                <BandCardSummary />
                <BandCardSummary />
            </section>
        </section>
    );
}
