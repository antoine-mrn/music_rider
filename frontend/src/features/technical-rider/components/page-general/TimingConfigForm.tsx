import Field from "../../../../components/ui/form/Field";
import Input from "../../../../components/ui/form/Input";
import Label from "../../../../components/ui/form/Label";
import FormFooter from "../FormFooter";
import RiderCard from "../RiderCard";

export default function TimingConfigForm() {
    return (
        <RiderCard title="Timing et configuration">
            <form className="flex flex-col gap-2">
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
                    />
                </Field>
                <Field>
                    <Label
                        label="Durée du soundcheck"
                        htmlFor="soundcheck-duration"
                    />
                    <Input
                        type="time"
                        id="soundcheck-duration"
                        placeholder="00 : 00"
                    />
                </Field>

                <Field>
                    <Label
                        label="Durée d'installation"
                        htmlFor="setup-duration"
                    />
                    <Input
                        type="time"
                        id="setup-duration"
                        placeholder="00 : 00"
                    />
                </Field>

                <Field>
                    <Label
                        label="Durée de démontage"
                        htmlFor="teardown-duration"
                    />
                    <Input
                        type="time"
                        id="teardown-duration"
                        placeholder="00 : 00"
                    />
                </Field>

                <FormFooter />
            </form>
        </RiderCard>
    );
}
