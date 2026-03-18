import { ChevronRight } from "lucide-react";
import {
    RIDER_STATUS_COLORS,
    RIDER_STATUS_LABELS,
} from "../../../shared/constantes/rider-status";
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
                            <th>Titre</th>
                            <th>Projet</th>
                            <th>Catégorie</th>
                            <th>Statut</th>
                            <th>Dernière modif.</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {technicalRiders.map((rider: SummaryTechnicalRider) => (
                            <tr key={rider.id}>
                                <th className="italic font-bold min-w-36 lg:w-auto">
                                    {rider.title}
                                </th>
                                <td className="font-medium uppercase">
                                    {rider.band.label}
                                </td>
                                <td className="font-medium uppercase">
                                    {rider.riderCategory.label}
                                </td>
                                <td className="font-medium">
                                    <span
                                        className={`badge ${RIDER_STATUS_COLORS[rider.status]}`}
                                    >
                                        {RIDER_STATUS_LABELS[rider.status]}
                                    </span>
                                </td>
                                <td>
                                    {new Date(rider.updatedAt).toLocaleString(
                                        "fr",
                                    )}
                                </td>
                                <td className="">
                                    <ChevronRight className="rounded-full cursor-pointer p-2 w-10 h-10 hover:bg-neutral-content hover:text-primary" />
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
