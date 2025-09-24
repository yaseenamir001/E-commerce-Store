import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import type { Product } from "@/api/productApi";
import { useWishlistStore } from "@/store/wishlistStore";

interface Props {
  product: Product;
}

export default function WishlistCard({ product }: Props) {
  const { removeFromWishlist } = useWishlistStore();

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 border rounded-xl p-4 shadow-sm relative bg-white hover:shadow-md transition">
      <button
        onClick={() => removeFromWishlist(product.id)}
        className="absolute top-3 right-3 text-red-500 hover:text-red-600 transition"
        aria-label="Remove from wishlist"
      >
        <Heart className="h-5 w-5 fill-current" />
      </button>

      <div className="w-full md:w-40 h-32 flex-shrink-0 flex items-center justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="max-w-full max-h-full object-contain rounded-md"
        />
      </div>

      <div className="flex flex-col flex-1 space-y-2 text-center md:text-left">
        <h3 className="text-base font-semibold line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <p className="text-lg font-bold text-primary">${product.price ?? 0}</p>

        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 mt-2">
          <Button variant="secondary" className="w-30 p-3">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
