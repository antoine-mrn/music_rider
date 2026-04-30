import z from "zod";

export const SigninSchema = z.object({
    email: z
        .email({
            message: "Entrez une adresse e-mail valide",
        })
        .trim(),
    password: z.string().min(8, {
        message: "Le mot de passe doit contenir au minimum 8 caractères",
    }),
});

export type SigninSchemaType = z.infer<typeof SigninSchema>;
