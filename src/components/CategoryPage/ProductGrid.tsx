import ProductCard from "@/components/LandingPage/ProductCard";
import type { Product } from "@/api/productApi";

interface Props {
  products: Product[];
  loading: boolean;
}

export default function ProductGrid({ products, loading }: Props) {
  if (loading) return <p>Loading...</p>;
  if (products.length === 0) return <p>No products found.</p>;

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
