import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";
import Footer from "./Footer";

export default function PublicLayout() {
    return (
        <div className="min-screen flex flex-col">
            <Navbar withDrawer={false} />
            <main className="flex-1 relative">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
