import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

interface UseCategoriesParams {
  parentId?: number;
  isActive?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
  includeChildren?: boolean;
  orderBy?: {
    column: "name" | "priority" | "createdAt";
    direction?: "asc" | "desc";
  };
  enabled?: boolean;
}

const useCategories = (params?: UseCategoriesParams) => {
  const { enabled = true, ...queryParams } = params || {};

  const categories = useQuery({
    ...trpc.app.category.getAll.queryOptions(queryParams),
    enabled,
  });

  return categories;
};

export default useCategories;
