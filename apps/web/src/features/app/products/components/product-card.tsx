import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ProductImageCarousel from "@/features/admin/products/list/product-image-carousel";
import getProductImagePublicUrl from "@/features/admin/products/utils/get-product-image-path";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";
import ProductBadges from "./product-badges";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="py-0 gap-2 group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-square p-2">
        <ProductImageCarousel
          showArrows={false}
          imageClassName="h-full w-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          images={product.imagePaths.map((img) => ({
            path: getProductImagePublicUrl(img.objectPath),
            alt: product.name,
          }))}
        />

        <ProductBadges isNew={product.isNew} isBestSeller={product.isBestSeller} isFeatured={product.isFeatured} />

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {product.category.label}
          </Badge>
        </div>

        <CardTitle className="text-lg font-semibold mb-2 overflow-hidden text-ellipsis line-clamp-2">
          {product.name}
        </CardTitle>

        <p className="text-sm text-muted-foreground mb-3 overflow-hidden text-ellipsis line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">${product.price}</span>
            <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
          </div>

          <div className="text-right">
            {product.stock > 0 ? (
              <div className={cn("text-sm font-medium", product.stock > 10 ? "text-green-600" : "text-orange-600")}>
                {product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}
              </div>
            ) : (
              <div className="text-sm font-medium text-red-600">Out of Stock</div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
