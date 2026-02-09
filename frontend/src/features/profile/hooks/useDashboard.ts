import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";
import type { DashboardInterface } from "../types";

export const useDashboard = () => {
    return useQuery<DashboardInterface | null, Error>({
        queryKey: ["dashboard"],
        queryFn: userApi.dashboard,
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
    });
};
