import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Image from "@/components/ui/Image";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Product } from "@/types/product";
import getProfitMargin from "../../utils/get-profit-margin";
import { ProductActions } from "../crud/product-actions";
import getProductImagePublicUrl from "../utils/get-product-image-path";
import ProductImageCarousel from "./product-image-carousel";

interface ProductRowProps {
  product: Product;
}

const ProductRow = ({ product }: ProductRowProps) => {
  const [showProductImages, setShowProductImages] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      {showProductImages && (
        <Dialog open={showProductImages} onOpenChange={setShowProductImages}>
          <DialogContent className="w-full" aria-describedby={product.description || "product-images"}>
            <DialogTitle>{product.name}</DialogTitle>

            <ProductImageCarousel
              images={product.imagePaths.map((image) => {
                return {
                  path: getProductImagePublicUrl(image.objectPath),
                  alt: `${product.name} image`,
                };
              })}
            />
          </DialogContent>
        </Dialog>
      )}

      <TableRow key={product.id}>
        <TableCell className="text-muted-foreground">{product.id}</TableCell>

        <TableCell>
          <Image
            src={getProductImagePublicUrl(product.imagePaths[0].objectPath)}
            alt={`${product.name} image`}
            className="border rounded-md cursor-pointer"
            onClick={() => setShowProductImages(true)}
            loading="lazy"
            width={50}
            height={50}
          />
        </TableCell>

        <TableCell className="text-muted-foreground">{new Date(product.createdAt).toLocaleDateString()}</TableCell>

        <TableCell className="font-medium">{product.name}</TableCell>

        <TableCell className="text-muted-foreground">{product.sku}</TableCell>

        <TableCell>{product.category.label}</TableCell>

        <TableCell className="text-right">
          {new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(product.price)}
        </TableCell>

        <TableCell className="text-right">
          {new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(product.cost)}
        </TableCell>

        <TableCell className="text-right">{getProfitMargin(product.cost, product.price).toFixed(2)}%</TableCell>

        <TableCell className="text-right">{product.stock}</TableCell>

        <TableCell>
          {product.status === "active" && <Badge variant="default">{t("active")}</Badge>}
          {product.status === "inactive" && <Badge variant="outline">{t("inactive")}</Badge>}
          {product.status === "draft" && <Badge variant="secondary">{t("draft")}</Badge>}
        </TableCell>

        <TableCell>
          <ProductActions product={product} />
        </TableCell>
      </TableRow>
    </>
  );
};

export default ProductRow;
