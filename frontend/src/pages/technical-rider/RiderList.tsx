import ErrorInfo from "../../components/layout/ErrorInfo";
import Loading from "../../components/layout/Loading";
import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import Button from "../../components/ui/button/Button";
import PageTitle from "../../components/ui/typography/PageTitle";
import SectionTitle from "../../components/ui/typography/SectionTitle";
import TechnicalRiderTablePreview from "../../features/technical-rider/components/TechnicalRiderTablePreview";
import { useGetTechnicalRider } from "../../features/technical-rider/hooks/useGetTechnicalRider";

export default function RiderList() {
    const { data, isLoading, isError, refetch } = useGetTechnicalRider();

    if (isLoading) return <Loading />;
    if (isError || !data) return <ErrorInfo onRetry={refetch} />;

    return (
        <PageWrapper>
            <PageTitle title="Mes riders" />
            <PageContentWrapper>
                <Button className="place-self-end">
                    Créer un nouveau rider
                </Button>

                <section>
                    <SectionTitle title="Tout mes riders" />
                    <TechnicalRiderTablePreview technicalRiders={data} />
                </section>
            </PageContentWrapper>
        </PageWrapper>
    );
}
