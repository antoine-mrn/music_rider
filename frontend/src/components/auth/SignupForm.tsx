import Field from "../form/Field";
import Input from "../form/Input";
import Label from "../form/Label";

export default function SignupForm() {
    return (
        <form className="space-y-6">
            <Field>
                <Label label="e-mail" htmlFor="email" />
                <Input
                    type="email"
                    id="email"
                    placeholder="john.doe@mail.com"
                />
            </Field>
            <Field>
                <Label label="Prénom" htmlFor="firstname" />
                <Input
                    type="text"
                    id="firstname"
                    placeholder="john.doe@mail.com"
                />
            </Field>
            <Field>
                <Label label="Nom" htmlFor="lastname" />
                <Input
                    type="text"
                    id="lastname"
                    placeholder="john.doe@mail.com"
                />
            </Field>
            <Field>
                <Label label="Mot de passe" htmlFor="password" />
                <Input type="password" id="password" placeholder="********" />
            </Field>
            <Field>
                <Label
                    label="Confirmez le mot de passe"
                    htmlFor="confirm-password"
                />
                <Input
                    type="password"
                    id="confirm-password"
                    placeholder="********"
                />
            </Field>

            <button type="submit" className="btn btn-primary w-full p-4">
                Commencer l'aventure
            </button>
        </form>
    );
}
