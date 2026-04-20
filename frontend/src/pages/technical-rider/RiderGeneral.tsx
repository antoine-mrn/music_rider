import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import PageTitle from "../../components/ui/typography/PageTitle";
import BandIdentity from "../../features/technical-rider/components/page-general/BandIdentity";
import TimingConfigForm from "../../features/technical-rider/components/page-general/TimingConfigForm";
import TechnicalStaffForm from "../../features/technical-rider/components/page-general/TechnicalStaffForm";

export default function RiderGeneral() {
    return (
        <PageWrapper>
            <PageTitle title="Rider general" />
            <p className="text-base-content/70">
                Présentez votre projet et vos contacts clés pour l'organisation.
            </p>
            <PageContentWrapper>
                <BandIdentity />
                <div className="flex flex-col gap-8 lg:flex-row">
                    <TimingConfigForm />
                    <TechnicalStaffForm />
                </div>
            </PageContentWrapper>
        </PageWrapper>
    );
}
