import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../../../store/auth.store";

export const useLogin = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        mutationFn: (signinData: any) => authApi.signin(signinData),
        onSuccess: (user) => {
            setUser(user);
            navigate("/");
        },
    });
};
