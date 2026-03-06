import z from "zod";

export const CreateBandSchema = z.object({
    label: z
        .string()
        .trim()
        .min(1, { message: "Entrez un nom de groupe" })
        .max(30, { message: "Nom trop long" }),
    styleId: z.coerce.number<number>().min(1, "Veuillez choisir un style"),
});

export type CreateBandSchemaType = z.infer<typeof CreateBandSchema>;
