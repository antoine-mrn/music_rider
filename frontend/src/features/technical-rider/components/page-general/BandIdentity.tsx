import { Pencil } from "lucide-react";
import SectionTitle from "../../../../components/ui/typography/SectionTitle";
import type { TechnicalRiderBandContact } from "../../types";

interface BandIdentityProps {
    bandName: string | undefined;
    bandContact: TechnicalRiderBandContact | null;
}

export default function BandIdentity({
    bandName,
    bandContact,
}: BandIdentityProps) {
    return (
        <section className="card bg-info-content text-neutral-content">
            <div className="card-body">
                <div className="flex justify-between">
                    <SectionTitle
                        title="Identité du projet"
                        className="text-white"
                    />
                    <span className="cursor-pointer bg-white flex items-center justify-center rounded-full text-black transition-colors hover:bg-primary p-2">
                        <Pencil size={14} />
                    </span>
                </div>
                <div className="mt-4">
                    <h3 className="text-primary-content uppercase text-xs">
                        Nom du groupe
                    </h3>
                    <span className="uppercase font-black text-4xl text-white italic">
                        {bandName}
                    </span>
                    <div className="divider divider-primary"></div>
                    <div className="flex flex-wrap gap-4 mt-4 font-medium sm:gap-16">
                        <div>
                            <span className="text-primary-content uppercase text-xs block">
                                Contact principal
                            </span>
                            <span className="uppercase font-black text-white italic">
                                {bandContact?.firstname} {bandContact?.lastname}
                            </span>
                        </div>
                        {bandContact?.email && (
                            <div>
                                <span className="text-primary-content text-xs uppercase block">
                                    Email:{" "}
                                </span>
                                <a
                                    className="text-white block"
                                    href={`mailto:antoine@gmail.com`}
                                >
                                    antoine@gmail.com
                                </a>
                            </div>
                        )}
                        {bandContact?.phone && (
                            <div>
                                <span className="text-primary-content text-xs uppercase block">
                                    Phone:{" "}
                                </span>
                                <span className="text-white">
                                    +33 7 12 34 56 67
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
