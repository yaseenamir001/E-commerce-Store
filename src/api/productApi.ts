export interface Product {
  id: number;
  title: string;
  description?: string;
  price?: number;
  thumbnail: string;
  rating?: number;
  discount?: number;
  category?: string;
  images?: string[];
  stock?: number;
}

interface ProductResponse {
  products: Product[];
  total?: number;
  skip?: number;
  limit?: number;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProductsByCategory = async (
  category: string,
  limit?: number
): Promise<ProductResponse> => {
  const res = await fetch(
    `${BASE_URL}/products/category/${category}?limit=${limit || 0}`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
