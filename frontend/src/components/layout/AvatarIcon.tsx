import { Link } from "react-router";
import type { AuthUserInterface } from "../../features/auth/types";
import { useLogout } from "../../features/auth/hooks/useLogout";

export default function AvatarIcon({ user }: { user: AuthUserInterface }) {
    const { mutateAsync: logoutMutation, isPending } = useLogout();

    async function handleLogout() {
        await logoutMutation();
    }

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
            >
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                </div>
            </div>
            <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                    <Link to={`profile/${user.id}`} className="justify-between">
                        Profile
                    </Link>
                </li>
                <li>
                    <button disabled={isPending} onClick={handleLogout}>
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
}
