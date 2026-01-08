import { Grid2x2, Menu, Users } from "lucide-react";
import HomeCard from "./HomeCard";

export default function FeaturesSection() {
    return (
        <section className="flex place-items-center flex-col bg-base-200 py-24 px-6 lg:px-20">
            <h2 className="text-4xl font-bold md:text-5xl text-base-content">
                L'outil tout-en-un des pros
            </h2>
            <p className="text-xl text-base-content/50 leading-relaxed mb-10">
                Une interface pensée pour la rapidité sur le terrain, en
                coulisses ou en studio.
            </p>

            <ul className="flex flex-col lg:flex-row gap-10">
                <HomeCard>
                    <div className="bg-primary/8 w-fit p-3 rounded-xl mb-6">
                        <Grid2x2
                            color="var(--color-primary)"
                            size={38}
                            strokeWidth={2}
                        />
                    </div>
                    <h3 className="text-primary/80 font-bold text-xl mb-3">
                        Plan de Scène Interactif
                    </h3>
                    <p className="text-base-content/70">
                        Glissez-déposez vos instruments sur une grille pro.
                        Exportez un plan clair pour les régisseurs.
                    </p>
                </HomeCard>
                <HomeCard>
                    <div className="bg-primary/8 w-fit p-3 rounded-xl mb-6">
                        <Menu
                            color="var(--color-primary)"
                            size={38}
                            strokeWidth={2}
                        />
                    </div>
                    <h3 className="text-primary/80 font-bold text-xl mb-3">
                        Patch List Dynamique
                    </h3>
                    <p className="text-base-content/70">
                        Gérez vos entrées/sorties audio avec précision. Vos
                        techniciens reçoivent une liste toujours à jour.
                    </p>
                </HomeCard>
                <HomeCard>
                    <div className="bg-primary/8 w-fit p-3 rounded-xl mb-6">
                        <Users
                            color="var(--color-primary)"
                            size={38}
                            strokeWidth={2}
                        />
                    </div>
                    <h3 className="text-primary/80 font-bold text-xl mb-3">
                        Espace Tournée
                    </h3>
                    <p className="text-base-content/70">
                        Centralisez vos besoins en catering, hôtels et contacts
                        d'urgence pour toute l'équipe.
                    </p>
                </HomeCard>
            </ul>
        </section>
    );
}
