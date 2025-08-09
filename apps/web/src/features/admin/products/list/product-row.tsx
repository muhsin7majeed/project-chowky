import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Product } from "@/types/product";
import { ProductActions } from "../crud/product-actions";

interface ProductRowProps {
  product: Product;
}

const ProductRow = ({ product }: ProductRowProps) => {
  const { t } = useTranslation();

  return (
    <TableRow key={product.id}>
      <TableCell className="text-muted-foreground">{new Date(product.createdAt).toLocaleDateString()}</TableCell>
      <TableCell className="font-medium">{product.name}</TableCell>
      <TableCell className="text-muted-foreground">{product.sku}</TableCell>
      <TableCell>{product.category}</TableCell>
      <TableCell className="text-right">
        {new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(product.price)}
      </TableCell>
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
  );
};

export default ProductRow;
