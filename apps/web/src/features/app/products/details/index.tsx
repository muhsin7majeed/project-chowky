import { BarChart3, Calendar, Hash, Package, Ruler, Scale, Tag } from "lucide-react";
import FetchState from "@/components/fetch-state";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useProductDetails from "@/features/admin/products/apis/use-product-details";
import ProductImageCarousel from "@/features/admin/products/list/product-image-carousel";
import getProductImagePublicUrl from "@/features/admin/products/utils/get-product-image-path";
import ProductBadges from "@/features/app/products/components/product-badges";
import { authClient } from "@/lib/auth-client";
import type { ProductStatus } from "@/types/product";
import formatDateTime from "@/utils/format-date-time";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(amount);
};

const getStockStatus = (stock: number) => {
  if (stock === 0) {
    return { label: "Out of Stock", color: "text-red-600" };
  }
  if (stock <= 10) {
    return { label: `Only ${stock} left`, color: "text-orange-600" };
  }
  return { label: "In Stock", color: "text-green-600" };
};

const getStatusBadgeVariant = (status: ProductStatus) => {
  switch (status) {
    case "active":
      return { variant: "default" as const, label: "Active" };
    case "inactive":
      return { variant: "outline" as const, label: "Inactive" };
    case "draft":
      return { variant: "secondary" as const, label: "Draft" };
    default:
      return { variant: "outline" as const, label: status };
  }
};

interface ProductDetailsProps {
  slug: string;
}

const ProductDetails = ({ slug }: ProductDetailsProps) => {
  const { data: session } = authClient.useSession();
  const { data: product, isLoading, error } = useProductDetails({ slug });

  const isAdmin = session?.user?.role === "admin";
  const productStatusBadge = product && getStatusBadgeVariant(product.status as ProductStatus);

  return (
    <FetchState isLoading={isLoading} isError={error?.message}>
      {product && (
        <div className="max-w-7xl mx-auto p-4 space-y-6">
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="relative">
              <ProductImageCarousel
                images={
                  product.imagePaths?.map((img) => ({
                    path: getProductImagePublicUrl(img.objectPath),
                    alt: product.name,
                  })) || []
                }
                imageClassName="h-96 w-full object-cover rounded-lg"
              />

              <ProductBadges
                isNew={product.isNew || false}
                isBestSeller={product.isBestSeller || false}
                isFeatured={product.isFeatured || false}
              />
            </div>

            {/* Product Basic Info */}
            <div className="space-y-6">
              <div>
                {isAdmin && productStatusBadge && (
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={productStatusBadge.variant}>{productStatusBadge.label}</Badge>
                  </div>
                )}
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{product.name}</h1>
                {product.description && <p className="text-gray-600 dark:text-gray-300">{product.description}</p>}
              </div>

              {/* Price and Stock */}
              <div className="space-y-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-primary">{formatCurrency(product.price)}</span>
                  {/* {product.cost && (
                    <span className="text-xl text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
                  )} */}
                </div>

                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-gray-500" />
                  <span className={`font-medium ${getStockStatus(product.stock || 0).color}`}>
                    {getStockStatus(product.stock || 0).label}
                  </span>
                  <span className="text-gray-500">({product.stock || 0} units available)</span>
                </div>
              </div>

              {/* SKU and ID */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">ID:</span>
                  <span className="text-sm font-medium">{product.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">SKU:</span>
                  <span className="text-sm font-medium">{product.sku}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Detailed Information Cards */}
          <div className="grid grid-flow-col gap-6">
            {/* Dimensions Card */}
            {(product.length || product.width || product.height) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    Dimensions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {product.length && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Length:</span>
                      <span className="font-medium">
                        {product.length.value} {product.length.unit}
                      </span>
                    </div>
                  )}
                  {product.width && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Width:</span>
                      <span className="font-medium">
                        {product.width.value} {product.width.unit}
                      </span>
                    </div>
                  )}
                  {product.height && (
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Height:</span>
                      <span className="font-medium">
                        {product.height.value} {product.height.unit}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Weight Card */}
            {product.weight && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Weight
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Weight:</span>
                    <span className="font-medium text-lg">
                      {product.weight.value} {product.weight.unit}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Product Info Card */}
            {isAdmin && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Product Info
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Created:</span>
                    <span className="font-medium">{formatDateTime(product.createdAt)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Updated:</span>
                    <span className="font-medium">{formatDateTime(product.updatedAt)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Status:</span>
                    <Badge variant={productStatusBadge?.variant}>{productStatusBadge?.label}</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Pricing Analysis Card */}
          {product.cost !== undefined && product.cost !== null && isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Pricing Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Selling Price</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(product.price)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Cost Price</p>
                    <p className="text-2xl font-bold text-gray-600">{formatCurrency(product.cost)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Profit per Unit</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(product.price - product.cost)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Profit Margin</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {product.cost > 0 ? (((product.price - product.cost) / product.cost) * 100).toFixed(2) : 0}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </FetchState>
  );
};

export default ProductDetails;
