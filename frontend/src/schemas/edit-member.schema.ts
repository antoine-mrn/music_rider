import z from "zod";

export const EditMemberToBandSchema = z.object({
    firstname: z
        .string()
        .trim()
        .min(1, { message: "Veuillez renseigner un prénom" })
        .max(50, {
            message: "Le prénom ne doit pas dépasser 50 caractères",
        })
        .optional(),
    lastname: z
        .string()
        .trim()
        .min(1, { message: "Veuillez entre un nom" })
        .max(50, {
            message: "Le nom ne doit pas dépasser 50 caractères",
        })
        .optional(),
    instrumentId: z
        .array(z.number())
        .min(1, "Veuillez choisir un instrument minimum"),
});

export type EditMemberToBandType = z.infer<typeof EditMemberToBandSchema>;
