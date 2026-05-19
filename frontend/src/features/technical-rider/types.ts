import type { RIDER_STATUS_LABELS } from "../../shared/constantes/rider-status";
import type { BandContact } from "../band/types";
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

// Timing
export interface TechnicalRiderTiming {
    musicianNumber: number | null;
    setDuration: number | null;
    soundcheckDuration: number | null;
    setupDuration: number | null;
    teardownDuration: number | null;
}

// Staff
export interface StaffMemberRaw {
    id: number;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    phone: string | null;
}

export interface GroupedStaffRaw {
    sound_engineers: StaffMemberRaw[];
    light_engineers: StaffMemberRaw[];
}

export interface StaffMemberPayload {
    dbId: number | null;
    firstname: string;
    lastname: string;
    email?: string;
    phone?: string;
}

export interface SyncTechnicalRiderStaffType {
    sound_engineers: StaffMemberPayload[];
    light_engineers: StaffMemberPayload[];
}

// Band
export interface MappedTechnicalRiderBand {
    band: {
        id: string;
        label: string;
    };
    bandContact: Omit<BandContact, "isPrimary"> | null;
}

export type TechnicalRiderBand = MappedTechnicalRiderBand["band"];
export type TechnicalRiderBandContact = MappedTechnicalRiderBand["bandContact"];

// Old version
// export interface TechnicalRiderGeneralRaw {
//     technicalRiderGeneral: TechnicalRiderTiming | null;
//     band: {
//         id: string;
//         label: string;
//     };
//     TechnicalRiderStaff: GroupedStaffRaw;
//     bandContact: Omit<BandContact, "isPrimary"> | null;
// }
