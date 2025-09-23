import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";

const bgClasses = [
  { bg: "bg-white text-gray-900", btn: "border-black text-black" },
  { bg: "bg-gray-100 text-gray-900", btn: "border-black text-black" },
  { bg: "bg-gray-200 text-gray-900", btn: "border-black text-black" },
  { bg: "bg-black text-white", btn: "border-white text-white" },
];

export default function ProductShowcase() {
  const { products, loading } = useProducts(
    ["smartphones", "laptops", "tablets", "mobile-accessories", "mens-watches"],
    4
  );

  if (loading) return <p>Loading...</p>;

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {products.map((item, i) => {
        const { bg, btn } = bgClasses[i % bgClasses.length];
        return (
          <Card
            key={item.id}
            className={`overflow-hidden ${bg} flex flex-col h-[600px]`}
          >
            <CardContent className="flex flex-col p-6 flex-1">
              <div className="flex justify-center items-center mb-8 h-76">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="max-h-full object-contain"
                />
              </div>

              <h3 className="text-2xl font-semibold mb-3 line-clamp-1">
                {item.title}
              </h3>
              <p className="text-sm opacity-80 mb-6 line-clamp-3">
                {item.description}
              </p>
              <Button
                variant="outline"
                className={`w-50 py-5 bg-transparent ${btn}`}
              >
                Shop Now
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
