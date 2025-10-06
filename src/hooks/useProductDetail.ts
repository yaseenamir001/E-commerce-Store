import { useEffect, useState } from "react";
import { fetchProductById } from "@/api/productDetailApi";
import type { Product } from "@/api/productDetailApi";

export const useProductDetail = (id: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  return { product, loading };
};
