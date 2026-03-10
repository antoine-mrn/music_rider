import type { UserBandRole } from "../../shared/types/user-band-role.type";
import type { SummaryTechnicalRider } from "../technical-rider/types";

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

export interface BandContact {
    isPrimary: boolean;
    firstname: string;
    lastname: string;
    email: string | null;
    phone: string | null;
    contactRole: string;
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
    primaryContact: BandContact | null;
    bandContacts: BandContact[];
    technicalRiders: SummaryTechnicalRider[];
    createdAt: string;
    updatedAt: string;
}

export interface CreatedBand {
    id: number;
    label: string;
    musicStyleId: number;
    createdAt: string;
    updatedAt: string;
}
