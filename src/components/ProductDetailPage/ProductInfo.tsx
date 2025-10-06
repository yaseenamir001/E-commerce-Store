import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import type { Product } from "@/api/productDetailApi";
import { useWishlistStore } from "@/store/wishlistStore";

interface Props {
  product: Product;
}

export default function ProductInfo({ product }: Props) {
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlistStore();
  const liked = isInWishlist(product.id);

  const toggleWishlist = () => {
    liked ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold">${product.price}</span>
        {product.discountPercentage && (
          <>
            <span className="text-gray-400 line-through">
              $
              {(
                product.price +
                product.price * (product.discountPercentage / 100)
              ).toFixed(2)}
            </span>
            <span className="text-green-600 font-medium">
              -{product.discountPercentage}%
            </span>
          </>
        )}
      </div>

      <div className="text-gray-600 mb-6">{product.description}</div>

      <div className="flex gap-4 mb-6">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={toggleWishlist}
        >
          <Heart
            size={18}
            className={`${
              liked ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
          {liked ? "Wishlisted" : "Add to Wishlist"}
        </Button>
        <Button className="flex-1">Add to Cart</Button>
      </div>

      <div className="flex flex-wrap gap-6 text-sm text-gray-500">
        <div> Free Delivery: 1–2 Days</div>
        <div> In Stock</div>
        <div>1-Year Warranty</div>
      </div>
    </div>
  );
}
