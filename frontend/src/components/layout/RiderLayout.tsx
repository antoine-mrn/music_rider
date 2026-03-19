import MobileAppDrawer from "./MobileAppDrawer";
import Navbar from "../navbar/Navbar";
import { Outlet, useParams } from "react-router";
import Footer from "./Footer";
import SideNavLink from "../ui/nav/SideNavLink";
import { getRiderNavLinks } from "../../shared/constantes/navigation";

export default function RiderLayout() {
    const { riderId } = useParams();
    const riderNavLinks = getRiderNavLinks(riderId || "");

    return (
        <div className="min-h-screen">
            <MobileAppDrawer>
                <Navbar />
                <main className="flex-1 relative flex">
                    <aside className="menu mt-22 w-80 bg-base-200 relative">
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
