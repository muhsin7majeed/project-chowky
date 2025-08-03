import { useQuery } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";

const useCategories = () => {
  const categories = useQuery(trpc.app.category.getAll.queryOptions({}));
  return categories;
};

export default useCategories;
