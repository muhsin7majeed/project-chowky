import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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
import CategoryForm from "./form";

const CreateCategory = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleSubmit = (data: CategoryFormDefaultValues) => {
    console.log(data);
  };

  const defaultValues: CategoryFormDefaultValues = {
    name: "",
    slug: "",
    description: "",
    parentId: undefined,
    imageUrl: undefined,
    priority: undefined,
    isActive: true,
  };

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
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={toggleOpen}>
                {t("cancel")}
              </Button>
            </DialogClose>

            <Button type="submit" form="category-form">
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategory;
