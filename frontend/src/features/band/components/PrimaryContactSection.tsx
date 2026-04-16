import { Pencil } from "lucide-react";
import SectionTitle from "../../../components/ui/typography/SectionTitle";
import { CONTACT_ROLES } from "../../../shared/constantes/contact-role";
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
                <div className="flex justify-between">
                    <SectionTitle
                        title="Contact principal"
                        className="text-white"
                    />
                    <span className="cursor-pointer bg-white flex items-center justify-center rounded-full text-black transition-colors hover:bg-primary p-2">
                        <Pencil size={14} />
                    </span>
                </div>
                {primaryContact ? (
                    <div className="mt-4">
                        <h3 className="uppercase font-black text-lg text-white">
                            {primaryContact.firstname} {primaryContact.lastname}
                        </h3>
                        <span className="text-primary-content italic">
                            {CONTACT_ROLES[primaryContact.contactRole]}
                        </span>
                        <div className="flex flex-col mt-4 font-medium">
                            <div className="text-sm font-bold space-x-4">
                                <span className="text-slate-300">Email: </span>
                                <a
                                    className="text-white"
                                    href={`mailto:${primaryContact.email}`}
                                >
                                    {primaryContact.email}
                                </a>
                            </div>

                            {primaryContact.phone && (
                                <div className="text-sm font-bold space-x-4">
                                    <span className="text-slate-300">
                                        Phone:{" "}
                                    </span>
                                    <span className="text-white">
                                        {primaryContact.phone}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="mt-4">Aucun contact principal défini</p>
                )}
            </div>
        </article>
    );
}
