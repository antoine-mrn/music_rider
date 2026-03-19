import type { RiderAppNavLink } from "../../shared/constantes/navigation";
import SideNavLink from "../ui/nav/SideNavLink";

export default function RiderSideNav({
    riderNavLinks,
}: {
    riderNavLinks: RiderAppNavLink[];
}) {
    return (
        <aside className="hidden menu mt-22 w-84 bg-base-200 relative lg:flex">
            <ul className="fixed p-4 pt-12 space-y-6">
                {riderNavLinks.map((link, index) => (
                    <li key={index}>
                        <SideNavLink riderNavLink={link} />
                    </li>
                ))}
            </ul>
        </aside>
    );
}
