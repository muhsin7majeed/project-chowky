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
import { queryClient } from "@/utils/trpc";
import useCreateProduct from "../apis/use-create-product";
import useUpdateProductImages from "../apis/use-update-product-images";
import useUploadProductImage from "../apis/use-upload-product-image";
import getProductFormPayload from "../utils/get-product-form-payload";
import getProductFormValues from "../utils/get-product-form-values";
import ProductForm from "./form";

const CreateProduct = () => {
  const { t } = useTranslation();
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { mutateAsync: updateProductImages, isPending: isUpdatingImages } = useUpdateProductImages();
  const { mutateAsync: uploadProductImage, isPending: isUploadingImages } = useUploadProductImage();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handleSubmit = async (data: ProductFormDefaultValues) => {
    const { productData, imageData } = getProductFormPayload({ data, isCreate: true });
    const { newFiles } = imageData;

    const imagesToSign = newFiles.map((file, idx) => ({
      originalName: file.name,
      contentType: file.type || "application/octet-stream",
      suffix: `${crypto.randomUUID?.() ?? Date.now()}-${idx}`,
    }));

    createProduct(
      { ...productData, imagesToSign },
      {
        onSuccess: async (response) => {
          const { signedUploads } = response || {};

          // Only upload new files if there are any
          if (newFiles.length > 0 && signedUploads) {
            const imageUploads = await uploadProductImage({
              images: newFiles,
              signedUploads,
            });

            const imagePaths = imageUploads.map((res, idx) => ({
              objectPath: res.objectPath,
              sortOrder: idx,
              isPrimary: idx === 0,
            }));

            await updateProductImages({
              productId: response.productId,
              imagePaths,
            });
          }

          queryClient.invalidateQueries({ queryKey: [["app", "product"]] });
          toast.success(t("productCreated"));
          toggleOpen();
        },
      },
    );
  };

  const defaultValues = getProductFormValues();

  const isLoading = isPending || isUpdatingImages || isUploadingImages;

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

          <ProductForm onSubmit={handleSubmit} defaultValues={defaultValues} isLoading={isLoading} />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={toggleOpen}>
              {t("cancel")}
            </Button>

            <Button type="submit" form="product-form" isLoading={isLoading} disabled={isLoading}>
              {t("save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProduct;
