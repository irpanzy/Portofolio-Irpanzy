import { create } from "zustand";

interface GlobalLoadingState {
  isLoading: boolean;
  message: string;
  setLoading: (isLoading: boolean, message?: string) => void;
}

export const useGlobalLoading = create<GlobalLoadingState>((set) => ({
  isLoading: false,
  message: "Loading...",
  setLoading: (isLoading, message = "Loading...") =>
    set({ isLoading, message }),
}));
