import { Search, ShoppingCart, Heart, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold">cyber</h1>

        <div className="hidden md:flex items-center bg-gray-200 rounded-md pl-4 pr-9 py-2">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 outline-none bg-transparent text-sm"
          />
        </div>

        <nav className="hidden md:flex gap-9 text-gray-700 font-medium">
          <a href="#" className="hover:text-black">
            Home
          </a>
          <a href="#" className="hover:text-black">
            About
          </a>
          <a href="#" className="hover:text-black">
            Contact Us
          </a>
          <a href="#" className="hover:text-black">
            Blog
          </a>
        </nav>

        <div className="flex items-center gap-8 ">
          <Heart className="w-6 h-6 cursor-pointer hover:text-gray-700" />
          <ShoppingCart className="w-6 h-6 cursor-pointer hover:text-gray-700" />
          <User className="w-6 h-6 cursor-pointer hover:text-gray-700" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
