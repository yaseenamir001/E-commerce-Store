import { useWishlistStore } from "@/store/wishlistStore";
import EmptyState from "./EmptyState";
import WishlistCard from "./WishlistCard";

const WishlistProducts = () => {
  const { wishlist } = useWishlistStore();

  if (wishlist.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-30 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-2xl font-bold">My Wishlist</h2>
        <span className="text-sm text-gray-500">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
        </span>
      </div>

      <div className="space-y-4">
        {wishlist.map((product) => (
          <WishlistCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WishlistProducts;
