import Button from "../button/Button";

interface SubmitFormProps {
    label: string;
    isPending: boolean;
    error: Error | null;
    className?: string;
}

export default function SubmitForm({
    label,
    isPending,
    error,
    className,
}: SubmitFormProps) {
    return (
        <div className={`${className}`}>
            <Button type="submit" disabled={isPending}>
                {label}
            </Button>
            {error && (
                <p className="mt-1 text-sm font-bold text-error text-center">
                    {error.message}
                </p>
            )}
        </div>
    );
}
