import { Link, NavLink } from "react-router";
import AvatarIcon from "./AvatarIcon";
import { useAuthStore } from "../../store/auth.store";
import AuthButtonsWrapper from "./AuthButtonsWrapper";
import { ROUTES } from "../../routes";

export default function Navbar({
    navLinks,
}: {
    navLinks: { path: string; label: string; end: boolean }[];
}) {
    const user = useAuthStore((state) => state.user);

    return (
        <header className="fixed w-full top-0 z-10 bg-base-200">
            <nav className="navbar block shadow-sm w-full px-4 py-6">
                <div className="flex gap-4 items-center max-w-7xl mx-auto">
                    {/* Le déplacer dans le layout de création de Rider  */}
                    {/* {withDrawer && (
                        <label
                            htmlFor="side-drawer"
                            className="drawer-button btn border-0 xl:hidden"
                        >
                            <PanelRightClose />
                        </label>
                    )} */}

                    <div className="flex-none md:hidden">
                        <label
                            htmlFor="nav-drawer"
                            aria-label="open sidebar"
                            className="btn btn-square btn-ghost"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>

                    <Link
                        to={ROUTES.HOME}
                        className="text-2xl font-black tracking-tighter text-primary italic"
                    >
                        MUSIC<span className="text-base-content">RIDER</span>
                    </Link>

                    <ul className="hidden items-center gap-4 md:flex md:ml-16 md:gap-8">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    end={link.end}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `relative font-black uppercase tracking-tight cursor-pointer group transition-colors hover:text-base-content ${isActive ? "text-base-content" : "text-base-content/50"}`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.label}
                                            <span
                                                className={`absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full ${isActive ? "w-full" : "w-0"}`}
                                            />
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {user ? <AvatarIcon user={user} /> : <AuthButtonsWrapper />}
                </div>
            </nav>
        </header>
    );
}
