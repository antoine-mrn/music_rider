import { useQuery } from "@tanstack/react-query";
import { bandApi } from "../api/band.api";
import type { BandDetails } from "../types";

export const useBandDetails = (bandId: number) => {
    return useQuery<BandDetails, Error>({
        queryKey: ["band", bandId],
        queryFn: () => bandApi.bandDetails(bandId),
        staleTime: 1000 * 30,
    });
};
