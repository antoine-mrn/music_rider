interface RiderCardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export default function RiderCard({
    title,
    children,
    className,
}: RiderCardProps) {
    return (
        <section
            className={`card border border-base-300 shadow-sm bg-base-100 flex-1 ${className ?? ""}`}
        >
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                {children}
            </div>
        </section>
    );
}
