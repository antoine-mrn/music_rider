import { Link } from "react-router";
import AvatarIcon from "./AvatarIcon";
import { useAuthStore } from "../../store/auth.store";
import AuthButtonsWrapper from "./AuthButtonsWrapper";
import { ROUTES } from "../../routes";

const NAVLINKS = [
    { path: ROUTES.PROFILE, label: "Dashboard" },
    { path: ROUTES.BANDS, label: "Mes groupes" },
    { path: ROUTES.HOME, label: "Mes riders" },
];

export default function Navbar() {
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
                    <Link
                        to={ROUTES.HOME}
                        className="text-2xl font-black tracking-tighter text-primary italic"
                    >
                        MUSIC<span className="text-base-content">RIDER</span>
                    </Link>

                    <ul className="flex items-center gap-4 ml-16">
                        {NAVLINKS.map((link, index) => (
                            <li
                                key={index}
                                className="relative font-black uppercase tracking-tight text-base-content/50 cursor-pointer group transition-colors hover:text-base-content"
                            >
                                <Link to={link.path}>
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {user ? <AvatarIcon user={user} /> : <AuthButtonsWrapper />}
                </div>
            </nav>
        </header>
    );
}
