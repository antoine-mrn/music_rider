import { Link } from "react-router";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import Field from "../../components/form/Field";

export default function Signin() {
    return (
        <div className="flex">
            <section className="w-full lg:w-1/2 flex flex-col place-items-center">
                <div>
                    <h1>Bon retour parmi nous.</h1>
                    <p>
                        Pas de compte ?{" "}
                        <Link to="/signup">S'inscrire gratuitement</Link>
                    </p>
                </div>
                <form>
                    <Field>
                        <Label label="e-mail" htmlFor="email" />
                        <Input type="email" placeholder="john.doe@mail.com" />
                    </Field>
                    <Field>
                        <Label label="Mot de passe" htmlFor="password" />
                        <Input type="password" />
                    </Field>

                    <button type="submit">Se connecter</button>
                </form>
            </section>
            <section className="hidden place-content-center lg:flex lg:w-1/2">
                Le backline est prêt
            </section>
        </div>
    );
}
