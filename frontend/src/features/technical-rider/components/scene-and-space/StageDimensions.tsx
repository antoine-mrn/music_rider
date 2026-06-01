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
        reset,
    } = useForm<EditSceneDimensionsType>({
        resolver: zodResolver(EditSceneDimensionsSchema),
        defaultValues: {
            stageLength: stageDimensions?.stageLength ?? null,
            stageWidth: stageDimensions?.stageWidth ?? null,
            stageDepth: stageDimensions?.stageDepth ?? null,
            stageAccess: stageDimensions?.stageAccess ?? null,
            backlineProvided: stageDimensions?.backlineProvided ?? null,
        },
    });

    const { mutateAsync, isPending, error } =
        useUpsertTechnicalRiderStageDimensions();

    const onSubmit = handleSubmit(async (data) => {
        await mutateAsync({
            riderId,
            body: data,
        });
        reset(data, { keepValues: true });
    });

    return (
        <RiderCard title="Dimensions de la scène">
            <form className="space-y-4" onSubmit={onSubmit}>
                <div className="flex gap-4">
                    <Field>
                        <Label label="Longueur (m)" htmlFor="stage-length" />
                        <Input
                            type="number"
                            min={1}
                            id="stage-length"
                            placeholder="ex. 6"
                            {...register("stageLength", {
                                setValueAs: (v) =>
                                    v === "" || v === null
                                        ? null
                                        : parseInt(v, 10),
                            })}
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
                            {...register("stageWidth", {
                                setValueAs: (v) =>
                                    v === "" || v === null
                                        ? null
                                        : parseInt(v, 10),
                            })}
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
                            {...register("stageDepth", {
                                setValueAs: (v) =>
                                    v === "" || v === null
                                        ? null
                                        : parseInt(v, 10),
                            })}
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
                        {...register("stageAccess", {
                            setValueAs: (v) => (v === "" ? null : v),
                        })}
                        error={errors.stageAccess?.message}
                    />
                </Field>
                <Field>
                    <Label label="Backline fourni" htmlFor="backline" />
                    <textarea
                        id="backline"
                        className="textarea w-full font-semibold outline-base-300 focus:border-primary"
                        placeholder="ex. Batterie acoustique complète, ampli basse 300W, ..."
                        {...register("backlineProvided", {
                            setValueAs: (v) => (v === "" ? null : v),
                        })}
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
