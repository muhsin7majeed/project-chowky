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
import type { Product, ProductFormDefaultValues } from "@/types/product";
import CategoryForm from "../../categories/crud/form";
import useUpdateProduct from "../apis/use-update-product";
import getProductFormPayload from "../utils/get-product-form-payload";
import getProductFormValues from "../utils/get-product-form-values";
import ProductForm from "./form";

interface UpdateProductProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpdateProduct = ({ product, open, onOpenChange }: UpdateProductProps) => {
  const { mutate: updateProduct, isPending } = useUpdateProduct();

  const { t } = useTranslation();

  const handleSubmit = (data: ProductFormDefaultValues) => {
    const payload = getProductFormPayload({ data, isCreate: false });

    updateProduct(
      { id: product.id, ...payload },
      {
        onSuccess: () => {
          toast.success(t("productUpdated"));
          onOpenChange(false);
        },
      },
    );
  };

  const defaultValues: ProductFormDefaultValues = getProductFormValues(product);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{t("updateProduct")}</DialogTitle>
          <DialogDescription>Update the details for "{product.name}" product.</DialogDescription>
        </DialogHeader>

        <ProductForm onSubmit={handleSubmit} defaultValues={defaultValues} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              {t("cancel")}
            </Button>
          </DialogClose>

          <Button type="submit" form="product-form" disabled={isPending} isLoading={isPending}>
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProduct;
