import z from "zod";

export const SigninSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, { message: "Entrez une adresse email" })
        .email({
            message: "Entrez une adresse e-mail valide",
        }),
    password: z.string().min(8, {
        message: "Le mot de passe doit contenir au minimum 8 caractères",
    }),
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;
