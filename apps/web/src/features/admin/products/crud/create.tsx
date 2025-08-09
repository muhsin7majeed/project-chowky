import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ProductFormDefaultValues } from "@/types/product";
import ProductForm from "./form";

const CreateProduct = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = (data: ProductFormDefaultValues) => {
    setOpen(false);
    toast.success(t("productCreated"));
    // eslint-disable-next-line no-console
    console.log("Product create payload:", data);
  };

  const defaultValues: ProductFormDefaultValues = {
    name: "",
    sku: "",
    description: "",
    categoryId: undefined,
    price: 0,
    stock: 0,
    isActive: true,
    images: [],
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
            <DialogTitle>{t("createProduct")}</DialogTitle>
            <DialogDescription>{t("createProductDescription")}</DialogDescription>
          </DialogHeader>

          <ProductForm onSubmit={handleSubmit} defaultValues={defaultValues} />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={toggleOpen}>
              {t("cancel")}
            </Button>

            <Button type="submit" form="product-form">
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProduct;
