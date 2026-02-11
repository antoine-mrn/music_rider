import { useNavigate } from "react-router";
import type { SummaryBand } from "../types";

export default function BandCardSummary({ band }: { band: SummaryBand }) {
    const navigate = useNavigate();

    return (
        <li
            onClick={() => navigate(`/band/${band.id}`)}
            className="card w-full cursor-pointer card-border border-2 p-4 hover:border-primary/30 transition"
        >
            <div className="card-body">
                {/* Haut de card */}
                <div className="flex items-center justify-between gap-4">
                    <div className="rounded-xl bg-primary/8 text-4xl p-3">
                        🎸
                    </div>
                    <span className="badge rounded-2xl italic font-bold">
                        {band.userRole}
                    </span>
                </div>

                {/* Groupe & genre */}
                <div>
                    <h3 className="font-bold text-lg">{band.label}</h3>
                    <h4 className="text-base-content/50 font-bold text-md">
                        {band.musicStyle.label}
                    </h4>
                </div>

                {/* TODO: Est-ce que je met le nombre de personnes dans le groupe ?  */}
                {/* Nombre de personnes */}
                {/* <div className="avatar-group -space-x-6">
                    <div className="avatar">
                        <div className="w-12">
                            <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                        </div>
                    </div>
                    <div className="avatar avatar-placeholder">
                        <div className="bg-neutral text-neutral-content w-12">
                            <span>+99</span>
                        </div>
                    </div>
                </div> */}
            </div>
        </li>
    );
}
