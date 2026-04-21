import { Trash } from "lucide-react";
import Button from "../../../../components/ui/button/Button";
import Input from "../../../../components/ui/form/Input";
import Select from "../../../../components/ui/form/Select";
import FormFooter from "../FormFooter";
import RiderCard from "../RiderCard";

export default function TechnicalStaffForm() {
    return (
        <RiderCard title="Equipe technique">
            <div className="grid grid-cols-2 gap-2 bg-base-200 p-4 rounded-md shadow">
                <Input
                    type="text"
                    placeholder="Prénom Nom"
                    className="col-span-2"
                />
                <Input type="mail" placeholder="john.doe@gmail.com" />
                <Input type="phone" placeholder="+33 6 12 34 56 78" />
                <Select
                    className="col-span-2"
                    defaultOption="Mission"
                    values={[
                        { id: 1, label: "Ingé son" },
                        { id: 2, label: "Ingé light" },
                    ]}
                />
                <Button className="col-span-2">Ajouter à l'équipe</Button>
            </div>

            <div className="mt-4 space-y-6">
                <div>
                    <h3 className="text-primary uppercase italic font-semibold">
                        Audio
                    </h3>
                    <ul className="mt-2 space-y-2">
                        <li className="space-y-2">
                            <div className="flex justify-between items-center bg-base-100 border border-base-200 p-3 rounded-xl shadow-sm">
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm uppercase italic">
                                        Marc Lefebvre
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        marc.son@mail.com
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        ++33 6 12 34 56 78
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    shape="circle"
                                    className="text-error p-1"
                                >
                                    <Trash />
                                </Button>
                            </div>
                        </li>
                        <li className="space-y-2">
                            <div className="flex justify-between items-center bg-base-100 border border-base-200 p-3 rounded-xl shadow-sm">
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm uppercase italic">
                                        Marc Lefebvre
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        marc.son@mail.com
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        ++33 6 12 34 56 78
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    shape="circle"
                                    className="text-error p-1"
                                >
                                    <Trash />
                                </Button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-secondary uppercase italic font-semibold">
                        Lumière
                    </h3>
                    <ul className="mt-2 space-y-2">
                        <li className="space-y-2">
                            <div className="flex justify-between items-center bg-base-100 border border-base-200 p-3 rounded-xl shadow-sm">
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm uppercase italic">
                                        Marc Lefebvre
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        marc.son@mail.com
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        ++33 6 12 34 56 78
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    shape="circle"
                                    className="text-error p-1"
                                >
                                    <Trash />
                                </Button>
                            </div>
                        </li>
                        <li className="space-y-2">
                            <div className="flex justify-between items-center border border-base-200 p-3 rounded-xl shadow-sm">
                                <div className="flex flex-col">
                                    <span className="font-bold text-sm uppercase italic">
                                        Marc Lefebvre
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        marc.son@mail.com
                                    </span>
                                    <span className="text-xs text-base-content/50">
                                        ++33 6 12 34 56 78
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    shape="circle"
                                    className="text-error p-1"
                                >
                                    <Trash />
                                </Button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <FormFooter />
        </RiderCard>
    );
}
