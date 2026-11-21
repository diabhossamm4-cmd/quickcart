import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { PROMO_CODES } from "../data/mockData";
import { CartItem, Product, PromoCode } from "../types";
import { calculateOrderSummary } from "../utils/formatters";

interface CartState {
  items: CartItem[];
  activePromo: PromoCode | null;
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  getTotalCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      activePromo: null,

      addToCart: (product, quantity = 1, selectedColor, selectedSize) => {
        const itemId = `${product.id}-${selectedColor || "default"}-${selectedSize || "default"}`;

        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === itemId);

          if (existingIndex > -1) {
            const newItems = [...state.items];
            newItems[existingIndex].quantity += quantity;
            return { items: newItems };
          }

          return {
            items: [
              ...state.items,
              { id: itemId, product, quantity, selectedColor, selectedSize },
            ],
          };
        });
      },

      removeFromCart: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => set({ items: [], activePromo: null }),

      applyPromoCode: (code) => {
        const promo = PROMO_CODES.find((p) => p.code.toUpperCase() === code.trim().toUpperCase());
        if (!promo) {
          return { success: false, message: "Invalid promo code" };
        }
        const subtotal = get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        if (promo.minSpend && subtotal < promo.minSpend) {
          return {
            success: false,
            message: `Minimum spend of $${promo.minSpend} required for this code`,
          };
        }
        set({ activePromo: promo });
        return { success: true, message: `Code applied! ${promo.discountRate * 100}% off` };
      },

      removePromoCode: () => set({ activePromo: null }),

      getTotalCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: "quickcart-cart-storage",
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
