export interface Product {
  id: number;
  title: string;
  description?: string;
  price?: number;
  thumbnail: string;
  rating?: number;
  discount?: number;
}

// TODO: put it in env
const BASE_URL = "https://dummyjson.com";

interface ProductResponse {
  products: Product[];
}

export const fetchProductsByCategory = async (
  category: string,
  limit?: number
): Promise<ProductResponse> => {
  const res = await fetch(
    `${BASE_URL}/products/category/${category}?limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
