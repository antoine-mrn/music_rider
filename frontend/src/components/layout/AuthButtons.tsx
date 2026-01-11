export default function AuthButtons() {
    return (
        <div className="flex gap-4">
            <a
                href="/login"
                className="btn btn-soft px-6 font-bold rounded-md shadow-md shadow-neutral/30 border-none hover:scale-105 transition-all"
            >
                Se connecter
            </a>
            <a
                href="/signup"
                className="btn btn-primary px-6 rounded-md text-white shadow-md shadow-primary/30 border-none hover:scale-105 transition-transform"
            >
                S'inscrire
            </a>
        </div>
    );
}
