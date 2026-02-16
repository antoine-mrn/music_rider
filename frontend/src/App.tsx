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
import { useMe } from "./features/profile/hooks/useMe";
import { Toaster } from "sonner";
import EditProfile from "./pages/profile/EditProfile";
import MyBands from "./pages/band/MyBands";
import BandDetails from "./pages/band/BandDetails";
import Loading from "./components/layout/Loading";

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

    if (isLoading) return <Loading />;

    return (
        <>
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
                        <Route
                            path="/profile/editing"
                            element={<EditProfile />}
                        />
                        <Route path="/band" element={<MyBands />} />
                        <Route path="/band/:bandId" element={<BandDetails />} />
                    </Route>
                </Route>
            </Routes>
            <Toaster
                toastOptions={{
                    style: {
                        backgroundColor: "var(--color-base-100)",
                        color: "var(--color-base-content)",
                    },
                }}
            />
        </>
    );
}

export default App;
