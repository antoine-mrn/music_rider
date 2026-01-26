import { motion, type Variants } from "motion/react";

export default function HeroSection() {
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        },
    };

    return (
        <section className="hero bg-primary/8 min-h-screen mt-22">
            <div className="hero-content text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl"
                >
                    <motion.div
                        variants={itemVariants}
                        className="badge badge-outline badge-primary h-auto rounded-2xl font-bold uppercase tracking-widest mb-6 sm:whitespace-nowrap"
                    >
                        Propulsé par les musiciens, pour les techniciens
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-6xl font-bold md:text-7xl mb-8"
                    >
                        La fiche technique{" "}
                        <span className="text-primary italic">
                            nouvelle génération.
                        </span>
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-base-content/70 leading-relaxed mb-10"
                    >
                        Dites adieu aux PDFs illisibles. Créez des patch-lists
                        dynamiques, des plans de scène interactifs et gérez
                        votre logistique de tournée en un clic.
                    </motion.p>
                    <motion.button
                        variants={itemVariants}
                        className="btn btn-primary btn-xl rounded-lg shadow-lg shadow-primary/30"
                    >
                        Créer mon rider
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
