import { useParams } from "react-router";
import PageWrapper from "../../components/layout/PageWrapper";
import { useBandDetails } from "../../features/band/hooks/useBandDetails";

export default function BandDetails() {
    const { bandId } = useParams();
    const { data, isLoading, isError } = useBandDetails(
        parseInt(bandId ?? "0"),
    );
    console.log("🚀 ~ BandDetails ~ data:", data);

    return (
        <PageWrapper>
            <p>Hello</p>
        </PageWrapper>
    );
}
