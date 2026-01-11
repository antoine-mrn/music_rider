import { Link } from "react-router";

export default function AuthButtons() {
    return (
        <div className="flex gap-4">
            <Link
                to="/signin"
                className="btn btn-soft px-6 font-bold rounded-md shadow-md shadow-neutral/30 border-none hover:scale-105 transition-all"
            >
                Se connecter
            </Link>
            <Link
                to="/signup"
                className="btn btn-primary px-6 rounded-md text-white shadow-md shadow-primary/30 border-none hover:scale-105 transition-transform"
            >
                S'inscrire
            </Link>
        </div>
    );
}
