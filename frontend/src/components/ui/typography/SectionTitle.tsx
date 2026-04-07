export default function SectionTitle({
    title,
    className,
}: {
    title: string;
    className?: string;
}) {
    return (
        <h2 className={`font-bold text-xl italic uppercase ${className}`}>
            {title}
        </h2>
    );
}
