import { useNavigate } from "react-router";
import { useAuthStore } from "../../../store/auth.store";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";

export const useLogout = () => {
    const navigate = useNavigate();
    const setLogout = useAuthStore((state) => state.setLogout);

    return useMutation<void, Error, void>({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            setLogout();
            navigate("/");
        },
    });
};
