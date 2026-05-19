import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import PageTitle from "../../components/ui/typography/PageTitle";
import BandIdentity from "../../features/technical-rider/components/page-general/BandIdentity";
import TimingConfigForm from "../../features/technical-rider/components/page-general/TimingConfigForm";
import TechnicalStaffForm from "../../features/technical-rider/components/page-general/TechnicalStaffForm";
import { useParams } from "react-router";
import Loading from "../../components/layout/Loading";
import ErrorInfo from "../../components/layout/ErrorInfo";
import { useGetTechnicalRiderBand } from "../../features/technical-rider/hooks/band/useGetTechnicalRiderBand";
import { useGetTechnicalRiderStaff } from "../../features/technical-rider/hooks/staff/useGetTechnicalRiderStaff";
import { useGetTechnicalRiderTiming } from "../../features/technical-rider/hooks/timing/useGetTechnicalRiderTiming";

export default function RiderGeneral() {
    const { riderId } = useParams();
    const id = riderId ?? "";

    const band = useGetTechnicalRiderBand(id);
    const timing = useGetTechnicalRiderTiming(id);
    const staff = useGetTechnicalRiderStaff(id);

    const isLoading = band.isLoading || timing.isLoading || staff.isLoading;
    const isError = band.isError || timing.isError || staff.isError;

    if (isLoading) return <Loading />;
    if (isError) return <ErrorInfo />;
    if (!band.data || !timing.data || !staff.data) return null;

    return (
        <PageWrapper>
            <PageTitle title="Rider general" />
            <p className="text-base-content/70">
                Présentez votre projet et vos contacts clés pour l'organisation.
            </p>
            <PageContentWrapper>
                <BandIdentity
                    bandName={band.data.band.label}
                    bandContact={band.data.bandContact}
                />
                <div className="flex flex-col gap-8 lg:flex-row">
                    <TimingConfigForm
                        riderId={riderId ?? ""}
                        generalData={timing.data}
                    />
                    <TechnicalStaffForm
                        riderId={riderId ?? ""}
                        staffData={staff.data}
                    />
                </div>
            </PageContentWrapper>
        </PageWrapper>
    );
}
