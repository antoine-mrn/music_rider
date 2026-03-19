import { NavLink, useLocation } from "react-router";
import type { RiderAppNavLink } from "../../shared/constantes/navigation";
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { ChevronDown } from "lucide-react";

export default function RiderMobileNav({
    riderNavLinks,
}: {
    riderNavLinks: RiderAppNavLink[];
}) {
    const location = useLocation();

    const currentPage = riderNavLinks.find(
        (page) => page.path === location.pathname,
    );

    const navDropdownRef = useRef<HTMLElement>(null);
    const [isNavOpen, setIsNavOpen] = useState(false);
    useClickOutside(navDropdownRef, () => setIsNavOpen(false));

    return (
        <nav
            ref={navDropdownRef}
            className="relative -mb-24 mt-26 flex items-center text-sm justify-center gap-4 rounded-xl cursor-pointer py-4 w-3/4 mx-auto outline-primary transition duration-200 hover:bg-base-200 lg:mb-0 lg:hidden active:scale-95"
            onClick={() => setIsNavOpen(!isNavOpen)}
        >
            <div className="flex flex-col items-center font-bold">
                <span className="uppercase text-primary">
                    étape {currentPage?.step.toString().padStart(2, "0")}
                </span>
                <span className="uppercase italic">{currentPage?.label}</span>
            </div>
            <ChevronDown className="text-base-content/50" />

            {isNavOpen && (
                <ul className="absolute top-20 flex flex-col gap-2 bg-base-100 border border-base-300 w-full rounded-xl p-6 z-10">
                    {riderNavLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink
                                to={link.path}
                                end={link.end}
                                className={({ isActive }) =>
                                    `w-full block font-extrabold p-2 rounded-xl uppercase italic transition-color hover:text-primary hover:bg-base-200 ${
                                        isActive
                                            ? "text-primary bg-primary/8"
                                            : "text-base-content"
                                    }`
                                }
                            >
                                {link?.step.toString().padStart(2, "0")}
                                {""}. {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    );
}
