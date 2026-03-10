import { useMutation } from "@tanstack/react-query";
import { bandApi } from "../api/band.api";
import type { CreateBandSchemaType } from "../../../schemas/create-band.schema";
import type { CreatedBand } from "../types";

export const useCreateBand = () => {
    return useMutation<CreatedBand, Error, CreateBandSchemaType>({
        mutationFn: (bandData) => bandApi.createBand(bandData),
    });
};
