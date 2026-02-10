import { useState } from "react";
import PageContentWrapper from "../../components/layout/PageContentWrapper";
import PageWrapper from "../../components/layout/PageWrapper";
import PageTitle from "../../components/ui/typography/PageTitle";
import BandCardSummary from "../../features/band/components/BandCardSummary";
import { useSummaryBands } from "../../features/band/hooks/useSummaryBands";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MyBands() {
    const [page, setPage] = useState(1);

    const { data: bandsSummary, isPlaceholderData } = useSummaryBands(page);

    return (
        <PageWrapper>
            <PageTitle title="Mes groupes" />
            <PageContentWrapper>
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
                            className="btn btn-soft rounded-lg"
                            onClick={() =>
                                setPage((old) => Math.max(old - 1, 1))
                            }
                            disabled={page === 1}
                        >
                            <ChevronLeft />
                        </button>
                        <span>{page}</span>
                        <button
                            className="btn btn-soft rounded-lg"
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
