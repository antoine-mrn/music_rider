type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
};

export default function Input({ error, ...props }: InputProps) {
    return (
        <div className="w-full">
            <input
                {...props}
                className="input w-full border-2 border-neutral-content focus:border-primary font-semibold h-12"
            />
            {error && (
                <p className="mt-1 text-sm font-bold text-error">{error}</p>
            )}
        </div>
    );
}
