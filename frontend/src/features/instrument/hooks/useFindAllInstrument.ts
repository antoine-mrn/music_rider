import { useQuery } from "@tanstack/react-query";
import { instrumentApi } from "../api/instrument.api";

export const useFindAllInstrument = () => {
    return useQuery({
        queryKey: ["instruments", "for-members"],
        queryFn: instrumentApi.findAllInstrument,
        staleTime: Infinity,
    });
};
