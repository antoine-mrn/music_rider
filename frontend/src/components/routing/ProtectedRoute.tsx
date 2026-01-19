import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/auth.store";
import { useMe } from "../../features/auth/hooks/useMe";

interface ProtectedRouteProps {
    redirectPath?: string;
}

export const ProtectedRoute = ({
    redirectPath = "/signin",
}: ProtectedRouteProps) => {
    const user = useAuthStore((state) => state.user);
    const { isLoading } = useMe();

    if (isLoading) {
        return <p>Wait..</p>;
    }

    if (!user && !isLoading) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};
