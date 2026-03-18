import type { RIDER_STATUS_LABELS } from "../../shared/constantes/rider-status";

export interface SummaryTechnicalRider {
    id: number;
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
