import { create } from "zustand";

interface UiStore {
  isLoading: boolean;
  isMobileMenuOpen: boolean;

  setIsLoading: (isLoading: boolean) => void;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openMobileMenu: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  isLoading: false,
  isMobileMenuOpen: false,

  setIsLoading: (isLoading) =>
    set(() => ({
      isLoading,
    })),

  toggleMobileMenu: () =>
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    })),

  closeMobileMenu: () =>
    set(() => ({
      isMobileMenuOpen: false,
    })),

  openMobileMenu: () =>
    set(() => ({
      isMobileMenuOpen: true,
    })),
}));
