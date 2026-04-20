import Field from "../../../../components/ui/form/Field";
import Input from "../../../../components/ui/form/Input";
import Label from "../../../../components/ui/form/Label";
import FormFooter from "../FormFooter";
import RiderCard from "../RiderCard";

export default function TechnicalStaffForm() {
    return (
        <RiderCard title="Equipe technique">
            <form className="flex flex-col gap-2">
                <Field>
                    <Label label="Ingé son" htmlFor="sound-engineer" />
                    <Input
                        type="text"
                        id="sound-engineer"
                        placeholder="Prénom Nom"
                    />
                </Field>
                <Field>
                    <Label label="Ingé light" htmlFor="light-engineer" />
                    <Input
                        type="text"
                        id="light-engineer"
                        placeholder="Prénom Nom"
                    />
                </Field>
                <FormFooter className="place-self-end" />
            </form>
        </RiderCard>
    );
}
