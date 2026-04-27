import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { technicalRiderApi } from "../api/technical-rider.api";
import type { TechnicalRiderGeneralInfo } from "../types";

export const useUpdateGeneralInfo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            riderId,
            body,
        }: {
            riderId: string;
            body: TechnicalRiderGeneralInfo;
        }) => technicalRiderApi.updateTechnicalRiderGeneral(riderId, body),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["rider", variables.riderId],
                refetchType: "all",
            });
            toast.success("Informations sauvegardées ✅");
        },
        onError: () => {
            toast.error("Une erreur est survenue ❌");
        },
    });
};
