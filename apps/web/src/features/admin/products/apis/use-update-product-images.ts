import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient, trpc } from "@/utils/trpc";

const useUpdateProductImages = () => {
  const mutation = useMutation(
    trpc.admin.product.updateImages.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["admin", "product"]] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  return mutation;
};

export default useUpdateProductImages;
