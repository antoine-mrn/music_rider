import MyBandsSummary from "../../components/profile/MyBandsSummary";
import ProfileInfo from "../../components/profile/ProfileInfo";
import QuickOverview from "../../components/profile/QuickOverview";
import RecentTechnicalRider from "../../components/profile/RecentTechnicalRider";

export default function Profile() {
    return (
        <div className="w-full h-full flex flex-col gap-8 place-content-center px-8 mt-10">
            <ProfileInfo />
            <div className="space-y-4 sm:flex sm:justify-between sm:flex-row-reverse sm:gap-2 sm:space-y-0">
                <QuickOverview />
                <MyBandsSummary />
            </div>
            <RecentTechnicalRider />
        </div>
    );
}
