import ErrorInfo from "../../components/layout/ErrorInfo";
import Loading from "../../components/layout/Loading";
import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import PageTitle from "../../components/ui/typography/PageTitle";
import MyBandsSummary from "../../features/band/components/MyBandsSummary";
import ProfileInfo from "../../features/profile/components/ProfileInfo";
import QuickOverview from "../../features/profile/components/QuickOverview";
import { useDashboard } from "../../features/profile/hooks/useDashboard";
import RecentTechnicalRider from "../../features/technical-rider/components/RecentTechnicalRider";

export default function Profile() {
    const { data, isLoading, isError } = useDashboard();

    if (isLoading) return <Loading />;
    if (isError || !data) return <ErrorInfo onRetry={() => useDashboard()} />;

    return (
        <PageWrapper>
            <PageTitle title="Mon profile" />
            <PageContentWrapper>
                <ProfileInfo user={data?.user} />
                <div className="space-y-4 sm:flex sm:justify-between sm:flex-row-reverse sm:gap-2 sm:space-y-0">
                    <QuickOverview overview={data.quickOverview} />
                    <MyBandsSummary bandSummary={data.bands} />
                </div>
                <RecentTechnicalRider technicalRiders={data.technicalRiders} />
            </PageContentWrapper>
        </PageWrapper>
    );
}
