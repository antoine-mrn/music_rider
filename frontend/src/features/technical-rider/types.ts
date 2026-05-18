import type { RIDER_STATUS_LABELS } from "../../shared/constantes/rider-status";
import type { STAFF_ROLES } from "../../shared/constantes/staff-role";
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

export interface TechnicalRiderGeneralInfo {
    musicianNumber: number | null;
    setDuration: number | null;
    soundcheckDuration: number | null;
    setupDuration: number | null;
    teardownDuration: number | null;
}

export interface StaffMemberRaw {
    id: number;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    phone: string | null;
}

export interface TechnicalRiderGeneralRaw {
    technicalRiderGeneral: TechnicalRiderGeneralInfo | null;
    band: {
        id: string;
        label: string;
    };
    TechnicalRiderStaff: GroupedStaffRaw;
    bandContact: Omit<BandContact, "isPrimary"> | null;
}

export type TechnicalRiderBand = TechnicalRiderGeneralRaw["band"];
export type TechnicalRiderBandContact = TechnicalRiderGeneralRaw["bandContact"];

export interface GroupedStaffRaw {
    sound_engineers: StaffMemberRaw[];
    light_engineers: StaffMemberRaw[];
}

export interface StaffMemberPayload {
    dbId: number | null;
    firstname: string | null;
    lastname: string | null;
    email: string | null;
    phone: string | null;
}

export interface SyncTechnicalRiderStaffType {
    sound_engineers: StaffMemberPayload[];
    light_engineers: StaffMemberPayload[];
}
