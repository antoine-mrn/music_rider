import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Field from "../../components/ui/form/Field";
import Input from "../../components/ui/form/Input";
import Label from "../../components/ui/form/Label";
import { useMeEdit } from "../../features/user/hooks/useMeEdit";
import {
    EditProfileSchema,
    type EditProfileSchemaType,
} from "../../schemas/edit-profile.schema";
import { property } from "zod";

export default function EditProfile() {
    const { data: me } = useMeEdit();

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
    } = useForm<EditProfileSchemaType>({
        resolver: zodResolver(EditProfileSchema),
        values: {
            firstname: me?.firstname ?? "",
            lastname: me?.lastname ?? "",
            email: me?.email ?? "",
        },
    });

    const onSubmit = handleSubmit(async (data) => {
        console.log("🚀 ~ EditProfile ~ me:", me);
        console.log("🚀 ~ EditProfile ~ data:", data);

        let dataUpdated: Partial<EditProfileSchemaType> = {};

        for (const prop in dirtyFields) {
            dataUpdated[prop] = data[prop];
        }
        console.log("🚀 ~ EditProfile ~ dataUpdated:", dataUpdated);
    });

    return (
        <div className="h-full max-w-4xl mx-auto flex flex-col gap-8 place-content-center px-8 mt-10">
            <section className="card w-full card-border border-2 p-4">
                <div className="card-body flex-row items-center gap-4">
                    <div className="avatar">
                        <div className="w-24 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button className="btn btn-primary rounded-lg uppercase italic font-black">
                            Changer la photo
                        </button>
                        <span className="text-base-content/50 font-black">
                            JPG, PNG ou GIF. Max 2MB.
                        </span>
                    </div>
                </div>
            </section>

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
                            <button className="btn btn-soft rounded-lg italic">
                                Modifier le mot de passe
                            </button>
                        </div>
                    </div>
                </section>

                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="btn btn-primary flex-1 rounded-lg uppercase italic font-black"
                    >
                        Sauvegarder les changements
                    </button>
                    <button className="btn rounded-lg flex-1 uppercase italic font-black">
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
}
