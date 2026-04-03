import { useQuery } from "@tanstack/react-query";
import { bandApi } from "../api/band.api";

export const useBandsList = () => {
    return useQuery<{ id: string; label: string }[], Error>({
        queryKey: ["bands-list"],
        queryFn: bandApi.bandsList,
        staleTime: 1000 * 30,
    });
};
