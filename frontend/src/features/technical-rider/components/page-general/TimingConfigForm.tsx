import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Field from "../../../../components/ui/form/Field";
import Input from "../../../../components/ui/form/Input";
import Label from "../../../../components/ui/form/Label";
import {
    type EditGeneralInfoType,
    EditGeneralInfoSchema,
} from "../../schemas/edit-general-info.schema";
import FormFooter from "../FormFooter";
import RiderCard from "../RiderCard";
import type { TechnicalRiderTiming } from "../../types";
import { useUpdateTiming } from "../../hooks/timing/useUpdateTiming";

interface TimingConfigFormProps {
    riderId: string;
    generalData: TechnicalRiderTiming | null;
}

export default function TimingConfigForm({
    riderId,
    generalData,
}: TimingConfigFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<EditGeneralInfoType>({
        resolver: zodResolver(EditGeneralInfoSchema),
        defaultValues: {
            musicianNumber: generalData?.musicianNumber ?? 0,
            setDuration: generalData?.setDuration ?? 0,
            soundcheckDuration: generalData?.soundcheckDuration ?? 0,
            setupDuration: generalData?.setupDuration ?? 0,
            teardownDuration: generalData?.teardownDuration ?? 0,
        },
    });

    const { mutateAsync, isPending, error } = useUpdateTiming();

    const onSubmit = handleSubmit(async (data) => {
        await mutateAsync({ riderId, body: data });
        reset(data, { keepValues: true });
    });

    return (
        <RiderCard title="Timing et configuration">
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <Field>
                    <Label
                        label="Nombre de musicien"
                        htmlFor="musician-number"
                    />
                    <Input
                        type="number"
                        min={0}
                        id="musician-number"
                        placeholder="0"
                        {...register("musicianNumber", { valueAsNumber: true })}
                        error={errors.musicianNumber?.message}
                    />
                </Field>
                <Field>
                    <Label
                        label="Durée du set (en min)"
                        htmlFor="set-duration"
                    />
                    <Input
                        type="number"
                        min={0}
                        id="set-duration"
                        placeholder="0"
                        {...register("setDuration", { valueAsNumber: true })}
                        error={errors.setDuration?.message}
                    />
                </Field>
                <Field>
                    <Label
                        label="Durée du soundcheck (en min)"
                        htmlFor="soundcheck-duration"
                    />
                    <Input
                        type="number"
                        id="soundcheck-duration"
                        placeholder="0"
                        min={0}
                        {...register("soundcheckDuration", {
                            valueAsNumber: true,
                        })}
                        error={errors.soundcheckDuration?.message}
                    />
                </Field>

                <Field>
                    <Label
                        label="Durée d'installation (en min)"
                        htmlFor="setup-duration"
                    />
                    <Input
                        type="number"
                        id="setup-duration"
                        placeholder="0"
                        min={0}
                        {...register("setupDuration", { valueAsNumber: true })}
                        error={errors.setupDuration?.message}
                    />
                </Field>

                <Field>
                    <Label
                        label="Durée de démontage (en min)"
                        htmlFor="teardown-duration"
                    />
                    <Input
                        type="number"
                        id="teardown-duration"
                        placeholder="0"
                        {...register("teardownDuration", {
                            valueAsNumber: true,
                        })}
                        min={0}
                        error={errors.teardownDuration?.message}
                    />
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
