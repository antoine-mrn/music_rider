import { Pencil } from "lucide-react";
import Avatar from "../../../components/ui/avatar/Avatar";
import type { BandMember } from "../types";
import { useState } from "react";
import EditMemberModal from "./EditMemberModal";

export default function MemberCard({ member }: { member: BandMember }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <li className="flex items-center gap-4 bg-base-300 rounded-lg p-4 max-w-72 group">
                <Avatar src={member.avatarUrl} size="sm" />
                <div className="flex flex-col">
                    <span className="font-black">
                        {member.firstname} {member.lastname}
                    </span>
                    <span className="text-base-content/50 uppercase font-semibold text-xs">
                        {member.instruments.map((i) => i.label).join(" / ")}
                    </span>
                </div>
                <button
                    role="button"
                    onClick={() => setIsOpen(true)}
                    className="p-2 cursor-pointer rounded-full text-black transition opacity-0 group-hover:opacity-100 hover:bg-primary"
                >
                    <Pencil size={16} />
                </button>
            </li>
            <EditMemberModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                member={member}
            />
        </>
    );
}
