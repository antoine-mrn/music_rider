import z from "zod";

export const AddMemberToBandSchema = z.discriminatedUnion("mode", [
    z.object({
        mode: z.literal("account"),
        email: z
            .string()
            .trim()
            .min(1, { message: "Entrez une adresse email" })
            .email({
                message: "Entrez une adresse e-mail valide",
            }),
        instrumentId: z
            .array(z.number())
            .min(1, "Veuillez choisir un instrument minimum"),
    }),
    z.object({
        mode: z.literal("custom"),
        firstname: z
            .string()
            .trim()
            .min(1, { message: "Veuillez renseigner votre prénom" })
            .max(50, {
                message: "Le prénom ne doit pas dépasser 50 caractères",
            }),
        lastname: z
            .string()
            .trim()
            .min(1, { message: "Veuillez entre un nom" })
            .max(50, {
                message: "Le nom ne doit pas dépasser 50 caractères",
            }),
        instrumentId: z
            .array(z.number())
            .min(1, "Veuillez choisir un instrument minimum"),
    }),
]);

export type AddMemberToBandType = z.infer<typeof AddMemberToBandSchema>;
