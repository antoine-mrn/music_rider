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

export interface TechnicalRiderGeneral {
    technicalRiderGeneral: {
        musicianNumber: number | null;
        setDuration: number | null;
        soundcheckDuration: number | null;
        setupDuration: number | null;
        teardownDuration: number | null;
    } | null;
    band: {
        id: string;
        label: string;
    };
    TechnicalRiderStaff: {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        firstname: string | null;
        lastname: string | null;
        email: string | null;
        phone: string | null;
        technicalRiderId: string;
        role: typeof STAFF_ROLES;
    }[];
    bandContact: Omit<BandContact, "isPrimary"> | null;
}

export type TechnicalRiderGeneralInfo =
    TechnicalRiderGeneral["technicalRiderGeneral"];
export type TechnicalRiderBand = TechnicalRiderGeneral["band"];
export type TechnicalRiderStaff =
    TechnicalRiderGeneral["TechnicalRiderStaff"][number];
export type TechnicalRiderBandContact = TechnicalRiderGeneral["bandContact"];
