import { ROUTES } from "../../routes";

interface AppNavLink {
    path: string;
    label: string;
    end: boolean;
}

export const APP_NAVLINKS: AppNavLink[] = [
    { path: ROUTES.PROFILE, label: "Dashboard", end: true },
    { path: ROUTES.BANDS, label: "Mes groupes", end: false },
    { path: ROUTES.RIDER, label: "Mes riders", end: false },
];

export interface RiderAppNavLink extends AppNavLink {
    step: number;
}

export const getRiderNavLinks = (
    riderId: string | number,
): RiderAppNavLink[] => [
    {
        path: ROUTES.RIDER_GENERAL(riderId),
        step: 1,
        label: "Informations Générales",
        end: true,
    },
    {
        path: ROUTES.RIDER_SCENE(riderId),
        step: 2,
        label: "Scène & Espace",
        end: true,
    },
    {
        path: "/rider",
        step: 3,
        label: "Patch Audio",
        end: true,
    },
    {
        path: "/rider",
        step: 4,
        label: "Lumières & FX",
        end: true,
    },
];
