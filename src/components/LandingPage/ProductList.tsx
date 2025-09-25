import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

function ProductList({
  categories,
  limit,
}: {
  categories: string[];
  limit: number;
}) {
  console.log({ categories, limit });
  const { products: newArrival } = useProducts(categories, limit);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {newArrival.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default ProductList;
