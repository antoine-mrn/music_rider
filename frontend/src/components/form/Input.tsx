type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
    return (
        <input
            {...props}
            className="input border-2 border-neutral-content focus:border-primary w-full font-semibold h-12"
        />
    );
}
