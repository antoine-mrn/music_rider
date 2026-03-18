export const RIDER_STATUS_LABELS = {
    DRAFT: "Brouillon",
    PUBLISHED: "Terminé",
    ARCHIVED: "Archivé",
} as const;

type RiderStatus = keyof typeof RIDER_STATUS_LABELS;

export const RIDER_STATUS_COLORS: Record<RiderStatus, string> = {
    DRAFT: "badge-warning",
    PUBLISHED: "badge-success",
    ARCHIVED: "badge-neutral",
} as const;
