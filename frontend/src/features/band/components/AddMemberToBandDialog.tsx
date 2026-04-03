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
import { useClickOutside } from "../../../hooks/useClickOutside";

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

    const instrumentSuggestionRef = useRef<HTMLDivElement>(null);
    const [isSuggestionOpen, setIsSuggestionOpen] = useState<boolean>(false);
    useClickOutside(instrumentSuggestionRef, () => setIsSuggestionOpen(false));

    const { data: instrumentsList } = useFindAllInstrument();
    const [instrumentInputValue, setInstrumentInputValue] = useState("");
    const [instrumentsSelected, setInstrumentsSelected] = useState<
        {
            id: number;
            label: string;
        }[]
    >([]);

    const suggestedInstruments = instrumentsList?.filter((i) =>
        i.label.toLowerCase().includes(instrumentInputValue),
    );

    function handleAddInstrument(instrument: { id: number; label: string }) {
        const isAlreadyInList = instrumentsSelected.find(
            (i) => i.id === instrument.id,
        );

        if (isAlreadyInList) return;

        setInstrumentsSelected((prev) => [...prev, instrument]);
        setInstrumentInputValue("");

        const selectedIds = watch("instrumentId");
        setValue("instrumentId", [...selectedIds, instrument.id]);
    }

    function handleDeleteInstrument(instrument: { id: number; label: string }) {
        const newInstrumentsSelectedList = instrumentsSelected.filter(
            (i) => i.id !== instrument.id,
        );

        setInstrumentsSelected(newInstrumentsSelectedList);
        setValue("instrumentId", [
            ...newInstrumentsSelectedList.map((i) => i.id),
        ]);
    }

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<AddMemberToBandType>({
        resolver: zodResolver(AddMemberToBandSchema),
        defaultValues: { instrumentId: [] },
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log("🚀 ~ AddMemberToBandDialog ~ data:", data);
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
                            onFocus={() => setIsSuggestionOpen(true)}
                            value={instrumentInputValue}
                            onChange={(e) =>
                                setInstrumentInputValue(e.target.value)
                            }
                            placeholder="Guitare"
                            id="instrument"
                        />

                        {isSuggestionOpen &&
                            instrumentInputValue.length > 0 && (
                                <div
                                    ref={instrumentSuggestionRef}
                                    className="absolute z-10 bg-base-100 rounded-xl shadow top-20 w-full overflow-x-auto p-2 grid grid-flow-col gap-2 grid-rows-2"
                                >
                                    {suggestedInstruments &&
                                    suggestedInstruments.length > 0 ? (
                                        suggestedInstruments.map(
                                            (instrument) => (
                                                <span
                                                    key={instrument.id}
                                                    onClick={() =>
                                                        handleAddInstrument(
                                                            instrument,
                                                        )
                                                    }
                                                    className="text-sm font-semibold italic p-2 cursor-pointer rounded-lg transition-colors whitespace-nowrap hover:bg-primary/8"
                                                >
                                                    {instrument.label}
                                                </span>
                                            ),
                                        )
                                    ) : (
                                        <span className="text-sm text-base-content/50 italic flex place-content-center">
                                            Aucun instrument trouvé...
                                        </span>
                                    )}
                                </div>
                            )}
                        <p className="text-xs text-base-content/50 italic">
                            Vous pouvez sélectionner un ou plusieurs instruments
                        </p>
                        {errors.instrumentId && (
                            <p className="mt-1 text-sm font-bold text-error">
                                {errors.instrumentId.message}
                            </p>
                        )}
                        <div className="flex gap-4 flex-wrap mt-2">
                            {instrumentsSelected.map((instrument) => (
                                <span
                                    key={instrument.id}
                                    className="badge badge-soft badge-primary relative"
                                >
                                    {instrument.label}
                                    <button
                                        onClick={() =>
                                            handleDeleteInstrument(instrument)
                                        }
                                        type="button"
                                        className="absolute font-light bg-error bottom-3 -right-1.5 w-4 h-4 rounded-full cursor-pointer text-xs text-base-content hover:scale-110 transition all"
                                    >
                                        X
                                    </button>
                                </span>
                            ))}
                        </div>
                    </Field>
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
                        onClick={onSubmit}
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
