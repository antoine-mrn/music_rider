import z from "zod";

export const CreateTechncialRiderSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: "Entrez un nom de rider" })
        .max(30, { message: "Nom trop long" }),
    riderCategoryId: z.coerce
        .number<number>()
        .min(1, "Veuillez choisir une catégorie"),
    bandId: z.coerce.number<number>().min(1, "Veuillez choisir un groupe"),
});

export type CreateTechncialRiderSchemaType = z.infer<
    typeof CreateTechncialRiderSchema
>;
