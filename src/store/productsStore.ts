import { create } from "zustand";
import { fetchProductsByCategory } from "@/api/productApi";
import type { Product } from "@/api/productApi";

interface ProductsStore {
  cache: Record<string, Product[]>;
  fetchLocks: Record<string, boolean>;
  fetchProducts: (
    key: string,
    categories: string[],
    limit: number
  ) => Promise<void>;
  getProducts: (key: string) => Product[] | undefined;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  cache: {},
  fetchLocks: {},

  fetchProducts: async (key: string, categories: string[], limit: number) => {
    const { cache, fetchLocks } = get();
    if (cache[key] || fetchLocks[key]) return;

    set((state) => ({ fetchLocks: { ...state.fetchLocks, [key]: true } }));

    try {
      const results: Product[] = [];
      const countPerCategory = Math.ceil(limit / categories.length);
      const existingIds = new Set<number>();

      for (const category of categories) {
        const data = await fetchProductsByCategory(category, countPerCategory);
        if (!data?.products?.length) continue;

        data.products.forEach((product) => {
          if (results.length >= limit || existingIds.has(product.id)) return;
          results.push({
            ...product,
            discount: Math.floor(Math.random() * 50) + 1,
          });
          existingIds.add(product.id);
        });
      }

      set((state) => ({
        cache: { ...state.cache, [key]: results },
        fetchLocks: { ...state.fetchLocks, [key]: false },
      }));
    } catch (error) {
      console.error("Error fetching products:", error);
      set((state) => ({ fetchLocks: { ...state.fetchLocks, [key]: false } }));
    }
  },

  getProducts: (key: string) => get().cache[key],
}));
