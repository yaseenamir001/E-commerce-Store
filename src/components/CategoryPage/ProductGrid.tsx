import ProductCard from "@/components/LandingPage/ProductCard";
import type { Product } from "@/api/productApi";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (products.length === 0)
    return <p className="text-center text-red-500">No products found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
