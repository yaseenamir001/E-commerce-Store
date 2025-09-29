import { useEffect, useState, useRef } from "react";
import { useProductsStore } from "@/store/productsStore";
import type { Product } from "@/api/productApi";

export const useProducts = (categories: string[], limit = 4) => {
  const key = JSON.stringify({ categories, limit });

  const cachedProducts = useProductsStore((state) => state.getProducts(key));
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  const [products, setProducts] = useState<Product[]>(cachedProducts || []);
  const [loading, setLoading] = useState<boolean>(!cachedProducts);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (cachedProducts || hasFetched.current) {
      setProducts(cachedProducts || []);
      setLoading(false);
      return;
    }

    let isMounted = true;
    hasFetched.current = true;
    setLoading(true);

    fetchProducts(key, categories, limit)
      .then(() => {
        if (!isMounted) return;
        const newProducts = useProductsStore.getState().getProducts(key);
        if (newProducts) setProducts(newProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [key, cachedProducts, fetchProducts]);

  return { products, loading };
};
