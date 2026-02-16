import { useParams } from "react-router";
import PageWrapper from "../../components/layout/PageWrapper";
import { useBandDetails } from "../../features/band/hooks/useBandDetails";
import Loading from "../../components/layout/Loading";
import ErrorInfo from "../../components/layout/ErrorInfo";

export default function BandDetails() {
    const { bandId } = useParams();
    const { data, isLoading, isError } = useBandDetails(
        parseInt(bandId ?? "0"),
    );
    console.log("🚀 ~ BandDetails ~ data:", data);

    if (isLoading) return <Loading />;
    if (isError)
        return (
            <ErrorInfo
                onRetry={() => useBandDetails(parseInt(bandId ?? "0"))}
            />
        );

    return (
        <PageWrapper>
            <p>Hello</p>
        </PageWrapper>
    );
}
