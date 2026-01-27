import { Link, NavLink, Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "../navbar/Navbar";

export default function PrivateLayout() {
    const id = 5;
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar withDrawer={true} />
            <div className="drawer min-h-screen xl:drawer-open">
                <input
                    id="my-drawer-5"
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
                        htmlFor="my-drawer-5"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 min-h-full w-64 p-4 pt-12 space-y-6">
                        <li>
                            <NavLink
                                to={`profile/${id}`}
                                className={({ isActive }) =>
                                    `space-x-4 font-bold text-lg group hover:text-base-content hover:bg-transparent ${
                                        isActive
                                            ? "text-base-content"
                                            : "text-base-content/50"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <div
                                            className={`w-4 h-4 rounded-full group-hover:bg-primary ${
                                                isActive
                                                    ? "bg-primary"
                                                    : "bg-base-content/50"
                                            }`}
                                        ></div>
                                        Tableau de bord
                                    </>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="space-x-4 font-bold text-lg text-base-content/50 group hover:text-base-content hover:bg-transparent"
                            >
                                <div className="w-4 h-4 bg-base-content/50 rounded-full group-hover:bg-primary"></div>
                                Mes groupes
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/"
                                className="space-x-4 font-bold text-lg text-base-content/50 group hover:text-base-content hover:bg-transparent"
                            >
                                <div className="w-4 h-4 bg-base-content/50 rounded-full group-hover:bg-primary"></div>
                                Fiches techniques
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
