type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
};

export default function Input({ error, ...props }: InputProps) {
    return (
        <div className="w-full">
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
