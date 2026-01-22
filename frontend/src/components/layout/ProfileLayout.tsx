import { Outlet } from "react-router";
import Footer from "./Footer";

export default function ProfileLayout() {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />

            {/* Contenu principal */}
            <div className="drawer-content flex flex-col">
                <div className="mt-22 lg:mt-0 max-w-7xl mx-auto">
                    <Outlet />
                </div>
                <div className="lg:-ml-80">
                    <Footer />
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side z-20 mt-22 lg:mt-0 lg:top-22 lg:h-[calc(100vh-88px)]">
                <label
                    htmlFor="my-drawer-5"
                    aria-label="close sidebar"
                    className="drawer-overlay lg:hidden"
                ></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4">
                    {/* lg:pt-24 pour compenser la navbar en desktop */}
                    <li>
                        <a>Sidebar Item 1</a>
                    </li>
                    <li>
                        <a>Sidebar Item 2</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}
