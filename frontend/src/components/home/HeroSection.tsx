export default function HeroSection() {
    return (
        <section className="hero bg-primary/8 min-h-screen">
            <div className="hero-content text-center">
                <div className="max-w-3xl">
                    <div className="badge badge-outline badge-primary h-auto rounded-2xl font-bold uppercase tracking-widest mb-6 sm:whitespace-nowrap">
                        Propulsé par les musiciens, pour les techniciens
                    </div>
                    <h1 className="text-6xl font-bold md:text-7xl mb-8">
                        La fiche technique{" "}
                        <span className="text-primary italic">
                            nouvelle génération.
                        </span>
                    </h1>
                    <p className="text-xl text-base-content/70 leading-relaxed mb-10">
                        Dites adieu aux PDFs illisibles. Créez des patch-lists
                        dynamiques, des plans de scène interactifs et gérez
                        votre logistique de tournée en un clic.
                    </p>
                    <button className="btn btn-primary btn-xl rounded-lg shadow-lg shadow-primary/30">
                        Créer mon rider
                    </button>
                </div>
            </div>
        </section>
    );
}
