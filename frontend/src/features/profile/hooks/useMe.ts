import { useQuery } from "@tanstack/react-query";
import type { AuthUserInterface } from "../../auth/types";
import { userApi } from "../api/user.api";

export const useMe = () => {
    return useQuery<AuthUserInterface | null, Error>({
        queryKey: ["me"],
        queryFn: userApi.me,
        retry: false,
        staleTime: Infinity,
    });
};
