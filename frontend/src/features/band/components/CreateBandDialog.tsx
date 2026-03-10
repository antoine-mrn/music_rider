import type { RefObject } from "react";
import Button from "../../../components/ui/button/Button";
import Label from "../../../components/ui/form/Label";
import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import { useGetAllMusicStyles } from "../../music-style/hooks/useGetAllMusicStyle";
import Select from "../../../components/ui/form/Select";
import {
    CreateBandSchema,
    type CreateBandSchemaType,
} from "../../../schemas/create-band.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCreateBand } from "../hooks/useCreateBand";

export default function CreateBandDialog({
    dialogRef,
}: {
    dialogRef: RefObject<HTMLDialogElement | null>;
}) {
    const { data: musicStyles } = useGetAllMusicStyles();
    const { mutateAsync: createBand, isPending } = useCreateBand();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateBandSchemaType>({
        resolver: zodResolver(CreateBandSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        await createBand(data);
    });

    return (
        <dialog ref={dialogRef} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <Button className="absolute right-2 top-2" size="sm">
                        x
                    </Button>
                </form>
                <h2 className="font-bold text-lg">Créer un nouveau groupe</h2>
                <form onSubmit={onSubmit} className="mt-8 space-y-4">
                    <Field>
                        <Label htmlFor="label" label="Nom" />
                        <Input
                            id="label"
                            placeholder="Nom du groupe (50 caractères max)"
                            {...register("label")}
                            error={errors.label && errors.label.message}
                        />
                    </Field>
                    <Field>
                        <Label htmlFor="style" label="Style" />
                        {musicStyles && (
                            <Select
                                id="style"
                                className="w-full"
                                defaultOption="Choissiez un style"
                                values={musicStyles}
                                {...register("styleId")}
                                error={errors.styleId && errors.styleId.message}
                            />
                        )}
                    </Field>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="btn-block"
                    >
                        Créer le groupe
                    </Button>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}
