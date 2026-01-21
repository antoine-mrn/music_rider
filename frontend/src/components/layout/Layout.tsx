import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "../navbar/Navbar";

export default function Layout() {
    return (
        <div className="min-h-full flex flex-col">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
