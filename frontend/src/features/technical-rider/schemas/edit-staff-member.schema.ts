import z from "zod";

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

export const EditStaffMemberSchema = z.object({
    firstname: z
        .string()
        .trim()
        .min(1, { message: "Le nom doit être renseigné" })
        .max(100, { message: "Le nom est trop long" }),
    lastname: z
        .string()
        .trim()
        .min(1, { message: "Le nom doit être renseigné" })
        .max(100, { message: "Le nom est trop long" }),
    email: z.email("Email invalide").or(z.literal("")).optional(),
    phone: z
        .string()
        .regex(phoneRegex, "Numéro invalide")
        .or(z.literal(""))
        .optional(),
    type: z.enum(["sound", "light"], {
        error: "Veuillez sélectionner une mission",
    }),
});

export type EditStaffMemberType = z.infer<typeof EditStaffMemberSchema>;
