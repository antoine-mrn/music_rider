import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import Footer from "./Footer";
import MobileAppDrawer from "./MobileAppDrawer";

export default function Layout() {
    return (
        <div className="min-h-screen">
            <MobileAppDrawer>
                <Navbar />
                <main className="flex-1 relative">
                    <Outlet />
                </main>
                <Footer />
            </MobileAppDrawer>
        </div>
    );
}
