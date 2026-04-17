import { Pencil } from "lucide-react";
import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import Field from "../../components/ui/form/Field";
import Input from "../../components/ui/form/Input";
import Label from "../../components/ui/form/Label";
import PageTitle from "../../components/ui/typography/PageTitle";
import SectionTitle from "../../components/ui/typography/SectionTitle";

export default function RiderGeneral() {
    return (
        <PageWrapper>
            <PageTitle title="Rider general" />
            <p className="text-base-content/70">
                Présentez votre projet et vos contacts clés pour l'organisation.
            </p>
            <PageContentWrapper>
                <section className="card bg-info-content text-neutral-content">
                    <div className="card-body">
                        <div className="flex justify-between">
                            <SectionTitle
                                title="Identité du projet"
                                className="text-white"
                            />
                            <span className="cursor-pointer bg-white flex items-center justify-center rounded-full text-black transition-colors hover:bg-primary p-2">
                                <Pencil size={14} />
                            </span>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-primary-content uppercase text-xs">
                                Nom du groupe
                            </h3>
                            <span className="uppercase font-black text-4xl text-white italic">
                                SMBU
                            </span>
                            <div className="divider divider-primary"></div>
                            <div className="flex gap-16 mt-4 font-medium">
                                <div>
                                    <span className="text-primary-content uppercase text-xs block">
                                        Contact principal
                                    </span>
                                    <span className="uppercase font-black text-white italic">
                                        John Doe
                                    </span>
                                </div>
                                <div>
                                    <span className="text-primary-content text-xs uppercase block">
                                        Email:{" "}
                                    </span>
                                    <a
                                        className="text-white block"
                                        href={`mailto:antoine@gmail.com`}
                                    >
                                        antoine@gmail.com
                                    </a>
                                </div>
                                <div>
                                    <span className="text-primary-content text-xs uppercase block">
                                        Phone:{" "}
                                    </span>
                                    <span className="text-white">
                                        +33 7 12 34 56 67
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="card border border-base-300 shadow-sm bg-base-100 w-96">
                    <div className="card-body">
                        <h2 className="card-title">Timing & Configuration</h2>
                        <form className="space-y-2">
                            <Field>
                                <Label
                                    label="Nombre de musicien"
                                    htmlFor="musician-number"
                                />
                                <Input
                                    type="number"
                                    min={0}
                                    id="musician-number"
                                    placeholder="0"
                                />
                            </Field>
                            <Field>
                                <Label
                                    label="Durée du soundcheck"
                                    htmlFor="soundcheck-duration"
                                />
                                <Input
                                    type="time"
                                    id="soundcheck-duration"
                                    placeholder="00 : 00"
                                />
                            </Field>

                            <Field>
                                <Label
                                    label="Durée d'installation"
                                    htmlFor="setup-duration"
                                />
                                <Input
                                    type="time"
                                    id="setup-duration"
                                    placeholder="00 : 00"
                                />
                            </Field>

                            <Field>
                                <Label
                                    label="Durée de démontage"
                                    htmlFor="teardown-duration"
                                />
                                <Input
                                    type="time"
                                    id="teardown-duration"
                                    placeholder="00 : 00"
                                />
                            </Field>
                        </form>
                    </div>
                </section>
                <section className="card border border-base-300 shadow-sm bg-base-100 w-96">
                    <div className="card-body">
                        <h2 className="card-title">Equipe Technique</h2>
                        <form className="space-y-2">
                            <Field>
                                <Label
                                    label="Ingé son"
                                    htmlFor="sound-engineer"
                                />
                                <Input
                                    type="text"
                                    id="sound-engineer"
                                    placeholder="Prénom Nom"
                                />
                            </Field>
                            <Field>
                                <Label
                                    label="Ingé light"
                                    htmlFor="light-engineer"
                                />
                                <Input
                                    type="text"
                                    id="light-engineer"
                                    placeholder="Prénom Nom"
                                />
                            </Field>
                        </form>
                    </div>
                </section>
            </PageContentWrapper>
        </PageWrapper>
    );
}
