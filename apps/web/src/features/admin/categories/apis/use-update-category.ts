import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient, trpc } from "@/utils/trpc";

const useUpdateCategory = () => {
  const mutation = useMutation(
    trpc.app.category.update.mutationOptions({
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

export default useUpdateCategory;
