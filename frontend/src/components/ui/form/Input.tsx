type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    className?: string;
};

export default function Input({ error, className, ...props }: InputProps) {
    return (
        <div className={`w-full ${className ?? ""}`}>
            <input
                {...props}
                className="input w-full font-semibold outline-base-300 focus:border-primary"
            />
            {error && (
                <p className="mt-1 text-sm font-bold text-error">{error}</p>
            )}
        </div>
    );
}
