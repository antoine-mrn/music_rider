import MyBandsSummary from "../../components/profile/MyBandsSummary";
import ProfileInfo from "../../components/profile/ProfileInfo";
import QuickOverview from "../../components/profile/QuickOverview";

export default function Profile() {
    return (
        <div className="w-full h-full flex flex-col gap-8 place-content-center px-8 mt-10">
            <ProfileInfo />
            <div className="flex justify-between">
                <MyBandsSummary />
                <QuickOverview />
            </div>
        </div>
    );
}
