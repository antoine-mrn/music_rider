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
                    />
                </Field>
            </div>
        </section>
    );
}
