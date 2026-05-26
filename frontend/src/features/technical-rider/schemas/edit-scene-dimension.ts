import z from "zod";

export const EditSceneDimensionsSchema = z.object({
    stageLength: z
        .int({ error: "La longueur doit être un entier" })
        .min(1, "La longueur doit être supérieure à 0")
        .optional(),
    stageWidth: z
        .int({ error: "La largeur doit être un entier" })
        .min(1, "La largeur doit être supérieure à 0")
        .optional(),
    stageDepth: z
        .int({ error: "La profondeur doit être un entier" })
        .min(1, "La profondeur doit être supérieure à 0")
        .optional(),
    stageAccess: z
        .string({ error: "Valeur invalide" })
        .trim()
        .min(1, "Ce champ ne peut pas être vide")
        .optional(),
    backlineProvided: z
        .string({ error: "Valeur invalide" })
        .trim()
        .min(1, "Ce champ ne peut pas être vide")
        .optional(),
});
export type EditSceneDimensionsType = z.infer<typeof EditSceneDimensionsSchema>;
