import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { technicalRiderApi } from "../../api/technical-rider.api";
import type { SyncTechnicalRiderStaffType } from "../../types";

export const useSyncTechnicalRiderStaff = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            riderId,
            body,
        }: {
            riderId: string;
            body: SyncTechnicalRiderStaffType;
        }) => technicalRiderApi.syncTechnicalRiderStaff(riderId, body),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["rider", variables.riderId],
            });
            toast.success("Équipe sauvegardée ✅");
        },
        onError: () => {
            toast.error("Une erreur est survenue ❌");
        },
    });
};
