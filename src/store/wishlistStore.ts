import { create } from "zustand";
import type { Product } from "@/api/productApi";

interface WishlistState {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],

  addToWishlist: (product) =>
    set((state) => ({
      wishlist: [...state.wishlist, product],
    })),

  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter((p) => p.id !== id),
    })),

  isInWishlist: (id) => get().wishlist.some((p) => p.id === id),
}));
