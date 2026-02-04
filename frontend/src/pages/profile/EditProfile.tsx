import Field from "../../components/ui/form/Field";
import Input from "../../components/ui/form/Input";
import Label from "../../components/ui/form/Label";
import { useMeEdit } from "../../features/user/hooks/useMeEdit";

export default function EditProfile() {
    const { data } = useMeEdit();

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

            <form className="space-y-10">
                <div className="flex gap-6">
                    <Field>
                        <Label label="Prénom" htmlFor="firstname" />
                        <Input
                            type="text"
                            id="firstname"
                            placeholder="John"
                            value={data?.firstname}
                        />
                    </Field>
                    <Field>
                        <Label label="Nom" htmlFor="lastname" />
                        <Input
                            type="text"
                            id="lastname"
                            placeholder="Doe"
                            value={data?.lastname}
                        />
                    </Field>
                </div>
                <Field>
                    <Label label="e-mail" htmlFor="email" />
                    <Input
                        type="email"
                        id="email"
                        placeholder="john.doe@mail.com"
                        value={data?.email}
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
                    <button className="btn btn-primary flex-1 rounded-lg uppercase italic font-black">
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
