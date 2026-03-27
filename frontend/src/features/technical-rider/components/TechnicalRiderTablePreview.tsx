import { ChevronRight } from "lucide-react";
import {
    RIDER_STATUS_COLORS,
    RIDER_STATUS_LABELS,
} from "../../../shared/constantes/rider-status";
import type { SummaryTechnicalRider } from "../types";
import { Link } from "react-router";
import { ROUTES } from "../../../routes";

interface TechnicalRiderTablePreviewProps {
    technicalRiders: SummaryTechnicalRider[] | null;
}

export default function RecentTechnicalRider({
    technicalRiders,
}: TechnicalRiderTablePreviewProps) {
    return technicalRiders && technicalRiders.length > 0 ? (
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-4">
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
                                {new Date(rider.updatedAt).toLocaleString("fr")}
                            </td>
                            <td>
                                <Link to={ROUTES.RIDER_GENERAL(rider.id)}>
                                    <ChevronRight className="rounded-full cursor-pointer p-2 w-10 h-10 hover:bg-neutral-content hover:text-primary" />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ) : (
        <p className="mt-2 italic font-bold text-base-content/70">
            Aucune fiches techniques
        </p>
    );
}
