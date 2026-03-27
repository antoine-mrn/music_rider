import { useNavigate } from "react-router";
import { useAuthStore } from "../../../store/auth.store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export const useLogout = () => {
    const navigate = useNavigate();
    const setLogout = useAuthStore((state) => state.setLogout);
    const queryClient = useQueryClient();

    return useMutation<void, Error, void>({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            setLogout();
            queryClient.clear();
            navigate("/");
        },
    });
};
