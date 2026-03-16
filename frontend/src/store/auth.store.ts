import { create } from "zustand";
import type { AuthUserInterface } from "../features/auth/types";

interface AuthStore {
    user: AuthUserInterface | null;
    isLoading: boolean;
    setUser: (user: AuthUserInterface | null) => void;
    setLogout: () => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isLoading: true,
    setUser: (user) => set({ user }),
    setLogout: () => set({ user: null }),
    setIsLoading: (isLoading) => set({ isLoading }),
}));
