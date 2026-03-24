import { useMutation, useQueryClient } from "@tanstack/react-query";
import { technicalRiderApi } from "../api/technical-rider.api";
import { toast } from "sonner";
import type { CreateTechnicalRider } from "../types";
import type { CreateTechncialRiderSchemaType } from "../../../schemas/create-technical-rider.schema";

export const useCreateTechnicalRider = () => {
    const queryClient = useQueryClient();

    return useMutation<
        CreateTechnicalRider,
        Error,
        CreateTechncialRiderSchemaType
    >({
        mutationFn: (riderData) =>
            technicalRiderApi.createTechnicalRider(riderData),
        onSuccess: async () => {
            toast.success("Le rider a été créé avec succès 🔌");
            await queryClient.invalidateQueries({ queryKey: ["rider-list"] });
        },
    });
};
