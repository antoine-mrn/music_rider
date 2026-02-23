import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "neutral" | "ghost" | "soft";
    typeStyle?: "soft" | "outline" | "disabled";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    shape?: "circle" | "square" | "default";
    children: ReactNode;
}

const variantClass: Record<string, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    neutral: "btn-neutral",
    ghost: "btn-ghost",
    soft: "btn-soft",
};

const typeStyleClass: Record<string, string> = {
    soft: "btn-soft",
    outline: "btn-outline",
    disabled: "btn-disabled",
};

const sizeClass: Record<string, string> = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "",
    lg: "btn-lg",
    xl: "btn-xl",
};

const shapeClass: Record<string, string> = {
    circle: "btn-circle",
    square: "btn-square",
    default: "rounded-lg",
};

export default function Button({
    variant = "primary",
    typeStyle,
    size = "md",
    shape = "default",
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`btn ${variantClass[variant]} ${typeStyle && typeStyleClass[typeStyle]} ${sizeClass[size]} ${shapeClass[shape]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
