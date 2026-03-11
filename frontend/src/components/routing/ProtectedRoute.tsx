import { Navigate, Outlet } from "react-router";
import type { AuthUserInterface } from "../../features/auth/types";

interface ProtectedRouteProps {
    user: AuthUserInterface | undefined | null;
    isLoading: boolean;
    redirectPath?: string;
}

export const ProtectedRoute = ({
    redirectPath = "/signin",
    user,
    isLoading,
}: ProtectedRouteProps) => {
    console.log(user, isLoading);

    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};
