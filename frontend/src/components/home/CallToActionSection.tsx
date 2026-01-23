import type { Variants } from "motion";
import { motion } from "motion/react";

export default function CallToActionSection() {
    const scaleAnimation: Variants = {
        hidden: { opacity: 0, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    return (
        <section className="bg-base-200 pb-24 px-6">
            <motion.div
                variants={scaleAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="card bg-neutral/80 max-w-7xl mx-auto rounded-2xl flex flex-col place-items-center py-10"
            >
                <div className="card-body">
                    <h2 className="text-neutral-content text-4xl font-bold mb-8 md:text-5xl">
                        Prêt à simplifier votre régie ?
                    </h2>
                    <p className="text-xl text-neutral-content mb-10 max-w-2xl mx-auto">
                        Rejoignez les premiers groupes et régisseurs à
                        simplifier leur régie.
                    </p>
                    <div className="card-actions">
                        <button className="btn btn-primary btn-xl rounded-lg mx-auto">
                            Commencer maintenant — C'est gratuit
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
