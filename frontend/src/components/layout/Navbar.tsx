import { Link } from "react-router";
import AuthButtons from "./AuthButtons";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-10">
            <nav className="navbar block bg-base-100 shadow-sm w-full px-4 py-6">
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <Link
                        to="/"
                        className="text-2xl font-black tracking-tighter text-primary italic"
                    >
                        MUSIC<span className="text-base-content">RIDER</span>
                    </Link>
                    <AuthButtons />
                </div>
            </nav>
        </header>
    );
}
