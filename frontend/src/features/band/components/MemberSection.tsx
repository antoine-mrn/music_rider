import { useState } from "react";
import SectionTitle from "../../../components/ui/typography/SectionTitle";
import type { BandMember } from "../types";
import MemberCard from "./MemberCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "../../../components/ui/button/Button";
import AddMemberToBandDialog from "./AddMemberToBandDialog";
import { useAuthStore } from "../../../store/auth.store";

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
    const userConnected = useAuthStore((state) => state.user);

    const isLeader = bandMembers.some(
        (m) => m.id === userConnected?.id && m.role === "Leader",
    );

    const [isAllVisible, setIsAllVisible] = useState(false);

    const membersDisplayed = isAllVisible
        ? bandMembers
        : bandMembers.slice(0, DEFAULT_VISIBLE);

    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className={`card card-border border-2 ${className}`}>
            <div className="card-body">
                <div className="card-title gap-4">
                    <SectionTitle title="Musiciens" />
                    <span className="font-bold text-primary">
                        {memberCount}
                    </span>
                    <Button
                        onClick={() => setIsOpen(true)}
                        className="ml-auto"
                        typeStyle="outline"
                    >
                        + Ajouter
                    </Button>
                    <AddMemberToBandDialog
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                    />
                </div>

                <ul className="flex gap-4 flex-wrap">
                    {membersDisplayed.map((member, index) => {
                        const canEdit =
                            isLeader || member.id === userConnected?.id;

                        return (
                            <MemberCard
                                key={index}
                                member={member}
                                canEdit={canEdit}
                            />
                        );
                    })}
                </ul>

                {bandMembers.length > DEFAULT_VISIBLE && (
                    <Button
                        onClick={() => setIsAllVisible(!isAllVisible)}
                        className="w-fit mx-auto mt-4"
                        variant="ghost"
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
