import type { Product } from "./productApi";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchProductById(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

export type { Product } from "./productApi";
