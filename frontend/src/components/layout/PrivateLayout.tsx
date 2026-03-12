import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "../navbar/Navbar";
import SideNavLink from "../ui/nav/SideNavLink";
import { ROUTES } from "../../routes";

export default function PrivateLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar withDrawer={true} />
            <div className="drawer min-h-screen xl:drawer-open">
                <input
                    id="side-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                />

                {/* Contenu principal */}
                <div className="drawer-content min-h-screen flex flex-col">
                    <main className="flex-1 max-w-5xl w-full mx-auto my-22">
                        <Outlet />
                    </main>
                    <div className="lg:-ml-80">
                        <Footer />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="drawer-side z-20 mt-22 lg:mt-0 lg:top-22 lg:h-[calc(100vh-88px)]">
                    <label
                        htmlFor="side-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 min-h-full w-64 p-4 pt-12 space-y-6">
                        <li>
                            <SideNavLink
                                path={ROUTES.PROFILE}
                                label="Tableau de bord"
                            />
                        </li>
                        <li>
                            <SideNavLink
                                path={ROUTES.BANDS}
                                label="Mes groupes"
                                exactMatch={false}
                            />
                        </li>
                        <li>
                            <SideNavLink
                                path={ROUTES.HOME}
                                label="Fiches techniques"
                            />
                        </li>
                        <li>
                            <SideNavLink
                                path={ROUTES.PROFILE_EDIT}
                                label="Paramètres"
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
