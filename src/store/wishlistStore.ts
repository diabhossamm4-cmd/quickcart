import { create } from "zustand";
import { Product } from "../types";

interface WishlistState {
  favorites: Product[];
  toggleWishlist: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
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
}));
