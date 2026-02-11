import { useParams } from "react-router";
import PageWrapper from "../../components/layout/PageWrapper";

export default function BandDetails() {
    const { bandId } = useParams();

    return (
        <PageWrapper>
            <p>Hello</p>
        </PageWrapper>
    );
}
