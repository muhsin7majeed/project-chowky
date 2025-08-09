import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient, trpc } from "@/utils/trpc";

const useCreateCategory = () => {
  const mutation = useMutation(
    trpc.admin.category.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [["app", "category"]] });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  );

  return mutation;
};

export default useCreateCategory;
