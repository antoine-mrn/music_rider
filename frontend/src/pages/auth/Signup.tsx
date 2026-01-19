import { Link } from "react-router";
import SignupForm from "../../components/auth/SignupForm";
import { Check } from "lucide-react";

export default function Signup() {
    return (
        <div className="flex min-h-screen">
            <section className="hidden pt-24 bg-base-200 flex-col justify-center items-center gap-8 lg:flex lg:w-1/2">
                <h2 className="text-5xl font-black leading-tight mb-6 tracking-tight">
                    Rejoignez la{" "}
                    <span className="text-primary-content/80 italic">
                        nouvelle ère
                    </span>{" "}
                    de la régie.
                </h2>
                <ul className="space-y-4 text-lg opacity-90 font-medium">
                    <li className="flex items-center gap-3">
                        <Check
                            width={24}
                            height={24}
                            color="var(--color-success)"
                        />
                        Plans de scène interactifs
                    </li>
                    <li className="flex items-center gap-3">
                        <Check
                            width={24}
                            height={24}
                            color="var(--color-success)"
                        />
                        Patch lists générées en un clic
                    </li>
                    <li className="flex items-center gap-3">
                        <Check
                            width={24}
                            height={24}
                            color="var(--color-success)"
                        />
                        Partage instantané avec les salles au format PDF
                    </li>
                </ul>
            </section>
            <section className="w-full pt-24 flex flex-col justify-center items-center lg:w-1/2">
                <div className="w-xs my-24 md:w-sm">
                    <div className="mb-10">
                        <h1 className="text-3xl font-black mb-2 tracking-tight">
                            Créer un compte
                        </h1>
                        <p className="text-base-content/70 font-medium">
                            Déjà inscrit ?{" "}
                            <Link
                                to="/signin"
                                className="text-primary font-bold hover:underline"
                            >
                                Se connecter
                            </Link>
                        </p>
                    </div>
                    <SignupForm />
                </div>
            </section>
        </div>
    );
}
