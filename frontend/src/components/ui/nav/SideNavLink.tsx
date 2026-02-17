import { NavLink } from "react-router";

interface SideNavLinkProps {
    path: string;
    label: string;
    exactMatch?: boolean;
}

export default function SideNavLink({
    path,
    label,
    exactMatch = true,
}: SideNavLinkProps) {
    return (
        <NavLink
            to={path}
            end={exactMatch}
            className={({ isActive }) =>
                `space-x-4 font-bold text-lg group italic hover:text-base-content hover:bg-transparent ${
                    isActive ? "text-base-content" : "text-base-content/50"
                }`
            }
        >
            {({ isActive }) => (
                <>
                    <div
                        className={`w-4 h-4 rounded-full group-hover:bg-primary ${
                            isActive ? "bg-primary" : "bg-base-content/50"
                        }`}
                    ></div>
                    {label}
                </>
            )}
        </NavLink>
    );
}
