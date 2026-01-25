import { Routes } from "react-router";
import Home from "./pages/Home";
import { Route } from "react-router";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Profile from "./pages/profile/Profile";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { useEffect } from "react";
import { useMe } from "./features/auth/hooks/useMe";
import { useAuthStore } from "./store/auth.store";
import { AuthRoute } from "./components/routing/AuthRoute";
import PrivateLayout from "./components/layout/PrivateLayout";
import PublicLayout from "./components/layout/PublicLayout";

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
        // TODO: Améliorer le layout car le Footer est dans le main à cause du scroll de la navbar
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
                    <Route path="/profile/:id" element={<Profile />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
