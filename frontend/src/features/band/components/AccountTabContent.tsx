import type { UseFormRegister } from "react-hook-form";
import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import Label from "../../../components/ui/form/Label";
import type { AddMemberToBandType } from "../../../schemas/add-member-to-band.schema";

export default function AccountTabContent({
    register,
    errors,
}: {
    register: UseFormRegister<AddMemberToBandType>;
    errors?: string;
}) {
    return (
        <Field>
            <Label label="Recherche par email" htmlFor="email"></Label>
            <Input
                type="email"
                id="email"
                placeholder="john.doe@gmail.com"
                {...register("email")}
                error={errors}
            />
        </Field>
    );
}
