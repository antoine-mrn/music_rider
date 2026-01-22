import { Outlet } from "react-router";
import Navbar from "../navbar/Navbar";

export default function Layout() {
    return (
        <div className="min-screen flex flex-col">
            <Navbar />
            <main className="flex-1 relative mt-22">
                <Outlet />
            </main>
        </div>
    );
}
