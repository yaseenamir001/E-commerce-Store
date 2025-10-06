import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "@/api/productDetailApi";
import type { Product } from "@/api/productDetailApi";
import ProductGallery from "@/components/ProductDetailPage/ProductGallery";
import ProductInfo from "@/components/ProductDetailPage/ProductInfo";
import ProductDetails from "@/components/ProductDetailPage/ProductDetails";
import ProductHeader from "@/components/ProductDetailPage/ProductHeader";
import ReviewsSection from "@/components/ProductDetailPage/ReviewsSection";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProductById(Number(id));
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading product...</div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500">Product not found</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <ProductHeader product={product} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-20">
        <ProductDetails product={product} />
        {product.reviews && product.reviews.length > 0 && (
          <ReviewsSection reviews={product.reviews} />
        )}
      </div>
    </div>
  );
}
