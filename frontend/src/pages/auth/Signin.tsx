import { Link } from "react-router";
import SigninForm from "../../components/auth/SigninForm";
import { Menu } from "lucide-react";

export default function Signin() {
    return (
        <div className="flex min-h-screen">
            <section className="w-full pt-24 flex flex-col justify-center items-center lg:w-1/2">
                <div className="w-xs">
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
                    <SigninForm />
                </div>
            </section>
            <section className="hidden pt-24 bg-base-200 flex-col justify-center items-center gap-8 lg:flex lg:w-1/2">
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
