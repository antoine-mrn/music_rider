import MobileAppDrawer from "./MobileAppDrawer";
import Navbar from "../navbar/Navbar";
import { Outlet, useParams } from "react-router";
import Footer from "./Footer";
import { getRiderNavLinks } from "../../shared/constantes/navigation";
import RiderMobileNav from "../navbar/RiderMobileNav";
import RiderSideNav from "../navbar/RiderSideNav";

export default function RiderLayout() {
    const { riderId } = useParams();
    const riderNavLinks = getRiderNavLinks(riderId || "");

    return (
        <div className="min-h-screen">
            <MobileAppDrawer>
                <Navbar />
                <main className="flex-1 bg-primary/3 relative flex flex-col lg:flex-row">
                    {/* Nav Mobile */}
                    <RiderMobileNav riderNavLinks={riderNavLinks} />
                    {/* Nav Desktop */}
                    <RiderSideNav riderNavLinks={riderNavLinks} />

                    <Outlet />
                </main>
                <Footer />
            </MobileAppDrawer>
        </div>
    );
}
