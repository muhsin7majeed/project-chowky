import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomPagination from "@/components/custom-pagination";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreateProduct from "./crud/create";

export default function ProductsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  interface ProductRow {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    status: "active" | "inactive" | "draft";
    createdAt: string;
  }

  const products = useMemo<ProductRow[]>(
    () =>
      Array.from({ length: 42 }).map((_, i) => {
        const index = i + 1;
        const statuses: ProductRow["status"][] = ["active", "inactive", "draft"];
        const status = statuses[index % statuses.length];
        const categories = ["Electronics", "Apparel", "Home", "Sports"] as const;
        return {
          id: `prod_${index}`,
          name: `Sample Product ${index}`,
          sku: `SKU-${1000 + index}`,
          category: categories[index % categories.length],
          price: Number((Math.random() * 200 + 10).toFixed(2)),
          stock: Math.floor(Math.random() * 200),
          status,
          createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        };
      }),
    [],
  );

  const totalPages = Math.ceil(products.length / pageSize);
  const start = (page - 1) * pageSize;
  const currentPageRows = products.slice(start, start + pageSize);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">{t("products")}</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory.</p>
        </div>
        <CreateProduct />
      </div>

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
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentPageRows.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="text-muted-foreground">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
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
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <button type="button" className="underline hover:text-foreground">
                        {t("update")}
                      </button>
                      <span className="text-border">|</span>
                      <button type="button" className="underline hover:text-foreground">
                        {t("delete")}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <CustomPagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
        canGoToNextPage={page < totalPages}
        canGoToPreviousPage={page > 1}
        className="justify-end"
      />
    </div>
  );
}
