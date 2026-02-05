import { userApi } from "../api/user.api";
import { useAuthStore } from "../../../store/auth.store";
import type { EditProfileSchemaType } from "../../../schemas/edit-profile.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AuthUserInterface } from "../../auth/types";

export const useUpdateMe = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const queryClient = useQueryClient();

    return useMutation<
        AuthUserInterface,
        Error,
        Partial<EditProfileSchemaType>
    >({
        mutationFn: (signinData: Partial<EditProfileSchemaType>) =>
            userApi.updateMe(signinData),
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });

            setUser(user);
        },
    });
};
