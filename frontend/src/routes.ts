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
} as const;
