import { useEffect, useState } from "react";
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

export default function CategoryContent() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (categoryName) {
      setLoading(true);
      fetchProductsByCategory(categoryName.toLowerCase())
        .then((data) => setProducts(data.products))
        .finally(() => setLoading(false));
    }
  }, [categoryName]);

  return (
    <div className="container mx-auto px-8 py-12">
      <CategoryHeader categoryName={categoryName} />

      <div className="grid grid-cols-12 gap-14">
        <aside className="col-span-3">
          <Filters />
        </aside>

        <main className="col-span-9">
          <div className="flex items-center justify-between pt-9 mb-6">
            <p className="text-gray-600">
              Selected Products:{" "}
              <span className="font-semibold">{products.length}</span>
            </p>

            <Select>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">By rating</SelectItem>
                <SelectItem value="low-high">Price: Low to High</SelectItem>
                <SelectItem value="high-low">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ProductGrid products={products} loading={loading} />

          <Pagination totalPages={12} currentPage={1} />
        </main>
      </div>
    </div>
  );
}
