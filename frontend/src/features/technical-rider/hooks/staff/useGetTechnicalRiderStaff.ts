import { useQuery } from "@tanstack/react-query";
import { technicalRiderApi } from "../../api/technical-rider.api";

export const useGetTechnicalRiderStaff = (riderId: string) => {
    return useQuery({
        queryKey: ["rider", riderId, "staff"],
        queryFn: () => technicalRiderApi.getTechnicalRiderStaff(riderId),
        staleTime: 1000 * 60 * 2,
        refetchOnWindowFocus: false,
        enabled: !!riderId,
    });
};
