import { zodResolver } from "@hookform/resolvers/zod";
import Field from "../../../../components/ui/form/Field";
import Input from "../../../../components/ui/form/Input";
import Label from "../../../../components/ui/form/Label";
import type { TechnicalRiderStageDimensions } from "../../types";
import RiderCard from "../RiderCard";
import { useForm } from "react-hook-form";
import {
    EditSceneDimensionsSchema,
    type EditSceneDimensionsType,
} from "../../schemas/edit-scene-dimension";
import { useUpsertTechnicalRiderStageDimensions } from "../../hooks/stage/useUpsertTechnicalRiderStageDimensions";
import FormFooter from "../FormFooter";

interface StageDimensionsProps {
    riderId: string;
    stageDimensions: TechnicalRiderStageDimensions | null;
}

export default function StageDimensions({
    riderId,
    stageDimensions,
}: StageDimensionsProps) {
    const {
        register,
        formState: { errors, isDirty },
        handleSubmit,
    } = useForm<EditSceneDimensionsType>({
        resolver: zodResolver(EditSceneDimensionsSchema),
        defaultValues: async () => ({
            stageLength: stageDimensions?.stageLength ?? undefined,
            stageWidth: stageDimensions?.stageWidth ?? undefined,
            stageDepth: stageDimensions?.stageDepth ?? undefined,
            stageAccess: stageDimensions?.stageAccess ?? undefined,
            backlineProvided: stageDimensions?.backlineProvided ?? undefined,
        }),
    });

    const { mutateAsync, isPending, error } =
        useUpsertTechnicalRiderStageDimensions();

    const onSubmit = handleSubmit(async (data) => {
        await mutateAsync({
            riderId,
            body: data,
        });
    });

    return (
        <RiderCard title="Dimensions de la scène">
            <form className="space-y-4">
                <div className="flex gap-4">
                    <Field>
                        <Label label="Longueur (m)" htmlFor="stage-length" />
                        <Input
                            type="number"
                            min={1}
                            id="stage-length"
                            placeholder="ex. 6"
                            {...(register("stageLength"),
                            { valueAsNumber: true })}
                            error={errors.stageLength?.message}
                        />
                    </Field>
                    <Field>
                        <Label label="Largeur (m)" htmlFor="stage-width" />
                        <Input
                            type="number"
                            min={1}
                            id="stage-width"
                            placeholder="ex. 4"
                            {...register("stageWidth", { valueAsNumber: true })}
                            error={errors.stageWidth?.message}
                        />
                    </Field>
                    <Field>
                        <Label label="Profondeur (m)" htmlFor="stage-depth" />
                        <Input
                            type="number"
                            min={1}
                            id="stage-depth"
                            placeholder="ex. 2"
                            {...register("stageDepth", { valueAsNumber: true })}
                            error={errors.stageDepth?.message}
                        />
                    </Field>
                </div>

                <div className="divider"></div>

                <Field>
                    <Label label="Accès scène" htmlFor="stage-access" />
                    <Input
                        type="text"
                        id="stage-access"
                        placeholder="ex. Escaliers côté jardin"
                        {...register("stageAccess")}
                        error={errors.stageAccess?.message}
                    />
                </Field>
                <Field>
                    <Label label="Backline fourni" htmlFor="backline" />
                    <textarea
                        id="backline"
                        className="textarea w-full font-semibold outline-base-300 focus:border-primary"
                        placeholder="ex. Batterie acoustique complète, ampli basse 300W, ..."
                        {...register("backlineProvided")}
                    ></textarea>
                </Field>

                <FormFooter
                    isDirty={isDirty}
                    isPending={isPending}
                    error={error?.message ?? null}
                />
            </form>
        </RiderCard>
    );
}
