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

export interface BandMember {
    id: number;
    firstname: string;
    lastname: string;
    avatarUrl: string | null;
    role: UserBandRole;
    instruments: BandInstrument[];
}

export interface BandInstrument {
    id: number;
    label: string;
}

export interface BandDetails {
    id: number;
    label: string;
    memberCount: number;
    musicStyle: {
        id: number;
        label: string;
    } | null;
    members: BandMember[];
    primaryContact: {
        isPrimary: boolean;
        firstname: string | null;
        lastname: string | null;
    };
    bandContacts: {
        isPrimary: boolean;
        firstname: string | null;
        lastname: string | null;
    }[];
    createdAt: string;
    updatedAt: string;
}
