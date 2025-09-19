import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  favorite?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Apple iPhone 14 Pro Max 128GB Deep Purple",
    price: "$900",
    image: "/assets/iphone.png",
  },
  {
    id: 2,
    name: "Blackmagic Pocket Cinema Camera 6k",
    price: "$2535",
    image: "/assets/camera.png",
  },
  {
    id: 3,
    name: "Apple Watch Series 9 GPS 41mm Starlight Aluminium Case",
    price: "$399",
    image: "/assets/applewatch.png",
  },
  {
    id: 4,
    name: "AirPods Max Silver",
    price: "$549",
    image: "/assets/airpodsmax.png",
  },
  {
    id: 5,
    name: "Samsung Galaxy Watch6 Classic 47mm Black",
    price: "$369",
    image: "/assets/galaxywatch.png",
  },
  {
    id: 6,
    name: "Galaxy Z Fold5 Unlocked | 256GB | Phantom Black",
    price: "$1799",
    image: "/assets/fold5.png",
    favorite: true,
  },
  {
    id: 7,
    name: "Galaxy Buds FE Graphite",
    price: "$99.99",
    image: "/assets/galaxybuds.png",
  },
  {
    id: 8,
    name: "Apple iPad 9 10.2” 64GB Wi-Fi Silver (MK2L3) 2021",
    price: "$398",
    image: "/assets/ipad.png",
  },
];

const ProductsSection = () => {
  return (
    <section className="w-full p-30">
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="flex justify-start gap-6 border-b mb-8">
          <TabsTrigger
            value="new"
            className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
          >
            New Arrival
          </TabsTrigger>
          <TabsTrigger
            value="bestseller"
            className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
          >
            Bestseller
          </TabsTrigger>
          <TabsTrigger
            value="featured"
            className="data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none"
          >
            Featured Products
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="relative rounded-xl shadow-sm border"
              >
                <button className="absolute top-3 right-3">
                  <Heart
                    className={`h-5 w-5 ${
                      product.favorite
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
                <CardContent className="flex flex-col items-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 object-contain mb-4"
                  />
                  <h3 className="text-sm font-medium text-center mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-lg font-semibold mb-4">{product.price}</p>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProductsSection;
