import { useParams } from "react-router";
import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import PageTitle from "../../components/ui/typography/PageTitle";
import RiderCard from "../../features/technical-rider/components/RiderCard";
import Scene from "../../features/technical-rider/components/scene-and-space/Scene";
import StageDimensions from "../../features/technical-rider/components/scene-and-space/StageDimensions";
import { useGetTechnicalRiderStageDimensions } from "../../features/technical-rider/hooks/stage/useGetTechnicalRiderStageDimensions";
import Loading from "../../components/layout/Loading";
import ErrorInfoProps from "../../components/layout/ErrorInfo";

export default function RiderScene() {
    const { riderId } = useParams();
    const id = riderId ?? "";
    const { data, isLoading, isError } = useGetTechnicalRiderStageDimensions(
        riderId!,
    );

    if (isLoading) return <Loading />;
    if (isError) return <ErrorInfoProps />;

    return (
        <PageWrapper>
            <PageTitle title="Scène et espace" />
            <p className="text-base-content/70">
                Configurez votre espace de jeu : dimensions de la scène et
                placement des instruments pour une installation sans surprise.
            </p>

            <PageContentWrapper>
                <StageDimensions riderId={id} stageDimensions={data ?? null} />

                <RiderCard title="Scène">
                    <Scene />
                </RiderCard>
            </PageContentWrapper>
        </PageWrapper>
    );
}
