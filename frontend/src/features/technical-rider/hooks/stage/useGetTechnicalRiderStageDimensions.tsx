import { useQuery } from "@tanstack/react-query";
import { technicalRiderApi } from "../../api/technical-rider.api";

export const useGetTechnicalRiderStageDimensions = (riderId: string) => {
    return useQuery({
        queryKey: ["technical-rider", riderId, "stage", "dimensions"],
        queryFn: () =>
            technicalRiderApi.getTechnicalRiderStageDimensions(riderId),
        select: (data) => ({
            id: data?.id ?? 0,
            stageLength: data?.stageLength ?? null,
            stageWidth: data?.stageWidth ?? null,
            stageDepth: data?.stageDepth ?? null,
            stageAccess: data?.stageAccess ?? null,
            backlineProvided: data?.backlineProvided ?? null,
        }),
    });
};
