import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bandApi } from "../api/band.api";
import { toast } from "sonner";

export const useDeleteMembership = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            bandId,
            membershipId,
        }: {
            bandId: string;
            membershipId: number;
        }) => bandApi.deleteMembership(bandId, membershipId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["band", data.bandId] });
            toast.success("Membre mis à jour avec succès ✅");
        },
    });
};
