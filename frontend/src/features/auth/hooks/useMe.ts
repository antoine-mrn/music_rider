import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import type { AuthUserInterface } from "../types";
import { useAuthStore } from "../../../store/auth.store";
import { useEffect } from "react";

export const useMe = () => {
    const setUser = useAuthStore((state) => state.setUser);

    const query = useQuery<AuthUserInterface, Error>({
        queryKey: ["me"],
        queryFn: authApi.me,
        retry: false,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (query.data) setUser(query.data);
    }, [query.data]);

    return query;
};
