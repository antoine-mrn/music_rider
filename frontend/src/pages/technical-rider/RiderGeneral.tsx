import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import PageTitle from "../../components/ui/typography/PageTitle";
import BandIdentity from "../../features/technical-rider/components/page-general/BandIdentity";
import TimingConfigForm from "../../features/technical-rider/components/page-general/TimingConfigForm";
import TechnicalStaffForm from "../../features/technical-rider/components/page-general/TechnicalStaffForm";
import { useGetTechnicalRiderGeneral } from "../../features/technical-rider/hooks/useGetTechnicalRiderGeneral";
import { useParams } from "react-router";
import Loading from "../../components/layout/Loading";
import ErrorInfo from "../../components/layout/ErrorInfo";

export default function RiderGeneral() {
    const { riderId } = useParams();

    const { data, isLoading, isError } = useGetTechnicalRiderGeneral(
        riderId ?? "",
    );
    // console.log("🚀 ~ RiderGeneral ~ data:", data);

    if (isLoading) return <Loading />;
    if (isError) return <ErrorInfo />;
    if (!data) return null;

    return (
        <PageWrapper>
            <PageTitle title="Rider general" />
            <p className="text-base-content/70">
                Présentez votre projet et vos contacts clés pour l'organisation.
            </p>
            <PageContentWrapper>
                <BandIdentity
                    bandName={data.band.label}
                    bandContact={data.bandContact}
                />
                <div className="flex flex-col gap-8 lg:flex-row">
                    <TimingConfigForm
                        riderId={riderId ?? ""}
                        generalData={data.technicalRiderGeneral}
                    />
                    <TechnicalStaffForm
                        riderId={riderId ?? ""}
                        staffData={data.TechnicalRiderStaff}
                    />
                </div>
            </PageContentWrapper>
        </PageWrapper>
    );
}
