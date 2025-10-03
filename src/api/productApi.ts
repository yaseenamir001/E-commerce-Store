export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  rating: number;
  discountPercentage: number;
  category: string;
  images: string[];
  stock: number;
  brand?: string;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchProductsByCategorySimple = async (
  category: string,
  limit: number = 2
): Promise<ProductResponse> => {
  const url = `${BASE_URL}/products/category/${category}?limit=${limit}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const fetchProductsByCategory = async (
  category: string,
  skip: number = 0,
  limit: number = 0,
  sortField?: string,
  sortOrder?: "asc" | "desc"
): Promise<ProductResponse> => {
  let url = `${BASE_URL}/products/category/${category}`;
  const params = new URLSearchParams();
  if (limit > 0) {
    params.append("skip", skip.toString());
    params.append("limit", limit.toString());
  }
  if (sortField && sortOrder) {
    params.append("sortBy", sortField);
    params.append("order", sortOrder);
  }
  url += params.toString() ? `?${params.toString()}` : "";
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

export const fetchCombinedProducts = async (
  subCategories: string[],
  skip: number = 0,
  limit: number = 0,
  totals: number[] = [],
  sortField?: string,
  sortOrder?: "asc" | "desc"
): Promise<ProductResponse> => {
  let finalTotals = totals;
  if (!totals.length) {
    const totalPromises = subCategories.map(async (cat) => {
      const res = await fetchProductsByCategory(cat, 0, 0);
      return res.total;
    });
    finalTotals = await Promise.all(totalPromises);
  }
  const total = finalTotals.reduce((sum, t) => sum + t, 0);

  if (limit === 0) {
    return { products: [], total, skip, limit };
  }

  let products: Product[] = [];
  let remaining = limit;
  const currentSkip = skip;

  if (sortField && sortOrder) {
    const fetchPromises = subCategories.map((cat, i) => {
      const catTotal = finalTotals[i];
      const localSkip = Math.max(0, Math.min(currentSkip, catTotal));
      const localLimit = Math.min(catTotal - localSkip, limit + remaining);
      return localLimit > 0
        ? fetchProductsByCategory(
            cat,
            localSkip,
            localLimit,
            sortField,
            sortOrder
          )
        : Promise.resolve({
            products: [],
            total: catTotal,
            skip: localSkip,
            limit: 0,
          });
    });

    const responses = await Promise.all(fetchPromises);
    let allProducts: Product[] = [];
    responses.forEach((res) => {
      allProducts = [...allProducts, ...res.products];
    });

    products = allProducts
      .sort((a, b) => {
        const multiplier = sortOrder === "asc" ? 1 : -1;
        if (sortField === "price") {
          return multiplier * (a.price - b.price);
        } else if (sortField === "rating") {
          return multiplier * (a.rating - b.rating);
        }
        return 0;
      })
      .slice(0, limit);
  } else {
    let cum = 0;
    for (let i = 0; i < subCategories.length && remaining > 0; i++) {
      const catTotal = finalTotals[i];
      if (currentSkip < cum + catTotal) {
        const localSkip = Math.max(0, currentSkip - cum);
        const localLimit = Math.min(remaining, catTotal - localSkip);
        if (localLimit > 0) {
          const res = await fetchProductsByCategory(
            subCategories[i],
            localSkip,
            localLimit
          );
          products = [...products, ...res.products];
          remaining -= localLimit;
        }
      }
      cum += catTotal;
    }
  }

  return { products, total, skip, limit };
};
