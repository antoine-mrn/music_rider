import { useMemo, useState } from "react";
import Field from "../../../../components/ui/form/Field";
import Input from "../../../../components/ui/form/Input";
import Label from "../../../../components/ui/form/Label";
import type { InstrumentCategoryWithInstruments } from "../../../instrument/types";

interface InstrumentLibraryProps {
    instrumentsList: InstrumentCategoryWithInstruments[];
}

export default function InstrumentLibrary({
    instrumentsList,
}: InstrumentLibraryProps) {
    const [instrumentSearch, setInstrumentSearch] = useState("");

    const instrumentSuggestion = useMemo(() => {
        if (!instrumentSearch) return instrumentsList;
        const search = instrumentSearch.toLowerCase();
        return instrumentsList.reduce(
            (
                acc: InstrumentCategoryWithInstruments[],
                item: InstrumentCategoryWithInstruments,
            ) => {
                const instrumentFinds = item.Instruments.filter((i) =>
                    i.label.toLowerCase().includes(search),
                );
                if (instrumentFinds.length > 0) {
                    acc.push({ ...item, Instruments: instrumentFinds });
                }
                return acc;
            },
            [],
        );
    }, [instrumentSearch, instrumentsList]);

    return (
        <section className="rounded-lg shadow">
            <div className="bg-base-200 rounded-lg p-4 space-y-2">
                <h2 className="font-bold">Bibliotèques d'instruments</h2>
                <Field>
                    <Label
                        label="Rechercher"
                        htmlFor="search"
                        className="sr-only"
                    />
                    <Input
                        type="text"
                        id="text"
                        placeholder="Rechercher (ex. Guitare, micro)"
                        value={instrumentSearch}
                        onChange={(e) => setInstrumentSearch(e.target.value)}
                    />
                </Field>
            </div>
            <ul className="p-4">
                {instrumentSuggestion.map((instrumentCategory) => (
                    <li
                        key={instrumentCategory.id}
                        className="text-xs font-bold text-base-content/50 uppercase tracking-wider mb-4"
                    >
                        {instrumentCategory.label}
                        <ul className="space-y-1 mt-1">
                            {instrumentCategory.Instruments.map(
                                (instrument) => (
                                    <li
                                        key={instrument.id}
                                        className="border border-base-300 normal-case rounded-lg text-center py-1 text-base-content cursor-pointer hover:bg-base-300 hover:border-primary transition-colors"
                                    >
                                        {instrument.label}
                                    </li>
                                ),
                            )}
                        </ul>
                    </li>
                ))}
            </ul>
        </section>
    );
}
