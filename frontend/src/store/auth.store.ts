import { create } from "zustand";
import type { AuthUserInterface } from "../features/auth/types";

interface AuthStore {
    user: AuthUserInterface | null;
    isAuthenticated: boolean;
    setUser: (user: AuthUserInterface | null) => void;
    setLogout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user, isAuthenticated: true }),
    setLogout: () => set({ user: null, isAuthenticated: false }),
}));
