import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import type { Product as APIProduct } from "@/api/productApi";
import { useWishlistStore } from "@/store/wishlistStore";

interface Props {
  product: APIProduct;
}

export default function ProductCard({ product }: Props) {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const liked = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (liked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Card className="relative rounded-xl bg-gray-100 border">
      <button onClick={toggleWishlist} className="absolute top-3 right-3">
        <Heart
          className={`h-5 w-5 cursor-pointer ${
            liked ? "text-red-500" : "text-gray-400"
          }`}
          fill={liked ? "currentColor" : "none"}
        />
      </button>

      <CardContent className="flex flex-col items-center p-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 object-contain mb-4"
        />
        <h3 className="text-sm font-medium text-center mb-2 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-lg font-semibold mb-4">${product.price ?? 0}</p>
        <Button variant="secondary" className="w-60 p-3">
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
}
