import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    defaultOption: string;
    values: { id: number; label: string }[];
    error?: string;
}

export default function Select({
    className,
    defaultOption,
    values,
    error,
    ...props
}: SelectProps) {
    return (
        <div>
            <select
                defaultValue=""
                className="select appearance-none w-full"
                {...props}
            >
                <option disabled value="">
                    {defaultOption}
                </option>
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
