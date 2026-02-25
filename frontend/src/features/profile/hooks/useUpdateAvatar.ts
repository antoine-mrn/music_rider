import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../../../store/auth.store";
import { userApi } from "../api/user.api";

export const useUpdateAvatar = () => {
    const setUser = useAuthStore((state) => state.setUser);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (formData: FormData) => userApi.updateAvatar(formData),
        onSuccess: (user) => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });

            setUser(user);

            toast.success("Avatar mis à jour avec succès ✏️");
        },
        onError: () => {
            toast.error("Erreur lors de la mise à jour de l'avatar");
        },
    });
};
