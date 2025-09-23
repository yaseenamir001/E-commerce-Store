import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

export default function DiscountSection() {
  const { products, loading } = useProducts(
    ["laptops", "tablets", "mens-watches", "mobile-accessories"],
    4
  );

  if (loading) return <p>Loading...</p>;

  return (
    <section className="container mx-auto py-22 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-6">Discounts up to 50%</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
