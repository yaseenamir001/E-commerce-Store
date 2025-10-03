import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import {
  fetchProductsByCategory,
  type Product,
  type ProductResponse,
} from "@/api/productApi";
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

const subCategoriesForWatches = ["mens-watches", "womens-watches"];

export default function CategoryContent() {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [rawProducts, setRawProducts] = useState<Product[]>([]);
  const [currentProducts, setCurrentProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [subTotals, setSubTotals] = useState<number[]>([]);
  const [cachedPages, setCachedPages] = useState<Record<number, Product[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isClientPagination, setIsClientPagination] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>(
    undefined
  );
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const hasFetched = useRef(false);
  const fetchLock = useRef(false);

  const itemsPerPage = 9;

  useEffect(() => {
    if (!categoryName || fetchLock.current) return;

    fetchLock.current = true;
    setLoading(true);
    setCurrentPage(1);
    setCachedPages({});
    hasFetched.current = true;

    const isCombined = categoryName === "Smart Watches";
    const isFiltered = ["Cameras", "Headphones", "Gaming"].includes(
      categoryName
    );
    const backendCategory =
      categoryMap[categoryName] || categoryName.toLowerCase();

    const fetchData = async () => {
      try {
        let res: ProductResponse;
        if (isFiltered) {
          res = await fetchProductsByCategory(backendCategory, 0, 0);
          const filteredProducts = res.products.filter((product) => {
            if (categoryName === "Cameras") {
              return ["camera", "monopod", "lens", "pedestal"].some((keyword) =>
                product.title.toLowerCase().includes(keyword)
              );
            } else if (categoryName === "Headphones") {
              return [
                "airpods",
                "airpod",
                "earphones",
                "earphone",
                "beats",
              ].some((keyword) =>
                product.title.toLowerCase().includes(keyword)
              );
            } else if (categoryName === "Gaming") {
              return ["gaming", "game", "controller", "pad"].some((keyword) =>
                product.title.toLowerCase().includes(keyword)
              );
            }
            return false;
          });
          setRawProducts(filteredProducts);
          setTotal(filteredProducts.length);
          setIsClientPagination(true);
          setCurrentProducts(filteredProducts.slice(0, itemsPerPage));
          setCachedPages({ 1: filteredProducts.slice(0, itemsPerPage) });
        } else if (isCombined) {
          const allRes = await Promise.all(
            subCategoriesForWatches.map((cat) =>
              fetchProductsByCategory(cat, 0, 0)
            )
          );
          const combinedProducts = allRes.flatMap((r) => r.products);
          setRawProducts(combinedProducts);
          setTotal(combinedProducts.length);
          setSubTotals(allRes.map((r) => r.total));
          setIsClientPagination(true);
          setCurrentProducts(combinedProducts.slice(0, itemsPerPage));
          setCachedPages({ 1: combinedProducts.slice(0, itemsPerPage) });
        } else {
          res = await fetchProductsByCategory(
            backendCategory,
            0,
            itemsPerPage,
            sortField,
            sortOrder
          );
          setCurrentProducts(res.products);
          setTotal(res.total);
          setIsClientPagination(false);
          setCachedPages({ 1: res.products });
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setProducts([]);
        setCurrentProducts([]);
        setTotal(0);
      } finally {
        setLoading(false);
        fetchLock.current = false;
      }
    };

    fetchData();
  }, [categoryName, sortField, sortOrder]);

  useEffect(() => {
    if (!isClientPagination || rawProducts.length === 0) return;

    let filtered = [...rawProducts];
    if (Object.keys(filters).length) {
      filtered = filtered.filter((p) => {
        if (
          filters.brand?.length &&
          p.brand &&
          !filters.brand.includes(p.brand)
        ) {
          return false;
        }
        const lowerDesc = p.description.toLowerCase();
        const lowerTitle = p.title.toLowerCase();

        if (filters.battery?.length) {
          const batteryMatch = filters.battery.some(
            (b) =>
              lowerDesc.includes(b.toLowerCase()) ||
              lowerTitle.includes(b.toLowerCase())
          );
          if (!batteryMatch) return false;
        }

        if (filters.screen?.length) {
          const screenMatch = filters.screen.some(
            (s) =>
              lowerDesc.includes(s.toLowerCase()) ||
              lowerTitle.includes(s.toLowerCase())
          );
          if (!screenMatch) return false;
        }

        if (filters.memory?.length) {
          const memoryMatch = filters.memory.some(
            (m) =>
              lowerDesc.includes(m.toLowerCase()) ||
              lowerTitle.includes(m.toLowerCase())
          );
          if (!memoryMatch) return false;
        }

        return true;
      });
    }

    if (sortField) {
      const multiplier = sortOrder === "asc" ? 1 : -1;
      filtered.sort((a, b) => {
        if (sortField === "price") {
          return multiplier * (a.price - b.price);
        } else if (sortField === "rating") {
          return multiplier * (a.rating - b.rating);
        }
        return 0;
      });
    }

    setProducts(filtered);
    setTotal(filtered.length);
    setCurrentProducts(filtered.slice(0, itemsPerPage));
    setCachedPages({ 1: filtered.slice(0, itemsPerPage) });
  }, [sortField, sortOrder, isClientPagination, rawProducts, filters]);

  useEffect(() => {
    if (loading || !categoryName || isClientPagination || fetchLock.current)
      return;

    fetchLock.current = true;
    const backendCategory =
      categoryMap[categoryName] || categoryName.toLowerCase();

    const fetchPage = async () => {
      const cached = cachedPages[currentPage];
      if (cached) {
        setCurrentProducts(cached);
        fetchLock.current = false;
        return;
      }

      setLoading(true);
      try {
        const skip = (currentPage - 1) * itemsPerPage;
        const res: ProductResponse = await fetchProductsByCategory(
          backendCategory,
          skip,
          itemsPerPage,
          sortField,
          sortOrder
        );
        setCurrentProducts(res.products);
        setCachedPages((prev) => ({ ...prev, [currentPage]: res.products }));
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
        fetchLock.current = false;
      }
    };

    fetchPage();
  }, [
    currentPage,
    categoryName,
    isClientPagination,
    cachedPages,
    subTotals,
    sortField,
    sortOrder,
  ]);

  const handleFilterChange = (
    section: string,
    option: string,
    checked: boolean
  ) => {
    setFilters((prev) => {
      const sectionFilters = prev[section] || [];
      const newSectionFilters = checked
        ? [...sectionFilters, option]
        : sectionFilters.filter((o) => o !== option);
      return { ...prev, [section]: newSectionFilters };
    });
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    let newSortField: string | undefined;
    let newSortOrder: "asc" | "desc" | undefined;

    switch (value) {
      case "rating-desc":
        newSortField = "rating";
        newSortOrder = "desc";
        break;
      case "price-asc":
        newSortField = "price";
        newSortOrder = "asc";
        break;
      case "price-desc":
        newSortField = "price";
        newSortOrder = "desc";
        break;
      default:
        newSortField = undefined;
        newSortOrder = undefined;
        break;
    }

    setSortField(newSortField);
    setSortOrder(newSortOrder);
    setCurrentPage(1);
    setCachedPages({});
  };

  const slicedProducts = isClientPagination
    ? products.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : currentProducts;

  const totalPages = Math.ceil(
    (isClientPagination ? products.length : total) / itemsPerPage
  );
  const selectedProductsCount = isClientPagination ? products.length : total;
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, selectedProductsCount);

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader categoryName={categoryName} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </aside>
        <main className="lg:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              Showing {startItem} - {endItem} of{" "}
              <span className="font-semibold">{selectedProductsCount}</span>{" "}
              products
            </p>
            <Select
              onValueChange={handleSortChange}
              value={sortField && sortOrder ? `${sortField}-${sortOrder}` : ""}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating-desc">By Rating</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
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
