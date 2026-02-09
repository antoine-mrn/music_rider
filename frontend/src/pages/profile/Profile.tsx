import MyBandsSummary from "../../features/band/components/MyBandsSummary";
import ProfileInfo from "../../features/profile/components/ProfileInfo";
import QuickOverview from "../../features/profile/components/QuickOverview";
import { useDashboard } from "../../features/profile/hooks/useDashboard";
import RecentTechnicalRider from "../../features/technical-rider/components/RecentTechnicalRider";

export default function Profile() {
    const { data, isLoading, isError } = useDashboard();

    if (isLoading) return <p>Je charge</p>;
    if (isError || !data) return <p>Problème</p>;

    return (
        <div className="w-full h-full flex flex-col gap-8 place-content-center px-8 mt-10">
            <ProfileInfo user={data?.user} />
            <div className="space-y-4 sm:flex sm:justify-between sm:flex-row-reverse sm:gap-2 sm:space-y-0">
                <QuickOverview overview={data.quickOverview} />
                <MyBandsSummary bandSummary={data.bands} />
            </div>
            <RecentTechnicalRider technicalRiders={data.technicalRiders} />
        </div>
    );
}
