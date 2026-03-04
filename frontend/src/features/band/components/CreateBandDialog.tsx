import type { RefObject } from "react";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/ui/form/Label";
import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import { useGetAllMusicStyles } from "../../music-style/hooks/useGetAllMusicStyle";
import Select from "../../../components/ui/form/Select";

export default function CreateBandDialog({
    dialogRef,
}: {
    dialogRef: RefObject<HTMLDialogElement | null>;
}) {
    const { data } = useGetAllMusicStyles();

    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <Button className="absolute right-2 top-2" size="sm">
                        x
                    </Button>
                </form>
                <h2 className="font-bold text-lg">Créer un nouveau groupe</h2>
                <form className="mt-8 space-y-4">
                    <Field>
                        <Label htmlFor="label" label="Nom *" />
                        <Input
                            id="label"
                            value=""
                            placeholder="Nom du groupe (50 caractères max)"
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="style" label="Style *" />
                        {data && <Select values={data} />}
                    </Field>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
