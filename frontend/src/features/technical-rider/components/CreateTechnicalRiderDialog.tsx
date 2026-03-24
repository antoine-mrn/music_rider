import { useForm } from "react-hook-form";
import Button from "../../../components/ui/button/Button";
import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import Label from "../../../components/ui/form/Label";
import Select from "../../../components/ui/form/Select";
import Modal from "../../../components/ui/modal/Modal";
import {
    CreateTechncialRiderSchema,
    type CreateTechncialRiderSchemaType,
} from "../../../schemas/create-technical-rider.schema";
import { useGetAllRiderCategories } from "../../rider-category/hooks/useGetAllRiderCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTechnicalRider } from "../hooks/useCreateTechnicalRider";
import { useBandsList } from "../../band/hooks/useBandsList";

export default function CreateTechnicalRiderDialog({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { data: riderCategories } = useGetAllRiderCategories();
    const { data: bands } = useBandsList();

    const {
        mutateAsync: createTechnicalRider,
        isSuccess,
        isPending,
        isError,
        error,
    } = useCreateTechnicalRider();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTechncialRiderSchemaType>({
        resolver: zodResolver(CreateTechncialRiderSchema),
    });

    const onSubmit = handleSubmit(async (data) => {
        createTechnicalRider(data);

        if (isSuccess) onClose();
    });

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="font-bold text-lg">Créer un nouveau rider</h2>
            <form onSubmit={onSubmit} className="mt-8 space-y-4">
                <Field>
                    <Label htmlFor="title" label="Titre" />
                    <Input
                        id="title"
                        placeholder="Nom du rider (50 caractères max)"
                        {...register("title")}
                        error={errors.title && errors.title.message}
                    />
                </Field>
                <Field>
                    <Label htmlFor="bands" label="Choisissez un groupe" />
                    {bands && (
                        <Select
                            id="bands"
                            className="w-full"
                            defaultOption="Choissiez un groupe"
                            values={bands}
                            {...register("bandId")}
                            error={errors.bandId && errors.bandId.message}
                        />
                    )}
                </Field>
                <Field>
                    <Label htmlFor="rider-category" label="Catégorie" />
                    {riderCategories && (
                        <Select
                            id="rider-category"
                            className="w-full"
                            defaultOption="Choissiez une catégorie"
                            values={riderCategories}
                            {...register("riderCategoryId")}
                            error={
                                errors.riderCategoryId &&
                                errors.riderCategoryId.message
                            }
                        />
                    )}
                </Field>
                <Button
                    type="submit"
                    disabled={isPending}
                    className="btn-block"
                >
                    Créer le rider
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
