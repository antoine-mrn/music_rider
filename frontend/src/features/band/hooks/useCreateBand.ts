import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bandApi } from "../api/band.api";
import type { CreateBandSchemaType } from "../../../schemas/create-band.schema";
import type { CreatedBand } from "../types";
import { toast } from "sonner";

export const useCreateBand = () => {
    const queryClient = useQueryClient();

    return useMutation<CreatedBand, Error, CreateBandSchemaType>({
        mutationFn: (bandData) => bandApi.createBand(bandData),
        onSuccess: async () => {
            toast.success("Le groupe a été créé avec succès 🎸");
            await queryClient.invalidateQueries({ queryKey: ["bands"] });
        },
    });
};
