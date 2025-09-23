import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useWishlistStore } from "@/store/wishlistStore";
import EmptyState from "@/components/WishlistPage/EmptyState";
import WishlistProducts from "@/components/WishlistPage/WishlistProducts";

const Wishlist = () => {
  const { wishlist } = useWishlistStore();

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

        {wishlist.length === 0 ? (
          <EmptyState />
        ) : (
          <WishlistProducts products={wishlist} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Wishlist;
