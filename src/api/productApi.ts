export interface Product {
  id: number;
  title: string;
  description?: string;
  price?: number;
  thumbnail: string;
  rating?: number;
  discount?: number;
}

const BASE_URL = "https://dummyjson.com/products";

interface ProductResponse {
  products: Product[];
}

export const fetchProductsByCategory = async (
  category: string
): Promise<ProductResponse> => {
  const res = await fetch(`${BASE_URL}/category/${category}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
