import { useMutation, useQueryClient } from "@tanstack/react-query";
import { technicalRiderApi } from "../../api/technical-rider.api";
import type { EditSceneDimensionsType } from "../../schemas/edit-scene-dimension";
import { toast } from "sonner";

export const useUpsertTechnicalRiderStageDimensions = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            riderId,
            body,
        }: {
            riderId: string;
            body: EditSceneDimensionsType;
        }) =>
            technicalRiderApi.upsertTechnicalRiderStageDimensions(
                riderId,
                body,
            ),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [
                    "technical-rider",
                    variables.riderId,
                    "stage",
                    "dimensions",
                ],
            });
            toast.success("Dimensions sauvegardées ✅");
        },
        onError: () => {
            toast.error("Une erreur est survenue ❌");
        },
    });
};
