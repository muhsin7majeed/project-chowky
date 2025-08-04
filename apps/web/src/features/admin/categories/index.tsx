import { useState } from "react";
import { useTranslation } from "react-i18next";
import FetchState from "@/components/fetch-state";
import { useDebounce } from "@/lib/hooks";
import type { CategoryFilterStatus } from "@/types/category";
import useCategories from "./apis/use-categories";
import CreateCategory from "./create";
import CategoryFilters from "./filters";
import CategoryList from "./list";

export default function CategoriesPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "all" as CategoryFilterStatus,
    expanded: false,
  });

  const debouncedSearch = useDebounce(filters.search, 300);

  const { t } = useTranslation();
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useCategories({
    includeChildren: true,
    search: debouncedSearch,
    status: filters.status,
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl tracking-tight">{t("categories")}</h1>
          <p className="text-muted-foreground">Manage product categories and their organization.</p>
        </div>

        <CreateCategory />
      </div>

      <div className="my-2">
        <CategoryFilters
          search={filters.search}
          status={filters.status}
          onSearch={handleSearch}
          onStatusChange={handleStatusChange}
          onExpandAll={handleExpandAll}
        />
      </div>

      <div className="space-y-6">
        <FetchState isLoading={isLoading} isError={error?.message} retry={refetch} isEmpty={categories?.length === 0}>
          <CategoryList categories={categories || []} expanded={filters.expanded} />
        </FetchState>
      </div>
    </div>
  );
}
