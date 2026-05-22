export default function Field({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={`flex flex-1 flex-col gap-1 ${className}`}>
            {children}
        </div>
    );
}
