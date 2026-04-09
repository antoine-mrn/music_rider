import type { CONTACT_ROLES } from "../../shared/constantes/contact-role";
import type { UserBandRole } from "../../shared/types/user-band-role.type";
import type { SummaryTechnicalRider } from "../technical-rider/types";

export interface SummaryBand {
    id: string;
    label: string;
    musicStyle: {
        id: number;
        label: string;
    };
    userRole: UserBandRole;
}

export interface BandMember {
    id: string;
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
    contactRole: keyof typeof CONTACT_ROLES;
}

export interface BandDetails {
    id: string;
    membershipId: number;
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
    id: string;
    label: string;
    musicStyleId: number;
    createdAt: string;
    updatedAt: string;
}
