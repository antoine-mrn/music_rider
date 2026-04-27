import { useMutation } from "@tanstack/react-query";
import { technicalRiderApi } from "../api/technical-rider.api";
import { toast } from "sonner";
import type { CreateTechnicalRider } from "../types";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../routes";
import type { CreateTechncialRiderSchemaType } from "../schemas/create-technical-rider.schema";

export const useCreateTechnicalRider = () => {
    const navigate = useNavigate();

    return useMutation<
        CreateTechnicalRider,
        Error,
        CreateTechncialRiderSchemaType
    >({
        mutationFn: (riderData) =>
            technicalRiderApi.createTechnicalRider(riderData),
        onSuccess: async (data) => {
            navigate(ROUTES.RIDER_GENERAL(data.id));
            toast.success("Le rider a été créé avec succès 🔌");
        },
    });
};
