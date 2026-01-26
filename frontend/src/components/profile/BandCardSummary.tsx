export default function BandCardSummary() {
    return (
        <article className="card w-full cursor-pointer card-border border-2 p-4 hover:border-primary/30 transition sm:max-w-64">
            <div className="card-body">
                {/* Haut de card */}
                <div className="flex items-center justify-between">
                    <div className="rounded-xl bg-primary/8 text-4xl p-3">
                        🎸
                    </div>
                    <span className="badge rounded-2xl italic font-bold">
                        Leader
                    </span>
                </div>

                {/* Groupe & genre */}
                <div>
                    <h3 className="font-bold text-lg">SMBU</h3>
                    <h4 className="text-base-content/50 font-bold text-md">
                        Electro / Métal
                    </h4>
                </div>

                {/* Nombre de personnes */}
                <div className="avatar-group -space-x-6">
                    <div className="avatar">
                        <div className="w-12">
                            <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
                        </div>
                    </div>
                    <div className="avatar avatar-placeholder">
                        <div className="bg-neutral text-neutral-content w-12">
                            <span>+99</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}
