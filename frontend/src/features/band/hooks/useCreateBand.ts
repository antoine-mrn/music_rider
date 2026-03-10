import { useMutation } from "@tanstack/react-query";
import { bandApi } from "../api/band.api";
import type { CreateBandSchemaType } from "../../../schemas/create-band.schema";
import type { CreatedBand } from "../types";
import { toast } from "sonner";

export const useCreateBand = () => {
    return useMutation<CreatedBand, Error, CreateBandSchemaType>({
        mutationFn: (bandData) => bandApi.createBand(bandData),
        onSuccess: () => {
            toast.success("Le groupe a été créé avec succès 🎸");
        },
    });
};
