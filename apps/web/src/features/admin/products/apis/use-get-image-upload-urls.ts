import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { trpc } from "@/utils/trpc";

const useGetImageUploadUrls = () => {
  const mutation = useMutation(
    trpc.admin.product.getImageUploadUrls.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  return mutation;
};

export default useGetImageUploadUrls;
