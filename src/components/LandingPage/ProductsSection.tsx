import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductList from "./ProductList";

export default function ProductsSection() {
  return (
    <section className="container mx-auto py-22 px-4 md:px-12">
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="font-medium text-md mb-6">
          <TabsTrigger value="new">New Arrival</TabsTrigger>
          <TabsTrigger value="bestseller">Bestseller</TabsTrigger>
          <TabsTrigger value="featured">Featured Products</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <ProductList
            categories={[
              "smartphones",
              "laptops",
              "tablets",
              "mobile-accessories",
              "mens-watches",
            ]}
            limit={8}
          />
        </TabsContent>

        <TabsContent value="bestseller">
          <ProductList
            categories={[
              "mobile-accessories",
              "mens-watches",
              "laptops",
              "tablets",
              "smartphones",
            ]}
            limit={8}
          />
        </TabsContent>

        <TabsContent value="featured">
          <ProductList
            categories={[
              "tablets",
              "laptops",
              "smartphones",
              "mobile-accessories",
              "mens-watches",
            ]}
            limit={8}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
