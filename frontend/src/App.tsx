import { Routes } from "react-router";
import Home from "./pages/Home";
import { Route } from "react-router";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Layout from "./components/layout/Layout";
import Profile from "./pages/profile/Profile";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { useEffect } from "react";
import { useMe } from "./features/auth/hooks/useMe";
import { useAuthStore } from "./store/auth.store";

function App() {
    const { data: user, isLoading } = useMe();
    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        if (!isLoading) {
            setUser(user ?? null);
        }
    }, [user, isLoading, setUser]);

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile/:id" element={<Profile />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
