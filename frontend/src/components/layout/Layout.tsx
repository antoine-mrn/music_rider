import { NavLink, Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import Footer from "./Footer";
import { ROUTES } from "../../routes";
import { useAuthStore } from "../../store/auth.store";

const NAVLINKS = [
    { path: ROUTES.PROFILE, label: "Dashboard", end: true },
    { path: ROUTES.BANDS, label: "Mes groupes", end: false },
    { path: ROUTES.RIDER, label: "Mes riders", end: false },
];

export default function PublicLayout() {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="min-h-screen">
            <div className="drawer">
                <input
                    id="nav-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col min-h-screen">
                    {/* Navbar */}
                    <Navbar user={user} navLinks={NAVLINKS} />
                    {/* Page content */}
                    <main className="flex-1 relative">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="nav-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>

                    {user && (
                        <ul className="menu bg-base-200 min-h-full w-80 p-4 pt-16 space-y-4">
                            {/* Sidebar content */}
                            {NAVLINKS.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        onClick={() => {
                                            const navDrawer =
                                                document.getElementById(
                                                    "nav-drawer",
                                                ) as HTMLInputElement;
                                            if (navDrawer)
                                                navDrawer.checked = false;
                                        }}
                                        className={({ isActive }) =>
                                            `text-2xl font-black italic uppercase tracking-tight ${isActive ? "text-base-content" : "text-base-content/50"}`
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
