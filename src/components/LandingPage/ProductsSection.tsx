import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductCard from "./ProductCard";
import { useProducts } from "@/hooks/useProducts";

export default function ProductsSection() {
  const { products: newArrival } = useProducts(
    ["smartphones", "laptops", "tablets", "mobile-accessories", "mens-watches"],
    8
  );
  const { products: bestSeller } = useProducts(
    ["mobile-accessories", "mens-watches", "laptops", "tablets", "smartphones"],
    8
  );
  const { products: featured } = useProducts(
    ["tablets", "laptops", "smartphones", "mobile-accessories", "mens-watches"],
    8
  );

  return (
    <section className="container mx-auto py-22 px-4 md:px-12">
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="font-medium text-md mb-6">
          <TabsTrigger value="new">New Arrival</TabsTrigger>
          <TabsTrigger value="bestseller">Bestseller</TabsTrigger>
          <TabsTrigger value="featured">Featured Products</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrival.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="bestseller">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSeller.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="featured">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
