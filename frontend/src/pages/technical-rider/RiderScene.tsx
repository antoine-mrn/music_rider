import { useParams } from "react-router";
import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import PageTitle from "../../components/ui/typography/PageTitle";
import StageDimensions from "../../features/technical-rider/components/scene-and-space/StageDimensions";
import { useGetTechnicalRiderStageDimensions } from "../../features/technical-rider/hooks/stage/useGetTechnicalRiderStageDimensions";
import Loading from "../../components/layout/Loading";
import ErrorInfoProps from "../../components/layout/ErrorInfo";
import { useFindAllInstrumentsWithCategories } from "../../features/instrument/hooks/useFindAllInstrumentsWithCategories";
import StagePlan from "../../features/technical-rider/components/scene-and-space/StagePlan";

export default function RiderScene() {
    const { riderId } = useParams();
    const id = riderId ?? "";
    const {
        data: StageDimensionsData,
        isLoading: isStageDimensionLoading,
        isError: isStageDimensionsError,
    } = useGetTechnicalRiderStageDimensions(riderId!);

    const {
        data: instrumentsList,
        isLoading: isInstrumentListLoading,
        isError: isInstrumentListError,
    } = useFindAllInstrumentsWithCategories();

    if (isStageDimensionLoading || isInstrumentListLoading) return <Loading />;
    if (isStageDimensionsError || isInstrumentListError)
        return <ErrorInfoProps />;

    return (
        <PageWrapper>
            <PageTitle title="Scène et espace" />
            <p className="text-base-content/70">
                Configurez votre espace de jeu : dimensions de la scène et
                placement des instruments pour une installation sans surprise.
            </p>

            <PageContentWrapper>
                <StageDimensions
                    riderId={id}
                    stageDimensions={StageDimensionsData ?? null}
                />

                <StagePlan instrumentsList={instrumentsList ?? []} />
            </PageContentWrapper>
        </PageWrapper>
    );
}
