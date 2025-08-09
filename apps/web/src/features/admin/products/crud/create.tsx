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
import useCreateProduct from "../apis/use-create-product";
import getProductFormPayload from "../utils/get-product-form-payload";
import getProductFormValues from "../utils/get-product-form-values";
import ProductForm from "./form";

const CreateProduct = () => {
  const { t } = useTranslation();
  const { mutate: createProduct, isPending } = useCreateProduct();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = (data: ProductFormDefaultValues) => {
    const payload = getProductFormPayload(data);

    createProduct(payload, {
      onSuccess: () => {
        toast.success(t("productCreated"));
        toggleOpen();
      },
    });
  };

  const defaultValues = getProductFormValues();

  return (
    <div>
      <Button onClick={toggleOpen}>
        <PlusIcon className="w-4 h-4" />
        {t("create")}
      </Button>

      <Dialog open={open} onOpenChange={toggleOpen}>
        <DialogContent className="sm:max-w-6xl">
          <DialogHeader>
            <DialogTitle>{t("createProduct")}</DialogTitle>
            <DialogDescription>{t("createProductDescription")}</DialogDescription>
          </DialogHeader>

          <ProductForm onSubmit={handleSubmit} defaultValues={defaultValues} />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={toggleOpen}>
              {t("cancel")}
            </Button>

            <Button type="submit" form="product-form" isLoading={isPending} disabled={isPending}>
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProduct;
