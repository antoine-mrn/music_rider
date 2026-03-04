import z from "zod";

export const CreateBandSchema = z.object({
    label: z
        .string()
        .trim()
        .min(1, { message: "Entrez un nom de groupe" })
        .max(30, { message: "Nom trop long" }),
    style: z.string().min(1, "Veuillez choisir un style"),
});

export type CreateBandSchemaType = z.infer<typeof CreateBandSchema>;
