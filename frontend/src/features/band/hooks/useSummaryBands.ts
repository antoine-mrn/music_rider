import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Pagination } from "../../../shared/types/pagination.interface";
import { bandApi } from "../api/band.api";
import type { SummaryBand } from "../types";

export const useSummaryBands = (page: number) => {
    return useQuery<Pagination<SummaryBand>, Error>({
        queryKey: ["bands", page],
        queryFn: () => bandApi.summaryBands(page),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 30,
    });
};
