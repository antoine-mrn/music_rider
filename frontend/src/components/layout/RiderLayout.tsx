import MobileAppDrawer from "./MobileAppDrawer";
import Navbar from "../navbar/Navbar";
import { NavLink, Outlet, useLocation, useParams } from "react-router";
import Footer from "./Footer";
import SideNavLink from "../ui/nav/SideNavLink";
import { getRiderNavLinks } from "../../shared/constantes/navigation";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function RiderLayout() {
    const { riderId } = useParams();
    const riderNavLinks = getRiderNavLinks(riderId || "");
    const location = useLocation();

    const currentPage = riderNavLinks.find(
        (page) => page.path === location.pathname,
    );

    const navDropdownRef = useRef<HTMLElement>(null);
    const [isNavOpen, setIsNavOpen] = useState(true);
    useClickOutside(navDropdownRef, () => setIsNavOpen(false));

    return (
        <div className="min-h-screen">
            <MobileAppDrawer>
                <Navbar />
                <main className="flex-1 relative flex flex-col lg:flex-row">
                    <nav
                        ref={navDropdownRef}
                        className="relative -mb-24 mt-26 flex items-center text-sm justify-center gap-4 rounded-xl cursor-pointer py-4 w-3/4 mx-auto outline-primary transition duration-200 hover:bg-base-200 lg:mb-0 lg:hidden active:scale-95"
                        onClick={() => setIsNavOpen(!isNavOpen)}
                    >
                        <div className="flex flex-col items-center font-bold">
                            <span className="uppercase text-primary">
                                étape{" "}
                                {currentPage?.step.toString().padStart(2, "0")}
                            </span>
                            <span className="uppercase italic">
                                {currentPage?.label}
                            </span>
                        </div>
                        <ChevronDown className="text-base-content/50" />

                        {isNavOpen && (
                            <ul className="absolute top-20 flex flex-col gap-2 bg-base-100 border border-base-300 w-full rounded-xl p-6 transition-opacity">
                                {riderNavLinks.map((link, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={link.path}
                                            end={link.end}
                                            className={({ isActive }) =>
                                                `w-full block font-extrabold p-2 rounded-xl uppercase italic hover:text-primary hover:bg-base-200 ${
                                                    isActive
                                                        ? "text-primary bg-primary/8"
                                                        : "text-base-content"
                                                }`
                                            }
                                        >
                                            {link?.step
                                                .toString()
                                                .padStart(2, "0")}
                                            {""}. {link.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </nav>
                    <aside className="hidden menu mt-22 w-84 bg-base-200 relative lg:flex">
                        <ul className="fixed p-4 pt-12 space-y-6">
                            {riderNavLinks.map((link, index) => (
                                <li key={index}>
                                    <SideNavLink RiderNavLink={link} />
                                </li>
                            ))}
                        </ul>
                    </aside>
                    <Outlet />
                </main>
                <Footer />
            </MobileAppDrawer>
        </div>
    );
}
