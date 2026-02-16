import { useNavigate, useParams } from "react-router";
import PageWrapper from "../../components/layout/PageWrapper";
import { useBandDetails } from "../../features/band/hooks/useBandDetails";
import Loading from "../../components/layout/Loading";
import ErrorInfo from "../../components/layout/ErrorInfo";
import PageTitle from "../../components/ui/typography/PageTitle";
import { ChevronLeft } from "lucide-react";
import SectionTitle from "../../components/ui/typography/SectionTitle";

export default function BandDetails() {
    const { bandId } = useParams();
    const navigate = useNavigate();

    const {
        data: band,
        isLoading,
        isError,
    } = useBandDetails(parseInt(bandId ?? "0"));

    if (isLoading) return <Loading />;
    if (isError)
        return (
            <ErrorInfo
                onRetry={() => useBandDetails(parseInt(bandId ?? "0"))}
            />
        );

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

            <section className="card card-border border-2">
                <div className="card-body">
                    <div className="card-title gap-4">
                        <SectionTitle title="Musiciens" />
                        <span className="font-bold text-primary">
                            {band?.memberCount}
                        </span>
                        <button className="ml-auto btn btn-primary btn-outline rounded-lg">
                            + Ajouter
                        </button>
                    </div>

                    <ul className="flex gap-4">
                        {band?.members.slice(0, 4).map((member) => (
                            <li className="flex flex-col bg-base-200 rounded-lg p-4">
                                <span className="font-black">
                                    {member.firstname} {member.lastname}
                                </span>
                                <span className="text-base-content/50">
                                    {member.instruments
                                        .map((i) => i.label)
                                        .join(" / ")}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </PageWrapper>
    );
}
