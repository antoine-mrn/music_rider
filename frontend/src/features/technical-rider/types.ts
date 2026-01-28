export interface SummaryTechnicalRider {
    id: number;
    band: {
        id: number;
        label: string;
    };
    riderCategory: {
        id: number;
        label: string;
    };
    updatedAt: string;
}
