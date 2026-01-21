interface LabelProps {
    label: string;
    htmlFor: string;
}

export default function Label({ label, htmlFor }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className="font-bold">
            {label}
        </label>
    );
}
