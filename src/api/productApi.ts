// export interface Review {
//   rating: number;
//   comment: string;
//   date: string;
//   reviewerName: string;
//   reviewerEmail?: string;
//   images?: string[];
// }
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
  // reviews: Review[];
  brand?: string;
  battery?: string;
  memory?: string;
  screen?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  lens?: string;
  resolution?: string;
  type?: string;
  connectivity?: string;
  strap?: string;
  features?: string;
  compatibility?: string;

  [key: string]: string | number | string[] | undefined;
}

export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchProductsByCategorySimple(
  category: string,
  limit: number = 2
): Promise<ProductResponse> {
  const res = await fetch(
    `${BASE_URL}/products/category/${category}?limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProductsByCategory(
  category: string,
  skip: number = 0,
  limit: number = 0,
  sortField?: string,
  sortOrder?: "asc" | "desc"
): Promise<ProductResponse> {
  const params = new URLSearchParams();

  if (limit > 0) {
    params.append("skip", skip.toString());
    params.append("limit", limit.toString());
  }
  if (sortField && sortOrder) {
    params.append("sortBy", sortField);
    params.append("order", sortOrder);
  }

  const url = `${BASE_URL}/products/category/${category}${
    params.toString() ? `?${params.toString()}` : ""
  }`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products by category");
  return res.json();
}

export async function fetchCombinedProducts(
  subCategories: string[],
  skip: number = 0,
  limit: number = 0,
  totals: number[] = [],
  sortField?: string,
  sortOrder?: "asc" | "desc"
): Promise<ProductResponse> {
  const finalTotals =
    totals.length > 0
      ? totals
      : await Promise.all(
          subCategories.map(async (cat) => {
            const res = await fetchProductsByCategory(cat);
            return res.total;
          })
        );

  const total = finalTotals.reduce((sum, t) => sum + t, 0);

  if (limit === 0) return { products: [], total, skip, limit };

  let products: Product[] = [];
  let remaining = limit;
  const currentSkip = skip;

  if (sortField && sortOrder) {
    const responses = await Promise.all(
      subCategories.map((cat) =>
        fetchProductsByCategory(cat, 0, 0, sortField, sortOrder)
      )
    );

    const allProducts = responses.flatMap((r) => r.products);
    products = allProducts
      .sort((a, b) => {
        const multiplier = sortOrder === "asc" ? 1 : -1;
        if (sortField === "price") return multiplier * (a.price - b.price);
        if (sortField === "rating") return multiplier * (a.rating - b.rating);
        return 0;
      })
      .slice(skip, skip + limit);
  } else {
    let cum = 0;
    for (let i = 0; i < subCategories.length && remaining > 0; i++) {
      const catTotal = finalTotals[i];
      if (currentSkip < cum + catTotal) {
        const localSkip = Math.max(0, currentSkip - cum);
        const localLimit = Math.min(remaining, catTotal - localSkip);
        const res = await fetchProductsByCategory(
          subCategories[i],
          localSkip,
          localLimit
        );
        products = [...products, ...res.products];
        remaining -= localLimit;
      }
      cum += catTotal;
    }
  }

  return { products, total, skip, limit };
}
