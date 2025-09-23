import ProductCard from "@/components/LandingPage/ProductCard";
import type { Product } from "@/api/productApi";

interface Props {
  products: Product[];
}

const WishlistProducts = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default WishlistProducts;
