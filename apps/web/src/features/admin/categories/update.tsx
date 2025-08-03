import { EditIcon } from "lucide-react";
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
import CategoryForm from "./form";

const UpdateCategory = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <Button onClick={toggleOpen}>
        <EditIcon className="w-4 h-4" />
        {t("update")}
      </Button>

      <Dialog open={open} onOpenChange={toggleOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{t("updateCategory")}</DialogTitle>
            <DialogDescription>{t("createCategoryDescription")}</DialogDescription>
          </DialogHeader>

          <CategoryForm />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{t("cancel")}</Button>
            </DialogClose>
            <Button type="submit">{t("save")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateCategory;
