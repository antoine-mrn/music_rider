import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    values: { id: number; label: string }[];
    error?: string;
}

export default function Select({
    className,
    values,
    error,
    ...props
}: SelectProps) {
    return (
        <div className="w-full">
            <select
                defaultValue="Choisissez un style"
                className="select appearance-none"
                {...props}
            >
                <option disabled={true}>Choisissez un style</option>
                {values.map((value) => (
                    <option key={value.id}>{value.label}</option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm font-bold text-error">{error}</p>
            )}
        </div>
    );
}
