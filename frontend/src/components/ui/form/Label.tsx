interface LabelProps {
    label: string;
    htmlFor: string;
    className?: string;
}

export default function Label({ label, htmlFor, className }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className={`font-bold ${className ?? ""}`}>
            {label}
        </label>
    );
}
