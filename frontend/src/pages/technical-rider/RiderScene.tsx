import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import Field from "../../components/ui/form/Field";
import Input from "../../components/ui/form/Input";
import Label from "../../components/ui/form/Label";
import PageTitle from "../../components/ui/typography/PageTitle";
import RiderCard from "../../features/technical-rider/components/RiderCard";

export default function RiderScene() {
    return (
        <PageWrapper>
            <PageTitle title="Scène et espace" />
            <p className="text-base-content/70">
                Configurez votre espace de jeu : dimensions de la scène et
                placement des instruments pour une installation sans surprise.
            </p>

            <PageContentWrapper>
                <RiderCard title="Dimensions de la scène">
                    <form className="space-y-4">
                        <div className="flex gap-4">
                            <Field>
                                <Label
                                    label="Longueur (m)"
                                    htmlFor="stage-length"
                                />
                                <Input
                                    type="number"
                                    min={0}
                                    id="stage-length"
                                    placeholder="ex. 6"
                                />
                            </Field>
                            <Field>
                                <Label
                                    label="Largeur (m)"
                                    htmlFor="stage-width"
                                />
                                <Input
                                    type="number"
                                    min={0}
                                    id="stage-width"
                                    placeholder="ex. 4"
                                />
                            </Field>
                            <Field>
                                <Label
                                    label="Longueur (m)"
                                    htmlFor="stage-depth"
                                />
                                <Input
                                    type="number"
                                    min={0}
                                    id="stage-depth"
                                    placeholder="ex. 2"
                                />
                            </Field>
                        </div>

                        <div className="divider"></div>

                        <Field>
                            <Label label="Accès scène" htmlFor="stage-access" />
                            <Input
                                type="text"
                                id="stage-access"
                                placeholder="ex. Escaliers côté jardin"
                            />
                        </Field>
                        <Field>
                            <Label label="Backline fourni" htmlFor="backline" />
                            <textarea
                                id="backline"
                                className="textarea w-full font-semibold outline-base-300 focus:border-primary"
                                placeholder="ex. Batterie acoustique complète, ampli basse 300W, ..."
                            ></textarea>
                        </Field>
                    </form>
                </RiderCard>
            </PageContentWrapper>
        </PageWrapper>
    );
}
