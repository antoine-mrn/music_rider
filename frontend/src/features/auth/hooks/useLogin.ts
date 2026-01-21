import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { authApi } from "../api/auth.api";
import { useAuthStore } from "../../../store/auth.store";
import type { AuthUserInterface, SigninDto } from "../types";

export const useLogin = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation<AuthUserInterface, Error, SigninDto>({
        mutationFn: (signinData: SigninDto) => authApi.signin(signinData),
        onSuccess: (user) => {
            setUser(user);
            navigate(`/profile/${user.id}`);
        },
    });
};
