import z from "zod";

export const SignupSchema = z
    .object({
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
        password: z.string().min(8, {
            message: "Le mot de passe doit contenir au minimum 8 caractères",
        }),
        confirmPassword: z.string().min(8, {
            message: "Le mot de passe doit contenir au minimum 8 caractères",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Les mots de passes ne correspondent pas",
        path: ["confirmPassword"],
    });

export type SignupSchemaType = z.infer<typeof SignupSchema>;
