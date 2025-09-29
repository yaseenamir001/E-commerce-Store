import { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import { fetchProductsByCategory, type Product } from "@/api/productApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categoryMap: Record<string, string> = {
  Phones: "smartphones",
  "Smart Watches": "mens-watches",
  Cameras: "mobile-accessories",
  Headphones: "mobile-accessories",
  Computers: "laptops",
  Gaming: "mobile-accessories",
};

export default function CategoryContent() {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const [sortBy, setSortBy] = useState<string>("");

  const itemsPerPage = 9;

  useEffect(() => {
    if (!categoryName || hasFetched.current) {
      setLoading(false);
      return;
    }

    hasFetched.current = true;
    setLoading(true);

    const fetchData = async () => {
      const backendCategory =
        categoryMap[categoryName] || categoryName?.toLowerCase();
      const response = await fetchProductsByCategory(backendCategory, 0);
      if (!response.products) {
        setProducts([]);
        return;
      }

      let filteredProducts = [...response.products];

      if (categoryName === "Smart Watches") {
        const womensWatches = await fetchProductsByCategory(
          "womens-watches",
          0
        );
        filteredProducts = [...filteredProducts, ...womensWatches.products];
      } else if (["Cameras", "Headphones", "Gaming"].includes(categoryName)) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            (categoryName === "Cameras" &&
              ["camera", "monopod", "lens", "pedestal"].some((keyword) =>
                product.title.toLowerCase().includes(keyword)
              )) ||
            (categoryName === "Headphones" &&
              ["airpods", "airpod", "earphones", "earphone", "beats"].some(
                (keyword) => product.title.toLowerCase().includes(keyword)
              )) ||
            (categoryName === "Gaming" &&
              ["gaming", "game", "controller", "pad"].some((keyword) =>
                product.title.toLowerCase().includes(keyword)
              ))
        );
      }

      setProducts(filteredProducts);
      setLoading(false);
    };

    fetchData().catch((err) => {
      console.error("Fetch error:", err);
      setProducts([]);
      setLoading(false);
    });
  }, [categoryName]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    switch (sortBy) {
      case "rating":
        sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      case "low-high":
        sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
        break;
      case "high-low":
        sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
        break;
      default:
        break;
    }
    return sorted;
  }, [products, sortBy]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const slicedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader categoryName={categoryName} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <Filters />
        </aside>
        <main className="lg:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Selected Products:{" "}
              <span className="font-semibold">{products.length}</span>
            </p>
            <Select onValueChange={setSortBy} value={sortBy}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">By Rating</SelectItem>
                <SelectItem value="low-high">Price: Low to High</SelectItem>
                <SelectItem value="high-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ProductGrid products={slicedProducts} loading={loading} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}
