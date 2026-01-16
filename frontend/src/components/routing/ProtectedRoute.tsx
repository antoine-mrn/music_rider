import { Navigate, Outlet } from "react-router";
import { useMe } from "../../features/auth/hooks/useMe";

interface ProtectedRouteProps {
    redirectPath?: string;
}

export const ProtectedRoute = ({
    redirectPath = "/signin",
}: ProtectedRouteProps) => {
    const { data: user, isLoading } = useMe();

    if (isLoading) return <p>Ca charge...</p>;

    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};
