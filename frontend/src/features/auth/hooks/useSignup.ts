import { useNavigate } from "react-router";
import { useAuthStore } from "../../../store/auth.store";
import { useMutation } from "@tanstack/react-query";
import type { AuthUserInterface, SignupDto } from "../types";
import { authApi } from "../api/auth.api";

export const useSignup = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation<AuthUserInterface, Error, SignupDto>({
        mutationFn: (signupDto: SignupDto) => authApi.signup(signupDto),
        onSuccess: (user) => {
            setUser(user);
            navigate("/");
        },
    });
};
