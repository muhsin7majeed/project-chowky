import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomPagination from "@/components/custom-pagination";
import FetchState from "@/components/fetch-state";
import useDebounce from "@/hooks/use-debounce";
import usePagination from "@/hooks/use-pagination";
import useSort from "@/hooks/use-sort";
import type { GenericLabelValue } from "@/types/common";
import type { Product, ProductFiltersInterface, ProductOrderBy, ProductStatus } from "@/types/product";
import useProducts from "./apis/use-products";
import CreateProduct from "./crud/create";
import ProductFilters from "./filters";
import ProductList from "./list";

export default function ProductsPage() {
  const { t } = useTranslation();
  const { sort, handleSort } = useSort<ProductOrderBy>({ column: "name", direction: "asc" });

  const [filters, setFilters] = useState<ProductFiltersInterface>({
    search: "",
    status: "all",
    category: undefined,
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
    categoryId: filters.category?.value,
    limit: pagination.limit,
    offset: pagination.offset,
    orderBy: {
      column: sort.column as ProductOrderBy,
      direction: sort.direction,
    },
  });

  const handleSearch = (search: string) => {
    setFilters({ ...filters, search });
  };

  const handleStatusChange = (status: ProductStatus | "all") => {
    setFilters({ ...filters, status });
  };

  const handleCategoryChange = (category: GenericLabelValue<number> | undefined) => {
    setFilters({ ...filters, category });
  };

  // Update total count when data changes
  useEffect(() => {
    if (productsResponse?.total) {
      pagination.setTotal(productsResponse.total);
    }
  }, [productsResponse?.total, pagination]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">{t("products")}</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory.</p>
        </div>
        <CreateProduct />
      </div>

      <div className="my-6">
        <ProductFilters
          filters={filters}
          onSearch={handleSearch}
          onStatusChange={handleStatusChange}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="space-y-6">
        <FetchState
          isLoading={isLoading}
          isError={error?.message}
          retry={refetch}
          isEmpty={productsResponse?.rows?.length === 0}
          sectionName={t("products")}
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
