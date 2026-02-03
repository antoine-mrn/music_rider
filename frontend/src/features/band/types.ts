import type { UserBandRole } from "../../shared/types/user-band-role.type";

export interface SummaryBand {
    id: number;
    label: string;
    musicStyle: {
        id: number;
        label: string;
    };
    userRole: UserBandRole;
}
