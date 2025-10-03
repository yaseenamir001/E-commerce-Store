import { create } from "zustand";
import { fetchProductsByCategorySimple } from "@/api/productApi";
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
      const existingIds = new Set<number>();
      const productsByCategory: Product[][] = [];

      for (const category of categories) {
        const data = await fetchProductsByCategorySimple(category, 2);
        if (!data?.products?.length) continue;
        productsByCategory.push(
          data.products.map((product) => ({
            ...product,
            discountPercentage: Math.floor(Math.random() * 50) + 1,
          }))
        );
      }

      let remaining = limit;
      let categoryIndex = 0;
      let productIndex = 0;

      for (let i = 0; i < productsByCategory.length && remaining > 0; i++) {
        const categoryProducts = productsByCategory[i];
        if (
          categoryProducts.length > 0 &&
          !existingIds.has(categoryProducts[0].id)
        ) {
          results.push(categoryProducts[0]);
          existingIds.add(categoryProducts[0].id);
          remaining--;
        }
      }

      while (remaining > 0 && categoryIndex < productsByCategory.length) {
        const categoryProducts = productsByCategory[categoryIndex];
        if (
          productIndex + 1 < categoryProducts.length &&
          !existingIds.has(categoryProducts[productIndex + 1].id)
        ) {
          results.push(categoryProducts[productIndex + 1]);
          existingIds.add(categoryProducts[productIndex + 1].id);
          remaining--;
        }
        categoryIndex = (categoryIndex + 1) % productsByCategory.length;
        if (categoryIndex === 0) productIndex++;
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
