import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import Label from "../../../components/ui/form/Label";

export default function AccountTabContent() {
    return (
        <Field>
            <Label label="Recherche par email" htmlFor="email"></Label>
            <Input type="email" id="email" placeholder="john.doe@gmail.com" />
        </Field>
    );
}
