import { EllipsisVertical } from "lucide-react";
import Avatar from "../../../components/ui/avatar/Avatar";
import type { BandMember } from "../types";
import { useState } from "react";
import EditMemberModal from "./EditMemberModal";
import DeleteMemberModal from "./DeleteMemberModal";

export default function MemberCard({
    member,
    canEdit,
}: {
    member: BandMember;
    canEdit: boolean;
}) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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
                {canEdit && (
                    <div className="dropdown dropdown-end rounded-full transition-colors hover:bg-primary">
                        <button
                            tabIndex={0}
                            role="button"
                            className="p-1 cursor-pointer"
                        >
                            <EllipsisVertical size={16} />
                        </button>
                        <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box shadow z-10"
                        >
                            <li>
                                <button onClick={() => setIsEditOpen(true)}>
                                    Modifier
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setIsDeleteOpen(true)}>
                                    Supprimer
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </li>
            <EditMemberModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                member={member}
            />
            <DeleteMemberModal
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                membershipId={member.membershipId}
            />
        </>
    );
}
