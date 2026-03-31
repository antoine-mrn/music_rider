import type { FieldErrors, UseFormRegister } from "react-hook-form";
import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import Label from "../../../components/ui/form/Label";
import type { AddMemberToBandType } from "../../../schemas/add-member-to-band.schema";

export default function CustomTabContent({
    register,
    errors,
}: {
    register: UseFormRegister<AddMemberToBandType>;
    errors: FieldErrors<Extract<AddMemberToBandType, { mode: "custom" }>>;
}) {
    return (
        <div className="flex gap-2">
            <Field>
                <Label label="Prénom" htmlFor="firstname" />
                <Input
                    type="text"
                    id="firstname"
                    placeholder="John"
                    {...register("firstname")}
                    error={errors.firstname?.message}
                />
            </Field>
            <Field>
                <Label label="Nom" htmlFor="lastname" />
                <Input
                    type="text"
                    id="lastname"
                    placeholder="Doe"
                    {...register("lastname")}
                    error={errors.lastname?.message}
                />
            </Field>
        </div>
    );
}
