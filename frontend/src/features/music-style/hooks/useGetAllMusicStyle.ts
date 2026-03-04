import { useQuery } from "@tanstack/react-query";
import { musicStyleApi } from "../api/music-style.api";

export const useGetAllMusicStyles = () => {
    return useQuery<any, Error>({
        queryKey: ["styles"],
        queryFn: () => musicStyleApi.getAllMusicStyles(),
        staleTime: Infinity,
        gcTime: Infinity,
    });
};
