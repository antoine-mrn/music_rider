import { Link } from "react-router";
import AuthButtons from "./AuthButtons";
import AvatarIcon from "./AvatarIcon";
import { useAuthStore } from "../../store/auth.store";

export default function Navbar() {
    const user = useAuthStore((state) => state.user);
    console.log("🚀 ~ Navbar ~ user:", user);

    return (
        <header className="sticky top-0 z-10 bg-base-200">
            <nav className="navbar block shadow-sm w-full px-4 py-6">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <Link
                        to="/"
                        className="text-2xl font-black tracking-tighter text-primary italic"
                    >
                        MUSIC<span className="text-base-content">RIDER</span>
                    </Link>
                    {user ? <AvatarIcon /> : <AuthButtons />}
                </div>
            </nav>
        </header>
    );
}
