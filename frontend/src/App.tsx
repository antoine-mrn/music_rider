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
import { useMe } from "./features/profile/hooks/useMe";
import { Toaster } from "sonner";
import EditProfile from "./pages/profile/EditProfile";
import MyBands from "./pages/band/MyBands";
import BandDetails from "./pages/band/BandDetails";
import Loading from "./components/layout/Loading";
import { ROUTES } from "./routes";
import Layout from "./components/layout/Layout";
import RiderList from "./pages/technical-rider/RiderList";
import RiderGeneral from "./pages/technical-rider/RiderGeneral";
import RiderLayout from "./components/layout/RiderLayout";
import RiderScene from "./pages/technical-rider/RiderScene";

function App() {
    const { data: fetchUser, isLoading } = useMe();
    const { setUser, setIsLoading } = useAuthStore();

    useEffect(() => {
        setIsLoading(isLoading);
        if (!isLoading) {
            setUser(fetchUser ?? null);
        }
    }, [fetchUser, isLoading, setUser]);

    if (isLoading) return <Loading />;

    return (
        <>
            <Routes>
                <Route path={ROUTES.HOME} element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route element={<AuthRoute />}>
                        <Route path={ROUTES.SIGNIN} element={<Signin />} />
                        <Route path={ROUTES.SIGNUP} element={<Signup />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route path={ROUTES.PROFILE} element={<Profile />} />
                        <Route
                            path={ROUTES.PROFILE_EDIT}
                            element={<EditProfile />}
                        />
                        <Route path={ROUTES.BANDS} element={<MyBands />} />
                        <Route
                            path={ROUTES.BAND_DETAILS()}
                            element={<BandDetails />}
                        />
                        <Route path={ROUTES.RIDER} element={<RiderList />} />
                    </Route>
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<RiderLayout />}>
                        <Route
                            path={ROUTES.RIDER_GENERAL()}
                            element={<RiderGeneral />}
                        ></Route>
                        <Route
                            path={ROUTES.RIDER_SCENE()}
                            element={<RiderScene />}
                        ></Route>
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
