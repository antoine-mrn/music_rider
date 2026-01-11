import { Grid2x2, Menu, Users } from "lucide-react";
import HomeCard from "./HomeCard";
import { motion } from "motion/react";

export default function FeaturesSection() {
    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemFromTop = {
        hidden: { opacity: 0, y: -40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
    };

    const itemFromBottom = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
    };

    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex place-items-center flex-col bg-base-200 py-24 px-6 lg:px-20"
        >
            <motion.h2
                variants={itemFromTop}
                className="text-4xl font-bold md:text-5xl text-base-content mb-4"
            >
                L'outil tout-en-un des pros
            </motion.h2>
            <motion.p
                variants={itemFromBottom}
                className="text-xl text-base-content/50 leading-relaxed mb-10"
            >
                Une interface pensée pour la rapidité sur le terrain, en
                coulisses ou en studio.
            </motion.p>

            <ul className="flex flex-col md:flex-row gap-4 max-w-7xl sm:gap-10">
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
        </motion.section>
    );
}
