import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient, trpc } from "@/utils/trpc";

const useUpdateProduct = () => {
  const mutation = useMutation(
    trpc.admin.product.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["app", "product"]] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  return mutation;
};

export default useUpdateProduct;
