import { useTranslation } from "react-i18next";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Sort } from "@/types/common";
import type { Product, ProductOrderBy } from "@/types/product";
import ProductRow from "./product-row";

interface ProductListProps {
  products: Product[];
  handleSort: (column: ProductOrderBy) => void;
  sort: Sort<ProductOrderBy>;
}

const ProductList = ({ products, handleSort, sort }: ProductListProps) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="max-w-screen">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">{t("id")}</TableHead>

              <TableHead className="">{t("images")}</TableHead>

              <TableHead
                className="w-[120px]"
                onClick={() => handleSort("createdAt")}
                sortDirection={sort.column === "createdAt" ? sort.direction : undefined}
              >
                {t("createdAt")}
              </TableHead>

              <TableHead
                onClick={() => handleSort("name")}
                sortDirection={sort.column === "name" ? sort.direction : undefined}
              >
                {t("name")}
              </TableHead>

              <TableHead
                onClick={() => handleSort("sku")}
                sortDirection={sort.column === "sku" ? sort.direction : undefined}
              >
                SKU
              </TableHead>

              <TableHead>{t("categories")}</TableHead>

              <TableHead
                onClick={() => handleSort("price")}
                sortDirection={sort.column === "price" ? sort.direction : undefined}
                className="text-right"
              >
                {t("price")}
              </TableHead>

              <TableHead className="text-right">{t("cost")}</TableHead>

              <TableHead className="text-right">{t("margin")}</TableHead>

              <TableHead
                onClick={() => handleSort("stock")}
                sortDirection={sort.column === "stock" ? sort.direction : undefined}
                className="text-right"
              >
                {t("stock")}
              </TableHead>

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
