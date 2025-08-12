import { useQuery } from "@tanstack/react-query";
import type { ProductOrderBy, ProductStatus } from "@/types/product";
import { trpc } from "@/utils/trpc";

interface UseProductsParams {
  status?: ProductStatus;
  limit?: number;
  offset?: number;
  search?: string;
  categoryId?: number;
  orderBy?: {
    column: ProductOrderBy;
    direction?: "asc" | "desc";
  };
  enabled?: boolean;
}

const useProducts = (params?: UseProductsParams) => {
  const { enabled = true, ...queryParams } = params || {};

  const products = useQuery({
    ...trpc.app.product.getAll.queryOptions(queryParams),
    enabled,
  });

  return products;
};

export default useProducts;
