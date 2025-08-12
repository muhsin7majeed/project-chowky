import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomPagination from "@/components/custom-pagination";
import FetchState from "@/components/fetch-state";
import useDebounce from "@/hooks/use-debounce";
import usePagination from "@/hooks/use-pagination";
import useSort from "@/hooks/use-sort";
import type { CategoryFilterStatus, CategoryFiltersInterface, CategoryOrderBy } from "@/types/category";
import useCategories from "./apis/use-categories";
import CreateCategory from "./crud/create";
import CategoryFilters from "./filters";
import CategoryList from "./list";

export default function CategoriesPage() {
  const { sort, handleSort } = useSort({ column: "name", direction: "asc" });

  const [filters, setFilters] = useState<CategoryFiltersInterface>({
    search: "",
    status: "all",
    expanded: false,
  });

  const debouncedSearch = useDebounce(filters.search, 300);
  const pagination = usePagination({ initialLimit: 10 });

  const { t } = useTranslation();
  const {
    data: categoriesResponse,
    isLoading,
    error,
    refetch,
  } = useCategories({
    includeChildren: true,
    search: debouncedSearch,
    status: filters.status,
    limit: pagination.limit,
    offset: pagination.offset,
    orderBy: {
      column: sort.column as CategoryOrderBy,
      direction: sort.direction,
    },
  });

  const handleSearch = (search: string) => {
    setFilters({ ...filters, search });
  };

  const handleStatusChange = (status: CategoryFilterStatus) => {
    setFilters({ ...filters, status });
  };

  const handleExpandAll = () => {
    setFilters({ ...filters, expanded: !filters.expanded });
  };

  // Update total count when data changes
  useEffect(() => {
    if (categoriesResponse?.total) {
      pagination.setTotal(categoriesResponse.total);
    }
  }, [categoriesResponse?.total, pagination]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl sm:text-3xl tracking-tight">{t("categories")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Manage product categories and their organization.
          </p>
        </div>

        <CreateCategory />
      </div>

      <div className="my-6">
        <CategoryFilters
          filters={filters}
          onSearch={handleSearch}
          onStatusChange={handleStatusChange}
          onExpandAll={handleExpandAll}
        />
      </div>

      <div className="space-y-6">
        <FetchState
          isLoading={isLoading}
          isError={error?.message}
          retry={refetch}
          isEmpty={categoriesResponse?.rows?.length === 0}
        >
          <CategoryList
            categories={categoriesResponse?.rows || []}
            expanded={filters.expanded}
            handleSort={handleSort}
            sort={sort}
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
