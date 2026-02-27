import type { BandContact } from "../types";

export default function PrimaryContactSection({
    primaryContact,
    className,
}: {
    primaryContact: BandContact | null;
    className?: string;
}) {
    return (
        <article
            className={`card bg-info-content text-neutral-content ${className}`}
        >
            <div className="card-body">
                <h2 className="card-title italic font-black text-xl">
                    Contact principal
                </h2>
                {primaryContact ? (
                    <div className="mt-4">
                        <h3 className="uppercase font-black text-lg">
                            {primaryContact.firstname} {primaryContact.lastname}
                        </h3>
                        <span className="text-primary-content italic">
                            {primaryContact.contactRole}
                        </span>
                        <div className="flex flex-col mt-4 font-medium">
                            <a href={`mailto:${primaryContact.email}`}>
                                {primaryContact.email}
                            </a>
                            <span>{primaryContact.phone}</span>
                        </div>
                    </div>
                ) : (
                    <p className="mt-4">Aucun contact principal défini</p>
                )}
            </div>
        </article>
    );
}
