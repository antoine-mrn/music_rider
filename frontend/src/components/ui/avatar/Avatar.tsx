interface AvatarProps {
    src?: string | null;
    alt?: string;
    size?: "sm" | "md" | "lg";
    ring?: boolean;
    className?: string;
}

const sizeClass = {
    sm: "w-12",
    md: "w-16",
    lg: "w-24",
};

export default function Avatar({
    src,
    alt = "Avatar",
    size = "md",
    ring = false,
    className,
}: AvatarProps) {
    return (
        <div className="avatar">
            <div
                className={`rounded-full ${sizeClass[size]} ${ring && "ring-primary ring-2 ring-offset-2"} ${className}`}
            >
                <img src={src ?? "/default-avatar.png"} alt={alt} />
            </div>
        </div>
    );
}
