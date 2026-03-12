import type { AuthUserInterface } from "../../features/auth/types";
import { useLogout } from "../../features/auth/hooks/useLogout";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import DropdownMenu from "../ui/dropdown/DropdownMenu";
import DropdownMenuTitle from "../ui/dropdown/DropdownMenuTitle";
import { Link } from "react-router";
import { ROUTES } from "../../routes";

export default function AvatarIcon({ user }: { user: AuthUserInterface }) {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    useClickOutside(dropdownRef, () => setIsOpen(false));

    const { mutateAsync: logoutMutation, isPending } = useLogout();

    async function handleLogout() {
        await logoutMutation();
        setIsOpen(false);
    }

    return (
        <div ref={dropdownRef} className="relative ml-auto">
            <div
                tabIndex={0}
                role="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`btn btn-ghost btn-circle avatar hover:border-primary ${isOpen && "border-primary"}`}
            >
                <div className="w-16 rounded-full">
                    <img
                        alt="Avatar"
                        src={
                            user.avatarUrl
                                ? user.avatarUrl
                                : "/default-avatar.png"
                        }
                    />
                </div>
            </div>
            <DropdownMenu isOpen={isOpen}>
                <DropdownMenuTitle title="Mon compte" />
                <div className="px-4 py-3 border-b border-base-200 mb-2">
                    <p className="text-xs font-black uppercase text-base-content/50 tracking-widest">
                        Utilisateur
                    </p>
                    <p className="text-sm font-bold text-base-content truncate">
                        {user.email}
                    </p>
                </div>

                <li>
                    <Link
                        to={ROUTES.PROFILE_EDIT}
                        onClick={() => setIsOpen(false)}
                        className="p-3 hover:bg-primary/8 rounded-lg font-semibold"
                    >
                        Mon Profil
                    </Link>
                </li>

                <li className="mt-1">
                    <button
                        disabled={isPending}
                        onClick={handleLogout}
                        className="p-3 text-error hover:bg-error/8 rounded-lg font-semibold"
                    >
                        {isPending ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            "Déconnexion"
                        )}
                    </button>
                </li>
            </DropdownMenu>
        </div>
    );
}
