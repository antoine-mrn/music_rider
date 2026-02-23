import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/auth.store";

export const AuthRoute = () => {
    const user = useAuthStore((state) => state.user);

    if (user) {
        return <Navigate to={`/profile`} replace />;
    }

    return <Outlet />;
};
