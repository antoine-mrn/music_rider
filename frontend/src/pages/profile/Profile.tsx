import ErrorInfo from "../../components/layout/ErrorInfo";
import Loading from "../../components/layout/Loading";
import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import PageTitle from "../../components/ui/typography/PageTitle";
import MyBandsSummary from "../../features/band/components/MyBandsSummary";
import ProfileInfo from "../../features/profile/components/ProfileInfo";
import QuickOverview from "../../features/profile/components/QuickOverview";
import { useDashboard } from "../../features/profile/hooks/useDashboard";
import TechnicalRiderTablePreview from "../../features/technical-rider/components/TechnicalRiderTablePreview";

export default function Profile() {
    const { data, isLoading, isError, refetch } = useDashboard();

    if (isLoading) return <Loading />;
    if (isError || !data) return <ErrorInfo onRetry={refetch} />;

    return (
        <PageWrapper>
            <PageTitle title="Mon profile" />
            <PageContentWrapper>
                <ProfileInfo user={data?.user} />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <QuickOverview
                        overview={data.quickOverview}
                        className="lg:order-2"
                    />
                    <MyBandsSummary
                        bandSummary={data.bands}
                        className="lg:col-span-2 lg:order-1"
                    />
                    <TechnicalRiderTablePreview
                        technicalRiders={data.technicalRiders}
                        className="order-3 lg:col-span-3"
                    />
                </div>
            </PageContentWrapper>
        </PageWrapper>
    );
}
