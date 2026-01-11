export default function HomeCard({ children }: { children: React.ReactNode }) {
    return (
        <li className="card bg-base-100 card-lg shadow-xl rounded-2xl hover:shadow-2xl transition-all border border-base-200">
            <div className="card-body">{children}</div>
        </li>
    );
}
