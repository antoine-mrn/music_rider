import type { ReactNode } from "react";
import { NavLink } from "react-router";
import { useAuthStore } from "../../store/auth.store";
import { APP_NAVLINKS } from "../../shared/constantes/navigation";

interface MobileAppDrawerprops {
    children: ReactNode;
}

export default function MobileAppDrawer({ children }: MobileAppDrawerprops) {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="drawer">
            <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col min-h-screen">
                {children}
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
                        {APP_NAVLINKS.map((link, index) => (
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
    );
}
