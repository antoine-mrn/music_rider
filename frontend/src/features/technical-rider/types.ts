import type { RIDER_STATUS_LABELS } from "../../shared/constantes/rider-status";

export interface SummaryTechnicalRider {
    id: string;
    title: string;
    status: keyof typeof RIDER_STATUS_LABELS;
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

export interface CreateTechnicalRider {
    id: string;
    title: string;
    riderCategoryId: number;
    createdAt: string;
    updatedAt: string;
}
