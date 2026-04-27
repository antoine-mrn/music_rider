import z from "zod";

export const EditGeneralInfoSchema = z.object({
    musicianNumber: z
        .int()
        .min(1, { message: "Le groupe ne peux pas être sans musicien" }),
    setDuration: z.int().min(0),
    soundcheckDuration: z.int().min(0),
    setupDuration: z.int().min(0),
    teardownDuration: z.int().min(0),
});

export type EditGeneralInfoType = z.infer<typeof EditGeneralInfoSchema>;
