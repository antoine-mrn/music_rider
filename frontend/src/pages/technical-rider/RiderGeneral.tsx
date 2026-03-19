import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import Button from "../../components/ui/button/Button";
import Field from "../../components/ui/form/Field";
import Input from "../../components/ui/form/Input";
import Label from "../../components/ui/form/Label";
import PageTitle from "../../components/ui/typography/PageTitle";

export default function RiderGeneral() {
    return (
        <PageWrapper>
            <PageTitle title="Rider general" />
            <p className="text-base-content/70">
                Présentez votre projet et vos contacts clés pour l'organisation.
            </p>
            <PageContentWrapper>
                <section className="card border border-base-300 shadow-sm bg-base-100 w-96">
                    <div className="card-body">
                        <h2 className="card-title">Identité du projet</h2>
                        <form className="space-y-2">
                            <Field>
                                <Label
                                    label="Nom du groupe / projet"
                                    htmlFor="project"
                                />
                                <Input
                                    type="text"
                                    id="project"
                                    placeholder="Ex: azdfrf"
                                />
                            </Field>
                            <Field>
                                <Label
                                    label="Contact principal"
                                    htmlFor="contact-name"
                                />
                                <Input
                                    type="text"
                                    id="contact-name"
                                    placeholder="Ex: azdfrf"
                                />
                            </Field>
                            <Field>
                                <Label
                                    label="Email / Téléphone"
                                    htmlFor="contact-information"
                                />
                                <Input type="text" placeholder="Ex: azdfrf" />
                            </Field>
                            <div className="card-actions justify-end pt-4">
                                <Button type="submit">Modifier</Button>
                            </div>
                        </form>
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
