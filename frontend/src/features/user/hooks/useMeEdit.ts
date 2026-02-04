import { useQuery } from "@tanstack/react-query";
import type { AuthUserInterface } from "../../auth/types";
import { userApi } from "../api/user.api";

export const useMeEdit = () => {
    return useQuery<AuthUserInterface | null, Error>({
        queryKey: ["me", "edit"],
        queryFn: userApi.me,
        retry: false,
        staleTime: 0,
    });
};
