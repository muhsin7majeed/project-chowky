import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomPagination from "@/components/custom-pagination";
import FetchState from "@/components/fetch-state";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product } from "@/types/product";
import CreateProduct from "./crud/create";
import ProductList from "./list";

export default function ProductsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const products = useMemo<Product[]>(
    () =>
      Array.from({ length: 42 }).map((_, i) => {
        const index = i + 1;
        const statuses: Product["status"][] = ["active", "inactive", "draft"];
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

  const isLoading = false;
  const error = null;
  const refetch = () => {};
  const categoriesResponse = { rows: products };
  const filters = { expanded: false };
  const sort = { column: "createdAt", direction: "desc" };
  const pagination = {
    page,
    totalPages,
    goToPage: setPage,
    canGoToNextPage: page < totalPages,
    canGoToPreviousPage: page > 1,
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">{t("products")}</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory.</p>
        </div>
        <CreateProduct />
      </div>

      <div className="space-y-6">
        <FetchState
          isLoading={isLoading}
          // isError={error?.message}
          retry={refetch}
          isEmpty={categoriesResponse?.rows?.length === 0}
        >
          <ProductList
            products={products}
            // handleSort={handleSort}
            // sort={sort}
          />
        </FetchState>

        <div className="flex justify-end">
          <CustomPagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={pagination.goToPage}
            canGoToNextPage={pagination.canGoToNextPage}
            canGoToPreviousPage={pagination.canGoToPreviousPage}
          />
        </div>
      </div>
    </div>
  );
}
