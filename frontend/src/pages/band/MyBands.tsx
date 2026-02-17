import { useState } from "react";
import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import PageTitle from "../../components/ui/typography/PageTitle";
import BandCardSummary from "../../features/band/components/BandCardSummary";
import { useSummaryBands } from "../../features/band/hooks/useSummaryBands";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Loading from "../../components/layout/Loading";
import ErrorInfo from "../../components/layout/ErrorInfo";

export default function MyBands() {
    const [page, setPage] = useState(1);

    const {
        data: bandsSummary,
        isLoading,
        isError,
        isPlaceholderData,
    } = useSummaryBands(page);

    if (isLoading) return <Loading />;
    if (isError) return <ErrorInfo onRetry={() => useSummaryBands(page)} />;

    return (
        <PageWrapper>
            <PageTitle title="Mes groupes" />
            <PageContentWrapper>
                <button className="btn btn-primary rounded-lg w-fit">
                    + Nouveau
                </button>
                {bandsSummary?.data ? (
                    <ul className="mt-4 gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {bandsSummary.data.map((band) => (
                            <BandCardSummary key={band.id} band={band} />
                        ))}
                    </ul>
                ) : (
                    <p>Pas de groupes</p>
                )}
                {bandsSummary?.data && (
                    <div className="flex items-center justify-center gap-4">
                        <button
                            className="btn btn-secondary btn-sm rounded-lg"
                            onClick={() =>
                                setPage((old) => Math.max(old - 1, 1))
                            }
                            disabled={page === 1}
                        >
                            <ChevronLeft />
                        </button>
                        <span className="text-sm font-bold">{page}</span>
                        <button
                            className="btn btn-secondary btn-sm rounded-lg"
                            onClick={() => {
                                if (
                                    !isPlaceholderData &&
                                    bandsSummary?.meta.hasNextPage
                                ) {
                                    setPage((old) => old + 1);
                                }
                            }}
                            disabled={
                                isPlaceholderData ||
                                !bandsSummary?.meta.hasNextPage
                            }
                        >
                            <ChevronRight />
                        </button>
                    </div>
                )}
            </PageContentWrapper>
        </PageWrapper>
    );
}
