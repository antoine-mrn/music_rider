import type { SummaryTechnicalRider } from "../../features/technical-rider/types";
import type { Pagination } from "../../shared/types/pagination.interface";
import SectionTitle from "../ui/typography/SectionTitle";

interface RecentTechnicalRidersProps {
    technicalRiders: Pagination<SummaryTechnicalRider>;
}

export default function RecentTechnicalRider({
    technicalRiders,
}: RecentTechnicalRidersProps) {
    return (
        <section>
            <SectionTitle title="Fiches techniques récentes" />

            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr className="uppercase">
                            <th>Projet</th>
                            <th>Catégorie</th>
                            <th>Dernière modif.</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {technicalRiders.data.map(
                            (rider: SummaryTechnicalRider) => (
                                <tr key={rider.id}>
                                    <th className="italic font-bold">
                                        {rider.band.label}
                                    </th>
                                    <td className="font-medium uppercase">
                                        {rider.riderCategory.label}
                                    </td>
                                    <td>{rider.updatedAt}</td>
                                    <td className="link link-primary link-hover">
                                        Ouvrir
                                    </td>
                                </tr>
                            ),
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
