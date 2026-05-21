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
import Modal from "../../../components/ui/modal/Modal";

export default function CreateBandDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { data: musicStyles } = useGetAllMusicStyles();
    const {
        mutateAsync: createBand,
        isPending,
        isError,
        error,
    } = useCreateBand();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateBandSchemaType>({
        resolver: zodResolver(CreateBandSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        await createBand(data);
        onClose();
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
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
                            defaultValue={""}
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

                {isError && (
                    <p className="mt-1 text-sm font-bold text-error text-center">
                        {error.message}
                    </p>
                )}
            </form>
        </Modal>
    );
}
