export default function PageTitle({ title }: { title: string }) {
    return (
        <h1 className="text-6xl font-black text-base-content tracking-tighter mb-4 italic">
            {title}
        </h1>
    );
}
