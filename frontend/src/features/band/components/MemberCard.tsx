import type { BandMember } from "../types";

export default function MemberCard({ member }: { member: BandMember }) {
    return (
        <li className="flex items-center gap-4 bg-base-300 rounded-lg p-4 w-72">
            <div className="avatar">
                <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="font-black">
                    {member.firstname} {member.lastname}
                </span>
                <span className="text-base-content/50 uppercase font-semibold text-xs">
                    {member.instruments.map((i) => i.label).join(" / ")}
                </span>
            </div>
        </li>
    );
}
