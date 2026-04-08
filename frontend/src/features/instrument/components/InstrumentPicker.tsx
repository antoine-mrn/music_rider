import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import Label from "../../../components/ui/form/Label";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useFindAllInstrument } from "../hooks/useFindAllInstrument";

export interface InstrumentPickerHandle {
    reset: () => void;
}

interface InstrumentPickerProps {
    value: number[];
    onChange: (ids: number[]) => void;
    error?: string;
    initialInstruments?: { id: number; label: string }[];
}

const InstrumentPicker =
    ({ value, onChange, error, initialInstruments, ref}) => {
        useImperativeHandle(ref, () => ({
            reset() {
                setInstrumentsSelected([]);
                setInstrumentInputValue("");
            },
        }));

        const instrumentSuggestionRef = useRef<HTMLDivElement>(null);
        const [isSuggestionOpen, setIsSuggestionOpen] =
            useState<boolean>(false);
        useClickOutside(instrumentSuggestionRef, () =>
            setIsSuggestionOpen(false),
        );

        const { data: instrumentsList } = useFindAllInstrument();
        const [instrumentInputValue, setInstrumentInputValue] = useState("");
        const [instrumentsSelected, setInstrumentsSelected] = useState<
            {
                id: number;
                label: string;
            }[]
        >(initialInstruments ?? []);

        const suggestedInstruments = instrumentsList?.filter((i) =>
            i.label.toLowerCase().includes(instrumentInputValue),
        );

        function handleAddInstrument(instrument: {
            id: number;
            label: string;
        }) {
            const isAlreadyInList = instrumentsSelected.find(
                (i) => i.id === instrument.id,
            );

            if (isAlreadyInList) return;

            setInstrumentsSelected((prev) => [...prev, instrument]);
            setInstrumentInputValue("");

            const selectedIds = value;
            onChange([...selectedIds, instrument.id]);
        }

        function handleDeleteInstrument(instrument: {
            id: number;
            label: string;
        }) {
            const newInstrumentsSelectedList = instrumentsSelected.filter(
                (i) => i.id !== instrument.id,
            );

            setInstrumentsSelected(newInstrumentsSelectedList);
            onChange([...newInstrumentsSelectedList.map((i) => i.id)]);
        }
        return (
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

                    {isSuggestionOpen && instrumentInputValue.length > 0 && (
                        <div
                            ref={instrumentSuggestionRef}
                            className="absolute z-10 bg-base-100 rounded-xl shadow top-20 w-full overflow-x-auto p-2 grid grid-flow-col gap-2 grid-rows-2"
                        >
                            {suggestedInstruments &&
                            suggestedInstruments.length > 0 ? (
                                suggestedInstruments.map((instrument) => (
                                    <span
                                        key={instrument.id}
                                        onClick={() =>
                                            handleAddInstrument(instrument)
                                        }
                                        className="text-sm font-semibold italic p-2 cursor-pointer rounded-lg transition-colors whitespace-nowrap hover:bg-primary/8"
                                    >
                                        {instrument.label}
                                    </span>
                                ))
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
                    {error && (
                        <p className="mt-1 text-sm font-bold text-error">
                            {error}
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
        );
    }),
);

// export default function InstrumentPicker({
//     value,
//     onChange,
//     error,
//     initialInstruments,
// }: InstrumentPickerProps) {
//     const instrumentSuggestionRef = useRef<HTMLDivElement>(null);
//     const [isSuggestionOpen, setIsSuggestionOpen] = useState<boolean>(false);
//     useClickOutside(instrumentSuggestionRef, () => setIsSuggestionOpen(false));
//
//     const { data: instrumentsList } = useFindAllInstrument();
//     const [instrumentInputValue, setInstrumentInputValue] = useState("");
//     const [instrumentsSelected, setInstrumentsSelected] = useState<
//         {
//             id: number;
//             label: string;
//         }[]
//     >(initialInstruments ?? []);
//
//     const suggestedInstruments = instrumentsList?.filter((i) =>
//         i.label.toLowerCase().includes(instrumentInputValue),
//     );
//
//     function handleAddInstrument(instrument: { id: number; label: string }) {
//         const isAlreadyInList = instrumentsSelected.find(
//             (i) => i.id === instrument.id,
//         );
//
//         if (isAlreadyInList) return;
//
//         setInstrumentsSelected((prev) => [...prev, instrument]);
//         setInstrumentInputValue("");
//
//         const selectedIds = value;
//         onChange([...selectedIds, instrument.id]);
//     }
//
//     function handleDeleteInstrument(instrument: { id: number; label: string }) {
//         const newInstrumentsSelectedList = instrumentsSelected.filter(
//             (i) => i.id !== instrument.id,
//         );
//
//         setInstrumentsSelected(newInstrumentsSelectedList);
//         onChange([...newInstrumentsSelectedList.map((i) => i.id)]);
//     }
//     return (
//         <div className="relative">
//             <Field>
//                 <Label label="Instrument joué" htmlFor="instrument" />
//                 <Input
//                     onFocus={() => setIsSuggestionOpen(true)}
//                     value={instrumentInputValue}
//                     onChange={(e) => setInstrumentInputValue(e.target.value)}
//                     placeholder="Guitare"
//                     id="instrument"
//                 />
//
//                 {isSuggestionOpen && instrumentInputValue.length > 0 && (
//                     <div
//                         ref={instrumentSuggestionRef}
//                         className="absolute z-10 bg-base-100 rounded-xl shadow top-20 w-full overflow-x-auto p-2 grid grid-flow-col gap-2 grid-rows-2"
//                     >
//                         {suggestedInstruments &&
//                         suggestedInstruments.length > 0 ? (
//                             suggestedInstruments.map((instrument) => (
//                                 <span
//                                     key={instrument.id}
//                                     onClick={() =>
//                                         handleAddInstrument(instrument)
//                                     }
//                                     className="text-sm font-semibold italic p-2 cursor-pointer rounded-lg transition-colors whitespace-nowrap hover:bg-primary/8"
//                                 >
//                                     {instrument.label}
//                                 </span>
//                             ))
//                         ) : (
//                             <span className="text-sm text-base-content/50 italic flex place-content-center">
//                                 Aucun instrument trouvé...
//                             </span>
//                         )}
//                     </div>
//                 )}
//                 <p className="text-xs text-base-content/50 italic">
//                     Vous pouvez sélectionner un ou plusieurs instruments
//                 </p>
//                 {error && (
//                     <p className="mt-1 text-sm font-bold text-error">{error}</p>
//                 )}
//                 <div className="flex gap-4 flex-wrap mt-2">
//                     {instrumentsSelected.map((instrument) => (
//                         <span
//                             key={instrument.id}
//                             className="badge badge-soft badge-primary relative"
//                         >
//                             {instrument.label}
//                             <button
//                                 onClick={() =>
//                                     handleDeleteInstrument(instrument)
//                                 }
//                                 type="button"
//                                 className="absolute font-light bg-error bottom-3 -right-1.5 w-4 h-4 rounded-full cursor-pointer text-xs text-base-content hover:scale-110 transition all"
//                             >
//                                 X
//                             </button>
//                         </span>
//                     ))}
//                 </div>
//             </Field>
//         </div>
//     );
// }
