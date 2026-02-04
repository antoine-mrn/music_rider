import z from "zod";

export const EditProfileSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: "Entrez une adresse email" })
        .email({
            message: "Entrez une adresse e-mail valide",
        }),
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
});

export type EditProfileSchemaType = z.infer<typeof EditProfileSchema>;
