import { NavLink } from "react-router";
import type { RiderAppNavLink } from "../../../shared/constantes/navigation";

export default function SideNavLink({
    RiderNavLink,
}: {
    RiderNavLink: RiderAppNavLink;
}) {
    return (
        <NavLink
            to={RiderNavLink.path}
            end={RiderNavLink.end}
            className="space-x-4 group hover:bg-transparent"
        >
            {({ isActive }) => (
                <>
                    <div
                        className={`w-4 h-4 rounded-full group-hover:bg-primary ${
                            isActive ? "bg-primary" : "bg-base-content/50"
                        }`}
                    ></div>
                    <div className="flex flex-col">
                        <span
                            className={`text-xs uppercase font-bold tracking-widest group-hover:text-primary ${isActive ? "text-primary" : "text-base-content/50"}`}
                        >
                            étape{" "}
                            {RiderNavLink.step.toString().padStart(2, "0")}
                        </span>
                        <span
                            className={`font-extrabold group-hover:text-base-content group-hover:bg-transparent ${
                                isActive
                                    ? "text-base-content"
                                    : "text-base-content/50"
                            }`}
                        >
                            {RiderNavLink.label}
                        </span>
                    </div>
                </>
            )}
        </NavLink>
    );
}
