import z from "zod";

export const EditGeneralInfoSchema = z.object({
    musicianNumber: z
        .int()
        .min(1, { message: "Le groupe ne peux pas être sans musicien" }),
    soundcheckDuration: z.int().min(0).optional(),
    setupDuration: z.int().min(0).optional(),
    teardownDuration: z.int().min(0).optional(),
});

export type EditGeneralInfoType = z.infer<typeof EditGeneralInfoSchema>;
