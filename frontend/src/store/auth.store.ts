import { create } from "zustand";
import type { AuthUserInterface } from "../features/auth/types";

interface AuthStore {
    user: AuthUserInterface | null;
    isAuthenticated: boolean;
    setUser: (user: AuthUserInterface | null) => void;
    setLogout: () => void;
    setIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set({ user }),
    setLogout: () => set({ user: null, isAuthenticated: false }),
    setIsAuthenticated: () => set({ isAuthenticated: true }),
}));
