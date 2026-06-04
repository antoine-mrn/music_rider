import { useQuery } from "@tanstack/react-query";
import { instrumentApi } from "../api/instrument.api";

export const useFindAllInstrumentsWithCategories = () => {
    return useQuery({
        queryKey: ["instruments", "grouped"],
        queryFn: instrumentApi.findAllInstrumentsWithCategories,
        staleTime: Infinity,
    });
};
