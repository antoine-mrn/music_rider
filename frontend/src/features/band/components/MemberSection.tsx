import { useState } from "react";
import SectionTitle from "../../../components/ui/typography/SectionTitle";
import type { BandMember } from "../types";
import MemberCard from "./MemberCard";
import { ChevronDown, ChevronUp } from "lucide-react";

const DEFAULT_VISIBLE = 1;

export default function MemberSection({
    memberCount,
    bandMembers,
}: {
    memberCount: number;
    bandMembers: BandMember[];
}) {
    const [isAllVisible, setIsAllVisible] = useState(false);

    const membersDisplayed = isAllVisible
        ? bandMembers
        : bandMembers.slice(0, DEFAULT_VISIBLE);

    return (
        <section className="card card-border border-2">
            <div className="card-body">
                <div className="card-title gap-4">
                    <SectionTitle title="Musiciens" />
                    <span className="font-bold text-primary">
                        {memberCount}
                    </span>
                    <button className="ml-auto btn btn-primary btn-outline rounded-lg">
                        + Ajouter
                    </button>
                </div>

                <ul className="flex gap-4">
                    {membersDisplayed.map((member) => (
                        <MemberCard key={member.id} member={member} />
                    ))}
                </ul>

                {bandMembers.length > DEFAULT_VISIBLE && (
                    <button
                        onClick={() => setIsAllVisible(!isAllVisible)}
                        className="w-fit mx-auto mt-4 btn btn-secondary btn-sm btn-outline rounded-lg"
                    >
                        {isAllVisible ? (
                            <>
                                <span>Voir moins</span>
                                <ChevronUp />
                            </>
                        ) : (
                            <>
                                <span>Voir plus</span>
                                <ChevronDown />
                            </>
                        )}
                    </button>
                )}
            </div>
        </section>
    );
}
