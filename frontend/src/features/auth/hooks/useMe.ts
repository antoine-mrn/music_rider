import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import type { AuthUserInterface } from "../types";

export const useMe = () => {
    return useQuery<AuthUserInterface | null, Error>({
        queryKey: ["me"],
        queryFn: authApi.me,
        retry: false,
        staleTime: Infinity,
    });
};
