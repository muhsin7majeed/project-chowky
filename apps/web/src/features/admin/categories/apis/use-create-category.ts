import { useMutation } from "@tanstack/react-query";
import { t } from "i18next";
import { toast } from "sonner";
import { trpc } from "@/utils/trpc";

const useCreateCategory = () => {
  const mutation = useMutation(
    trpc.app.category.create.mutationOptions({
      onError: () => {
        toast.error(t("categoryCreationFailed"));
      },
    }),
  );

  return mutation;
};

export default useCreateCategory;
