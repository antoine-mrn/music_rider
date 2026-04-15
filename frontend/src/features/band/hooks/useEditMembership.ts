import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bandApi } from "../api/band.api";
import { toast } from "sonner";
import type { EditMemberToBandType } from "../../../schemas/edit-member.schema";

export const useUpdateMembership = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            bandId,
            membershipId,
            formData,
        }: {
            bandId: string;
            membershipId: number;
            formData: EditMemberToBandType;
        }) => bandApi.updateMembership(bandId, membershipId, formData),
        onSuccess: (data) => {
            // queryClient.invalidateQueries({ queryKey: ["band", data.bandId] });
            toast.success("Membre mis à jour avec succès ✅");
        },
    });
};
