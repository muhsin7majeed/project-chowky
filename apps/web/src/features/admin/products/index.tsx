import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomPagination from "@/components/custom-pagination";
import FetchState from "@/components/fetch-state";
import useDebounce from "@/hooks/use-debounce";
import usePagination from "@/hooks/use-pagination";
import useSort from "@/hooks/use-sort";
import type { Product, ProductFiltersInterface, ProductOrderBy } from "@/types/product";
import useProducts from "./apis/use-products";
import CreateProduct from "./crud/create";
import ProductList from "./list";

export default function ProductsPage() {
  const { t } = useTranslation();
  const { sort, handleSort } = useSort<ProductOrderBy>({ column: "name", direction: "asc" });

  const [filters, setFilters] = useState<ProductFiltersInterface>({
    search: "",
    status: "all",
  });

  const debouncedSearch = useDebounce(filters.search, 300);
  const pagination = usePagination({ initialLimit: 10 });

  const {
    data: productsResponse,
    isLoading,
    error,
    refetch,
  } = useProducts({
    search: debouncedSearch,
    status: filters.status === "all" ? undefined : filters.status,
    limit: pagination.limit,
    offset: pagination.offset,
    orderBy: {
      column: sort.column as ProductOrderBy,
      direction: sort.direction,
    },
  });

  console.log(productsResponse);

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
          isError={error?.message}
          retry={refetch}
          isEmpty={productsResponse?.rows?.length === 0}
        >
          <ProductList products={(productsResponse?.rows as Product[]) || []} handleSort={handleSort} sort={sort} />
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
