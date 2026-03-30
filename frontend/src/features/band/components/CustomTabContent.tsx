import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import Label from "../../../components/ui/form/Label";

export default function CustomTabContent() {
    return (
        <div className="flex gap-2">
            <Field>
                <Label label="Prénom" htmlFor="firstname" />
                <Input type="text" id="firstname" placeholder="John" />
            </Field>
            <Field>
                <Label label="Nom" htmlFor="lastname" />
                <Input type="text" id="lastname" placeholder="Doe" />
            </Field>
        </div>
    );
}
