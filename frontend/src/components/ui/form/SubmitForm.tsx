import Button from "../button/Button";

interface SubmitFormProps {
    label: string;
    isPending: boolean;
    error: string | null;
    className?: string;
    onClick?: () => void;
}

export default function SubmitForm({
    label,
    isPending,
    error,
    className,
    onClick,
}: SubmitFormProps) {
    return (
        <div className={`${className}`}>
            <Button
                type={onClick ? "button" : "submit"}
                onClick={onClick}
                disabled={isPending}
            >
                {label}
            </Button>
            {error && (
                <p className="mt-1 text-sm font-bold text-error text-center">
                    {error}
                </p>
            )}
        </div>
    );
}
