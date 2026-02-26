import { useNavigate, useParams } from "react-router";
import PageWrapper from "../../components/layout/PageWrapper";
import { useBandDetails } from "../../features/band/hooks/useBandDetails";
import Loading from "../../components/layout/Loading";
import ErrorInfo from "../../components/layout/ErrorInfo";
import PageTitle from "../../components/ui/typography/PageTitle";
import { ChevronLeft } from "lucide-react";
import MemberSection from "../../features/band/components/MemberSection";
import Button from "../../components/ui/button/Button";

export default function BandDetails() {
    const { bandId } = useParams();
    const navigate = useNavigate();

    const {
        data: band,
        isLoading,
        isError,
        refetch,
    } = useBandDetails(parseInt(bandId ?? "0"));
    console.log("🚀 ~ BandDetails ~ band:", band);

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

            <MemberSection
                memberCount={band?.memberCount ?? 0}
                bandMembers={band?.members ?? []}
            />

            <article className="card w-full h-fit bg-info-content text-neutral-content sm:w-64 lg:w-80">
                <div className="card-body">
                    <h2 className="card-title italic font-black text-xl">
                        Contact principal
                    </h2>
                    <div className="mt-4">
                        <h3>
                            {band?.primaryContact &&
                                `${band.primaryContact.firstname} ${band.primaryContact.lastname}`}
                        </h3>
                    </div>
                </div>
            </article>
        </PageWrapper>
    );
}
