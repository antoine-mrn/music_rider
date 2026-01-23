import { Link } from "react-router";

type AuthButtonVariant = "primary" | "soft";

interface AuthButtonProps {
    to: string;
    variant: AuthButtonVariant;
    children: React.ReactNode;
}

const variantClasses: Record<AuthButtonVariant, string> = {
    primary: "btn btn-primary text-base-100 shadow-primary/30",
    soft: "btn btn-soft shadow-neutral/30",
};

export default function AuthButton({ to, variant, children }: AuthButtonProps) {
    return (
        <Link
            to={to}
            className={`px-6 font-bold rounded-md shadow-md border-none hover:scale-102 transition-all ${variantClasses[variant]}`}
        >
            {children}
        </Link>
    );
}
