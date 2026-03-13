import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Field from "../../../components/ui/form/Field";
import Input from "../../../components/ui/form/Input";
import Label from "../../../components/ui/form/Label";
import {
    EditProfileSchema,
    type EditProfileSchemaType,
} from "../../../schemas/edit-profile.schema";
import type { AuthUserInterface } from "../../auth/types";
import Button from "../../../components/ui/button/Button";

interface EditProfileFormProps {
    me: AuthUserInterface;
    updateMe: (
        dataUpdated: Partial<EditProfileSchemaType>,
    ) => Promise<AuthUserInterface>;
    isPending: boolean;
}

export default function EditProfileForm({
    me,
    updateMe,
    isPending,
}: EditProfileFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, dirtyFields },
    } = useForm<EditProfileSchemaType>({
        resolver: zodResolver(EditProfileSchema),
        values: {
            firstname: me?.firstname ?? "",
            lastname: me?.lastname ?? "",
            email: me?.email ?? "",
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        if (!isDirty) return;
        const dataUpdated: Partial<EditProfileSchemaType> = Object.keys(
            dirtyFields,
        ).reduce(
            (acc, cur) =>
                (acc = { ...acc, [cur]: data[cur as keyof typeof data] }),
            {},
        );

        await updateMe(dataUpdated);
    });
    return (
        <form onSubmit={onSubmit} className="space-y-10">
            <div className="flex gap-6">
                <Field>
                    <Label label="Prénom" htmlFor="firstname" />
                    <Input
                        type="text"
                        id="firstname"
                        placeholder="John"
                        {...register("firstname")}
                        error={errors.firstname && errors.firstname.message}
                    />
                </Field>
                <Field>
                    <Label label="Nom" htmlFor="lastname" />
                    <Input
                        type="text"
                        id="lastname"
                        placeholder="Doe"
                        {...register("lastname")}
                        error={errors.lastname && errors.lastname.message}
                    />
                </Field>
            </div>
            <Field>
                <Label label="e-mail" htmlFor="email" />
                <Input
                    type="email"
                    id="email"
                    placeholder="john.doe@mail.com"
                    {...register("email")}
                    error={errors.email && errors.email.message}
                />
            </Field>

            <section className="card w-full card-border border-2 p-4 bg-base-200">
                <div className="card-body">
                    <h2 className="card-title">Sécurité</h2>
                    <div className="card-actions">
                        <Button className="italic" typeStyle="soft">
                            Modifier le mot de passe
                        </Button>
                    </div>
                </div>
            </section>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                    disabled={isPending}
                    type="submit"
                    className="flex-1 uppercase italic font-black py-4 sm:py-0"
                >
                    {isPending ? (
                        <span className="loading loading-spinner"></span>
                    ) : (
                        "Sauvegarder les changements"
                    )}
                </Button>
                <Button
                    className="rounded-lg flex-1 uppercase italic font-black py-4 sm:py-0"
                    variant="soft"
                >
                    Annuler
                </Button>
            </div>
        </form>
    );
}
