import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient, trpc } from "@/utils/trpc";

const useDeleteProduct = () => {
  const mutation = useMutation(
    trpc.admin.product.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["app", "product"]] });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete product");
      },
    }),
  );

  return mutation;
};

export default useDeleteProduct;
