import z from "zod";

export const EditSceneDimensionsSchema = z.object({
    stageLength: z
        .int({ error: "La longueur doit être un entier" })
        .min(1, "La longueur doit être supérieure à 0")
        .nullish(),
    stageWidth: z
        .int({ error: "La largeur doit être un entier" })
        .min(1, "La largeur doit être supérieure à 0")
        .nullish(),
    stageDepth: z
        .int({ error: "La profondeur doit être un entier" })
        .min(1, "La profondeur doit être supérieure à 0")
        .nullish(),
    stageAccess: z
        .string({ error: "Valeur invalide" })
        .trim()
        .min(1, "Ce champ ne peut pas être vide")
        .nullish(),
    backlineProvided: z
        .string({ error: "Valeur invalide" })
        .trim()
        .min(1, "Ce champ ne peut pas être vide")
        .nullish(),
});
export type EditSceneDimensionsType = z.infer<typeof EditSceneDimensionsSchema>;
