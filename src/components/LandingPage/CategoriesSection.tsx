import {
  Smartphone,
  Watch,
  Camera,
  Headphones,
  Laptop,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Phones", icon: Smartphone },
  { name: "Smart Watches", icon: Watch },
  { name: "Cameras", icon: Camera },
  { name: "Headphones", icon: Headphones },
  { name: "Computers", icon: Laptop },
  { name: "Gaming", icon: Gamepad2 },
];

const Categories = () => {
  return (
    <section className="w-full bg-gray-100 py-25">
      <div className="container mx-auto px-4 md:px-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">Browse By Category</h3>
          <div className="flex gap-3">
            <ChevronLeft className="w-8 h-8 cursor-pointer" />
            <ChevronRight className="w-8 h-8 cursor-pointer" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {categories.map((item, i) => (
            <Link
              to={`/category/${item.name.toLowerCase().replace(" ", "-")}`}
              key={i}
              className="flex flex-col items-center justify-center cursor-pointer bg-gray-200 h-[160px] rounded-2xl gap-3 p-6 hover:shadow-md transition"
            >
              <item.icon className="w-9 h-9" />
              <p className="mt-2 text-md font-medium">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
