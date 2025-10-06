import { useParams } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategoryProducts from "@/hooks/useCategoryProducts";

export default function CategoryContent() {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const {
    products,
    slicedProducts,
    totalPages,
    currentPage,
    setCurrentPage,
    loading,
    filters,
    handleFilterChange,
    sortField,
    sortOrder,
    handleSortChange,
    selectedProductsCount,
    startItem,
    endItem,
  } = useCategoryProducts(categoryName);

  return (
    <div className="container mx-auto px-4 py-8">
      <CategoryHeader categoryName={categoryName} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <Filters
            products={products}
            filters={filters}
            onFilterChange={handleFilterChange}
            categoryName={categoryName}
          />
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
