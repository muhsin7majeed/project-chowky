import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { CategoryFormDefaultValues } from "@/types/category";
import useCreateCategory from "../apis/use-create-category";
import getCategoryFormPayload from "../utils/get-category-form-payload";
import getCategoryFormValues from "../utils/get-category-form-values";
import CategoryForm from "./form";

const CreateCategory = () => {
  const { t } = useTranslation();
  const { mutate: createCategory, isPending } = useCreateCategory();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleSubmit = (data: CategoryFormDefaultValues) => {
    const payload = getCategoryFormPayload(data);

    createCategory(payload, {
      onSuccess: () => {
        toggleOpen();
        toast.success(t("categoryCreated"));
      },
    });
  };

  const defaultValues = getCategoryFormValues();

  return (
    <div>
      <Button onClick={toggleOpen}>
        <PlusIcon className="w-4 h-4" />
        {t("create")}
      </Button>

      <Dialog open={open} onOpenChange={toggleOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{t("createCategory")}</DialogTitle>
            <DialogDescription>{t("createCategoryDescription")}</DialogDescription>
          </DialogHeader>

          <CategoryForm onSubmit={handleSubmit} defaultValues={defaultValues} />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={toggleOpen}>
              {t("cancel")}
            </Button>

            <Button type="submit" form="category-form" isLoading={isPending}>
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategory;
