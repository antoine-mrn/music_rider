export default function CallToActionSection() {
    return (
        <section className="bg-base-200 pb-24 px-6">
            <div className="bg-neutral/80 max-w-7xl mx-auto rounded-2xl flex flex-col place-items-center py-20 px-6">
                <h2 className="text-neutral-content text-4xl font-bold mb-8 md:text-5xl">
                    Prêt à simplifier votre régie ?
                </h2>
                <p className="text-xl text-neutral-content mb-10 max-w-2xl mx-auto">
                    Rejoignez les premiers groupes et régisseurs à simplifier
                    leur régie.
                </p>
                <button className="btn btn-primary btn-lg rounded-lg py-8 px-8 sm:px-12">
                    Commencer maintenant — C'est gratuit
                </button>
            </div>
        </section>
    );
}
