import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

interface UseProductDetailsParams {
  slug?: string;
  id?: number;
  enabled?: boolean;
}

const useProductDetails = (params?: UseProductDetailsParams) => {
  const { enabled = true, ...queryParams } = params || {};

  const products = useQuery({
    ...trpc.app.product.getByIdOrSlug.queryOptions(queryParams),
    enabled,
  });

  return products;
};

export default useProductDetails;
