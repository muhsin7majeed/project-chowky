import { useTranslation } from "react-i18next";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product } from "@/types/product";
import ProductRow from "./product-row";

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="max-w-screen">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">{t("createdAt")}</TableHead>
              <TableHead>{t("name")}</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>{t("categories")}</TableHead>
              <TableHead className="text-right">{t("price")}</TableHead>
              <TableHead className="text-right">{t("stock")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {products.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
