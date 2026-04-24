import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Field from "../../../../components/ui/form/Field";
import Input from "../../../../components/ui/form/Input";
import Label from "../../../../components/ui/form/Label";
import {
    type EditGeneralInfoType,
    EditGeneralInfoSchema,
} from "../../schemas/edit-general-info.schema";
import type { TechnicalRiderGeneralInfo } from "../../types";
import FormFooter from "../FormFooter";
import RiderCard from "../RiderCard";

interface TimingConfigFormProps {
    generalData: TechnicalRiderGeneralInfo;
}

export default function TimingConfigForm({
    generalData,
}: TimingConfigFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm<EditGeneralInfoType>({
        resolver: zodResolver(EditGeneralInfoSchema),
        defaultValues: {
            musicianNumber: generalData?.musicianNumber ?? 0,
            soundcheckDuration: generalData?.soundcheckDuration ?? 0,
            setupDuration: generalData?.setupDuration ?? 0,
            teardownDuration: generalData?.teardownDuration ?? 0,
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        return;
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
                        {...register("musicianNumber")}
                        error={errors.musicianNumber?.message}
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
                        {...register("soundcheckDuration")}
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
                        {...register("setupDuration")}
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
                        {...register("teardownDuration")}
                        error={errors.teardownDuration?.message}
                    />
                </Field>

                <FormFooter isDirty={isDirty} />
            </form>
        </RiderCard>
    );
}
