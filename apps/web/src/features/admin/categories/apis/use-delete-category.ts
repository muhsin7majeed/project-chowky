import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient, trpc } from "@/utils/trpc";

const useDeleteCategory = () => {
  const mutation = useMutation(
    trpc.app.category.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["app", "category"]] });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete category");
      },
    }),
  );

  return mutation;
};

export default useDeleteCategory;
