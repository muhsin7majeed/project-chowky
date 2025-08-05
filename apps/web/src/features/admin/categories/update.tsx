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
import type { Category, CategoryFormDefaultValues } from "@/types/category";
import CategoryForm from "./form";
import getCategoryFormPayload from "./getCategoryFormPayload";

interface UpdateCategoryProps {
  category: Category;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateCategory = ({ category, open, onOpenChange }: UpdateCategoryProps) => {
  const { t } = useTranslation();

  const handleSubmit = (data: CategoryFormDefaultValues) => {
    const payload = getCategoryFormPayload(data);

    // TODO: Implement update API call
    console.log("Update category:", category.id, payload);
    toast.success(t("categoryUpdated"));
    onOpenChange(false);
  };

  const defaultValues: CategoryFormDefaultValues = {
    id: category.id,
    name: category.name,
    slug: category.slug,
    description: category.description || "",
    parentId: category.parentId ? { value: category.parentId, label: "Parent Category" } : undefined,
    imageUrl: category.imageUrl || "",
    priority: category.priority || 0,
    isActive: category.isActive,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t("updateCategory")}</DialogTitle>
          <DialogDescription>Update the details for "{category.name}" category.</DialogDescription>
        </DialogHeader>

        <CategoryForm onSubmit={handleSubmit} defaultValues={defaultValues} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              {t("cancel")}
            </Button>
          </DialogClose>

          <Button type="submit" form="category-form">
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategory;
