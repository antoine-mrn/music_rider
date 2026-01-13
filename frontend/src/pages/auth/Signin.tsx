import { Link } from "react-router";
import Label from "../../components/form/Label";
import Input from "../../components/form/Input";
import Field from "../../components/form/Field";
import { Menu } from "lucide-react";

export default function Signin() {
    return (
        <div className="flex min-h-screen">
            <section className="w-full flex flex-col justify-center items-center lg:w-1/2">
                <div className="mx-auto">
                    <div className="mb-10">
                        <h1 className="text-3xl font-black mb-2 tracking-tight">
                            Bon retour parmi nous.
                        </h1>
                        <p className="text-base-content/70 font-medium">
                            Pas de compte ?{" "}
                            <Link
                                to="/signup"
                                className="text-primary font-bold hover:underline"
                            >
                                S'inscrire gratuitement
                            </Link>
                        </p>
                    </div>
                    <form className="space-y-6">
                        <Field>
                            <Label label="e-mail" htmlFor="email" />
                            <Input
                                type="email"
                                placeholder="john.doe@mail.com"
                            />
                        </Field>
                        <Field>
                            <Label label="Mot de passe" htmlFor="password" />
                            <Input type="password" placeholder="********" />
                        </Field>

                        <button
                            type="submit"
                            className="btn btn-primary w-full p-4"
                        >
                            Se connecter
                        </button>
                    </form>
                </div>
            </section>
            <section className="hidden bg-base-200 flex-col justify-center items-center gap-8 lg:flex lg:w-1/2">
                <div className="bg-primary/8 w-fit p-3 rounded-xl">
                    <Menu
                        color="var(--color-primary)"
                        size={54}
                        strokeWidth={2}
                    />
                </div>
                <p className="font-black text-3xl text-base-content/90 italic">
                    "Le backling est prêt."
                </p>
                <p className="text-base-content/70 max-w-sm text-center font-medium italic text-lg">
                    Connectez-vous pour mettre à jour vos riders ou consulter
                    vos prochaines feuilles de route.
                </p>
            </section>
        </div>
    );
}
