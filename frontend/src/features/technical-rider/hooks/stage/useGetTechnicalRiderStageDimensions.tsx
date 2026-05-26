import { useQuery } from "@tanstack/react-query";
import { technicalRiderApi } from "../../api/technical-rider.api";

export const useGetTechnicalRiderStageDimensions = (riderId: string) => {
    return useQuery({
        queryKey: ["technical-rider", riderId, "stage", "dimensions"],
        queryFn: () =>
            technicalRiderApi.getTechnicalRiderStageDimensions(riderId),
    });
};
