export const ROUTES = {
    // Public
    HOME: "/",
    SIGNIN: "/signin",
    SIGNUP: "/signup",

    // Profile
    PROFILE: "/profile",
    PROFILE_EDIT: "/profile/editing",

    // Band
    BANDS: "/band",
    BAND_DETAILS: (bandId: string | number = ":bandId") => `/band/${bandId}`,

    //Rider
    RIDER: "/rider",
    RIDER_GENERAL: (riderId: string | number = ":riderId") =>
        `/rider/${riderId}/general`,
    RIDER_SCENE: (riderId: string | number = ":riderId") =>
        `/rider/${riderId}/scene`,
} as const;
