import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/auth.store";

interface ProtectedRouteProps {
    redirectPath?: string;
}

export const ProtectedRoute = ({
    redirectPath = "/signin",
}: ProtectedRouteProps) => {
    const user = useAuthStore((state) => state.user);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) return null;

    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};
