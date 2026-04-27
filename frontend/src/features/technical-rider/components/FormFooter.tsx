import Button from "../../../components/ui/button/Button";

interface FormFooterProps {
    isDirty: boolean;
    isPending: boolean;
    error: Error | null;
    className?: string;
}

export default function FormFooter({
    isDirty,
    isPending,
    error,
    className,
}: FormFooterProps) {
    return (
        <div className={`mt-8 place-self-end flex gap-2 ${className ?? ""}`}>
            <div className="flex items-center gap-2">
                <div
                    aria-label={isDirty ? "warning" : "success"}
                    className={`status ${isDirty ? "status-warning" : "status-success"}`}
                ></div>
                <span className="text-xs text-base-content/50">
                    {isDirty ? "Modification non sauvegardée" : "Sauvegardé"}
                </span>
            </div>
            <Button type="submit" disabled={isPending}>
                Enregistrer
            </Button>

            {error && (
                <p className="mt-1 text-sm font-bold text-error text-center">
                    {error.message}
                </p>
            )}
        </div>
    );
}
