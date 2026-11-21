import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "../types";

interface WishlistState {
  favorites: Product[];
  toggleWishlist: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      favorites: [],

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.favorites.some((p) => p.id === product.id);
          if (exists) {
            return { favorites: state.favorites.filter((p) => p.id !== product.id) };
          }
          return { favorites: [...state.favorites, product] };
        });
      },

      isFavorite: (productId) => {
        return get().favorites.some((p) => p.id === productId);
      },

      clearWishlist: () => set({ favorites: [] }),
    }),
    {
      name: "quickcart-wishlist-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined" && window.localStorage) {
          return window.localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
    }
  )
);
