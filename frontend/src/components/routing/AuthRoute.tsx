import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/auth.store";

export const AuthRoute = () => {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) return null;

    if (user) {
        return <Navigate to={`/profile/${user.id}`} replace />;
    }

    return <Outlet />;
};
