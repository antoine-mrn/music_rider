import { useNavigate, useParams } from "react-router";
import PageWrapper from "../../components/layout/PageWrapper";
import { useBandDetails } from "../../features/band/hooks/useBandDetails";
import Loading from "../../components/layout/Loading";
import ErrorInfo from "../../components/layout/ErrorInfo";
import PageTitle from "../../components/ui/typography/PageTitle";
import { ChevronLeft } from "lucide-react";
import MemberSection from "../../features/band/components/MemberSection";
import Button from "../../components/ui/button/Button";
import PrimaryContactSection from "../../features/band/components/PrimaryContactSection";
import TechnicalRiderTablePreview from "../../features/technical-rider/components/TechnicalRiderTablePreview";
import SectionTitle from "../../components/ui/typography/SectionTitle";

export default function BandDetails() {
    const { bandId } = useParams();
    const navigate = useNavigate();

    const {
        data: band,
        isLoading,
        isError,
        refetch,
    } = useBandDetails(bandId ?? "0");

    if (isLoading) return <Loading />;
    if (isError) return <ErrorInfo onRetry={refetch} />;

    return (
        <PageWrapper>
            <div className="flex gap-4 items-center">
                <Button
                    onClick={() => navigate(-1)}
                    shape="circle"
                    variant="soft"
                >
                    <ChevronLeft />
                </Button>
                <div className="space-y-1">
                    <div className="flex gap-2 items-center">
                        <span className="badge badge-soft badge-primary font-bold">
                            {band?.musicStyle?.label}
                        </span>
                        <span className="uppercase font-bold text-xs text-base-content/50">
                            {band?.createdAt &&
                                `Créé en ${new Date(band?.createdAt).getFullYear()}`}
                        </span>
                    </div>
                    <PageTitle title={band?.label ?? ""} />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3">
                <PrimaryContactSection
                    primaryContact={band?.primaryContact ?? null}
                    className="lg:order-2"
                />

                <MemberSection
                    memberCount={band?.memberCount ?? 0}
                    bandMembers={band?.members ?? []}
                    className="lg:col-span-2"
                />

                <section className="order-3 lg:col-span-3">
                    <SectionTitle title="Riders récents" />
                    <TechnicalRiderTablePreview
                        technicalRiders={band?.technicalRiders ?? null}
                    />
                </section>
            </div>
        </PageWrapper>
    );
}
