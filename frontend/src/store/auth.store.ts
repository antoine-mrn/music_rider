import { create } from "zustand";
import type { AuthUserInterface } from "../features/auth/types";

interface AuthStore {
    user: AuthUserInterface | null;
    setUser: (user: AuthUserInterface | null) => void;
    setLogout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    setLogout: () => set({ user: null }),
}));
