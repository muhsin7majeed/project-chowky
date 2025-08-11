import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { trpc } from "@/utils/trpc";

const useCreateProduct = () => {
  const mutation = useMutation(
    trpc.admin.product.create.mutationOptions({
      onSuccess: () => {},
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  return mutation;
};

export default useCreateProduct;
