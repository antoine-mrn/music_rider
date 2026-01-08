export default function HomeCard({ children }: { children: React.ReactNode }) {
    return (
        <li className="card w-96 bg-base-100 card-lg shadow-sm">
            <div className="card-body">{children}</div>
        </li>
    );
}
