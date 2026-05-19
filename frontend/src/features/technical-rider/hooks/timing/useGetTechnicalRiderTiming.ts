import { useQuery } from "@tanstack/react-query";
import { technicalRiderApi } from "../../api/technical-rider.api";

export const useGetTechnicalRiderTiming = (riderId: string) => {
    return useQuery({
        queryKey: ["rider", riderId, "timing"],
        queryFn: () => technicalRiderApi.getTechnicalRiderTiming(riderId),
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
        enabled: !!riderId,
    });
};
