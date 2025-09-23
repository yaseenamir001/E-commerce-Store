import { Search, ShoppingCart, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlistStore } from "@/store/wishlistStore";

const Navbar = () => {
  const { wishlist } = useWishlistStore();

  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="text-2xl font-bold">
          cyber
        </Link>

        <div className="hidden md:flex items-center bg-gray-200 rounded-md pl-4 pr-9 py-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 outline-none bg-transparent text-sm"
          />
        </div>

        <nav className="hidden md:flex gap-9 text-gray-700 font-medium">
          <Link to="/" className="hover:text-black">
            Home
          </Link>
          <Link to="/about" className="hover:text-black">
            About
          </Link>
          <Link to="/contact" className="hover:text-black">
            Contact Us
          </Link>
          <Link to="/blog" className="hover:text-black">
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-8 relative">
          <Link to="/wishlist" className="relative">
            <Heart className="w-6 h-6 cursor-pointer hover:text-gray-700" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {wishlist.length}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-700" />
          </Link>

          <Link to="/account">
            <User className="w-6 h-6 cursor-pointer hover:text-gray-700" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
