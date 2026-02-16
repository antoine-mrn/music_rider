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

export interface BandDetails {
    id: number;
    label: string;
    memberCount: number;
    musicStyle: {
        id: number;
        label: string;
    } | null;
    members: {
        id: number;
        firstname: string;
        lastname: string;
        role: UserBandRole;
        instruments: {
            id: number;
            label: string;
        }[];
    }[];
    bandContacts: {
        isPrimary: boolean;
        firstname: string | null;
        lastname: string | null;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
