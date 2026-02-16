import { useQuery } from "@tanstack/react-query";
import { bandApi } from "../api/band.api";

export const useBandDetails = (bandId: number) => {
    return useQuery<any, Error>({
        queryKey: ["band", bandId],
        queryFn: () => bandApi.bandDetails(bandId),
        staleTime: 1000 * 30,
    });
};
