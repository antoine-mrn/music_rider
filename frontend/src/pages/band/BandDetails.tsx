import { useNavigate, useParams } from "react-router";
import PageWrapper from "../../components/layout/PageWrapper";
import { useBandDetails } from "../../features/band/hooks/useBandDetails";
import Loading from "../../components/layout/Loading";
import ErrorInfo from "../../components/layout/ErrorInfo";
import PageTitle from "../../components/ui/typography/PageTitle";
import { ChevronLeft } from "lucide-react";
import MemberSection from "../../features/band/components/MemberSection";

export default function BandDetails() {
    const { bandId } = useParams();
    const navigate = useNavigate();

    const {
        data: band,
        isLoading,
        isError,
        refetch,
    } = useBandDetails(parseInt(bandId ?? "0"));

    if (isLoading) return <Loading />;
    if (isError) return <ErrorInfo onRetry={refetch} />;

    return (
        <PageWrapper>
            <div className="flex gap-4 items-center">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-soft btn-circle"
                >
                    <ChevronLeft />
                </button>
                <div className="space-y-1">
                    <span className="badge badge-soft badge-primary">
                        {band?.musicStyle?.label}
                    </span>
                    <PageTitle title={band?.label ?? ""} />
                </div>
            </div>

            <MemberSection
                memberCount={band?.memberCount ?? 0}
                bandMembers={band?.members ?? []}
            />
        </PageWrapper>
    );
}
