import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bandApi } from "../api/band.api";
import type { AddMemberToBandType } from "../../../schemas/add-member-to-band.schema";
import { toast } from "sonner";

export const useAddMembership = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            bandId,
            memberData,
        }: {
            bandId: string;
            memberData: AddMemberToBandType;
        }) => bandApi.addMembership(bandId, memberData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["band", data.bandId] });
            toast.success("Membre ajouté avec succès 🤘");
        },
        onError: () => {
            toast.error("Erreur lors de l'ajout du nouveau membre");
        },
    });
};
