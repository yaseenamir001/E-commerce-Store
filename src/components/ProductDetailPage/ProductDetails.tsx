import type { Product } from "@/api/productDetailApi";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  product: Product;
}

const ProductDetails = ({ product }: Props) => {
  if (!product) return <p className="text-center">No product found</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Details</h2>

      <p className="text-sm text-gray-600 mb-6">{product.description}</p>

      <Card className="mb-6">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">Screen</h3>
          {product.category === "smartphones" ? (
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Screen diagonal</span>
                <span>6.7"</span>
              </div>
              <div className="flex justify-between">
                <span>Resolution</span>
                <span>2796x1290</span>
              </div>
              <div className="flex justify-between">
                <span>Refresh rate</span>
                <span>120Hz</span>
              </div>
              <div className="flex justify-between">
                <span>Pixel density</span>
                <span>460 ppi</span>
              </div>
              <div className="flex justify-between">
                <span>Type</span>
                <span>OLED</span>
              </div>
              <div className="flex justify-between">
                <span>Extras</span>
                <span>HDR, True Tone</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Specs coming soon for {product.category}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">CPU</h3>
          {product.category === "smartphones" ? (
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>CPU</span>
                <span>A16 Bionic</span>
              </div>
              <div className="flex justify-between">
                <span>Cores</span>
                <span>6</span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              Specs coming soon for {product.category}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
