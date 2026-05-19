import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { technicalRiderApi } from "../../api/technical-rider.api";
import type { TechnicalRiderTiming } from "../../types";

export const useUpdateTiming = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            riderId,
            body,
        }: {
            riderId: string;
            body: TechnicalRiderTiming;
        }) => technicalRiderApi.updateTechnicalRiderGeneral(riderId, body),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["rider", variables.riderId, "timing"],
            });
            toast.success("Timing et configuration sauvegardés ✅");
        },
        onError: () => {
            toast.error("Une erreur est survenue ❌");
        },
    });
};
