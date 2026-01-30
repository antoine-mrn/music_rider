import { Routes } from "react-router";
import Home from "./pages/Home";
import { Route } from "react-router";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/profile/Profile";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store";
import { AuthRoute } from "./components/routing/AuthRoute";
import PrivateLayout from "./components/layout/PrivateLayout";
import PublicLayout from "./components/layout/PublicLayout";
import { useMe } from "./features/user/hooks/useMe";

function App() {
    const { data: user, isLoading } = useMe();
    const setUser = useAuthStore((state) => state.setUser);
    const setIsAuthenticated = useAuthStore(
        (state) => state.setIsAuthenticated,
    );

    useEffect(() => {
        if (!isLoading) {
            setUser(user ?? null);
            setIsAuthenticated();
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
            <Route path="/" element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route element={<AuthRoute />}>
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
            </Route>
            <Route element={<ProtectedRoute />}>
                <Route element={<PrivateLayout />}>
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
