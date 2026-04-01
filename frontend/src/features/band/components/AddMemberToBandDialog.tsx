import { useRef, useState } from "react";
import Modal from "../../../components/ui/modal/Modal";
import Tabs from "../../../components/ui/tabs/Tabs";
import AccountTabContent from "./AccountTabContent";
import CustomTabContent from "./CustomTabContent";
import Field from "../../../components/ui/form/Field";
import Label from "../../../components/ui/form/Label";
import Input from "../../../components/ui/form/Input";
import Button from "../../../components/ui/button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldErrors } from "react-hook-form";
import {
    type AddMemberToBandType,
    AddMemberToBandSchema,
} from "../../../schemas/add-member-to-band.schema";
import { useFindAllInstrument } from "../../instrument/hooks/useFindAllInstrument";

const TABS = [
    { label: "Via un compte", mode: "account" },
    { label: "Personnalisé", mode: "custom" },
];

export default function AddMemberToBandDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [selectedTab, setSelectedTab] = useState(0);

    const { data: instrumentsList } = useFindAllInstrument();
    const [instrumentInputValue, setInstrumentInputValue] = useState("");
    const [instrumentsSelected, setInstrumentsSelected] = useState<string[]>(
        [],
    );

    function handleAddInstrument(instrument: { id: number; label: string }) {
        const isAlreadyInList = instrumentsSelected.includes(instrument.label);

        if (isAlreadyInList) return;

        setInstrumentsSelected([...instrumentsSelected, instrument.label]);
        setInstrumentInputValue("");
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AddMemberToBandType>({
        resolver: zodResolver(AddMemberToBandSchema),
    });

    const errorsAccount = errors as FieldErrors<
        Extract<AddMemberToBandType, { mode: "account" }>
    >;
    const errorsCustom = errors as FieldErrors<
        Extract<AddMemberToBandType, { mode: "custom" }>
    >;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="font-bold text-lg mb-8">
                Ajouter un membre au groupe
            </h2>
            <form className="space-y-8">
                <Tabs
                    items={TABS}
                    activeIndex={selectedTab}
                    onChange={setSelectedTab}
                >
                    {selectedTab === 0 ? (
                        <AccountTabContent
                            register={register}
                            errors={errorsAccount.email?.message}
                        />
                    ) : (
                        <CustomTabContent
                            register={register}
                            errors={errorsCustom}
                        />
                    )}
                </Tabs>

                {/* Field instrument */}
                <div className="relative">
                    <Field>
                        <Label label="Instrument joué" htmlFor="instrument" />
                        <Input
                            value={instrumentInputValue}
                            onChange={(e) =>
                                setInstrumentInputValue(e.target.value)
                            }
                            placeholder="Guitare"
                            id="instrument"
                        />

                        {instrumentInputValue.length > 0 && (
                            <div className="absolute bg-base-100 rounded-xl shadow top-20 w-full overflow-x-auto p-2 grid grid-flow-col gap-2 grid-rows-2">
                                {instrumentsList
                                    ?.filter((i) =>
                                        i.label
                                            .toLowerCase()
                                            .includes(instrumentInputValue),
                                    )
                                    .map((instrument) => (
                                        <span
                                            onClick={() =>
                                                handleAddInstrument(instrument)
                                            }
                                            className="text-sm font-semibold italic p-2 cursor-pointer rounded-lg transition-colors whitespace-nowrap hover:bg-primary/8"
                                        >
                                            {instrument.label}
                                        </span>
                                    ))}
                            </div>
                        )}
                        <div>
                            {instrumentsSelected.map((instrument) => (
                                <span className="badge badge-soft badge-primary">
                                    {instrument}
                                </span>
                            ))}
                        </div>
                    </Field>
                    <span className="text-xs text-base-content/50 italic">
                        Vous pouvez sélectionner un ou plusieurs instruments
                    </span>
                </div>

                {/* form submit */}
                <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                        className="flex-1 uppercase italic font-black py-4 sm:py-0"
                        variant="soft"
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 uppercase italic font-black py-4 sm:py-0"
                    >
                        Confirmer
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
