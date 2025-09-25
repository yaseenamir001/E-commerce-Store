import { useEffect, useState } from "react";
import { fetchProductsByCategory } from "@/api/productApi";
import type { Product } from "@/api/productApi";

export const useProducts = (categories: string[], limit = 4) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const results: Product[] = [];
        const countPerCategory = Math.ceil(limit / categories.length);

        const existingIds = new Set<number>();

        // TODO: use promise.all
        for (const cat of categories) {
          const data = await fetchProductsByCategory(cat, countPerCategory);
          if (!data?.products?.length) continue;

          for (let j = 0; j < countPerCategory; j++) {
            if (results.length >= limit) break;

            const product: Product = {
              ...data.products[j % data.products.length],
              discount: Math.floor(Math.random() * 50) + 1,
            };

            if (existingIds.has(product.id)) continue;
            existingIds.add(product.id);

            results.push(product);
          }
        }

        setProducts(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [categories, limit]);

  return { products, loading };
};
