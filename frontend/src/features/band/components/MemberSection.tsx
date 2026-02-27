import { useState } from "react";
import SectionTitle from "../../../components/ui/typography/SectionTitle";
import type { BandMember } from "../types";
import MemberCard from "./MemberCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "../../../components/ui/button/Button";

const DEFAULT_VISIBLE = 4;

export default function MemberSection({
    memberCount,
    bandMembers,
    className,
}: {
    memberCount: number;
    bandMembers: BandMember[];
    className?: string;
}) {
    const [isAllVisible, setIsAllVisible] = useState(false);

    const membersDisplayed = isAllVisible
        ? bandMembers
        : bandMembers.slice(0, DEFAULT_VISIBLE);

    return (
        <section className={`card card-border border-2 ${className}`}>
            <div className="card-body">
                <div className="card-title gap-4">
                    <SectionTitle title="Musiciens" />
                    <span className="font-bold text-primary">
                        {memberCount}
                    </span>
                    {/* TODO: Ajouter la fonctionnalité d'ajout de membres */}
                    <Button className="ml-auto" typeStyle="outline">
                        + Ajouter
                    </Button>
                </div>

                <ul className="flex gap-4">
                    {membersDisplayed.map((member) => (
                        <MemberCard key={member.id} member={member} />
                    ))}
                </ul>

                {bandMembers.length > DEFAULT_VISIBLE && (
                    <Button
                        onClick={() => setIsAllVisible(!isAllVisible)}
                        className="w-fit mx-auto mt-4"
                        variant="secondary"
                        typeStyle="outline"
                        size="sm"
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
                    </Button>
                )}
            </div>
        </section>
    );
}
