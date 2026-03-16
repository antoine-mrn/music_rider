import type { SummaryTechnicalRider } from "../types";

interface TechnicalRiderTablePreviewProps {
    technicalRiders: SummaryTechnicalRider[] | null;
}

export default function RecentTechnicalRider({
    technicalRiders,
}: TechnicalRiderTablePreviewProps) {
    return (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
            {technicalRiders ? (
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
                        {technicalRiders.map((rider: SummaryTechnicalRider) => (
                            <tr key={rider.id}>
                                <th className="italic font-bold">
                                    {rider.band.label}
                                </th>
                                <td className="font-medium uppercase">
                                    {rider.riderCategory.label}
                                </td>
                                <td>
                                    {new Date(rider.updatedAt).toLocaleString(
                                        "fr",
                                    )}
                                </td>
                                <td className="link link-primary link-hover">
                                    Ouvrir
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="mt-4">Aucune fiches techniques récentes</p>
            )}
        </div>
    );
}
