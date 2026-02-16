import { AlertCircle, RotateCw } from "lucide-react";

interface ErrorInfoProps {
    message?: string;
    onRetry?: (param?: string | number) => void;
}

export default function ErrorInfoProps({
    message = "Une erreur est survenue lors du chargement.",
    onRetry,
}: ErrorInfoProps) {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center min-h-full">
            <AlertCircle className="w-12 h-12 text-error mb-4" />

            <h3 className="text-2xl font-black italic uppercase tracking-tight mb-2 text-base-content">
                Oups !
            </h3>

            <p className="text-base-content/70 font-bold mb-6 max-w-md">
                {message}
            </p>

            {onRetry && (
                <button
                    onClick={() => onRetry()}
                    className="btn btn-ghost btn-sm text-primary rounded-lg font-black italic uppercase tracking-widest hover:bg-primary/10"
                >
                    <RotateCw /> Réessayer
                </button>
            )}
        </div>
    );
}
