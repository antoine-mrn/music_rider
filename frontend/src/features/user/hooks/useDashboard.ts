import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";

export const useDashboard = () => {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: userApi.dashboard,
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
    });
};
