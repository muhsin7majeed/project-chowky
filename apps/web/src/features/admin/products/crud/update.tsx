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
import { queryClient } from "@/utils/trpc";
import useGetImageUploadUrls from "../apis/use-get-image-upload-urls";
import useUpdateProduct from "../apis/use-update-product";
import useUpdateProductImages from "../apis/use-update-product-images";
import useUploadProductImage from "../apis/use-upload-product-image";
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
  const { mutateAsync: updateProductImages, isPending: isUpdatingImages } = useUpdateProductImages();
  const { mutateAsync: uploadProductImage, isPending: isUploadingImages } = useUploadProductImage();
  const { mutateAsync: getImageUploadUrls, isPending: isGettingUrls } = useGetImageUploadUrls();

  const { t } = useTranslation();

  const handleSubmit = async (data: ProductFormDefaultValues) => {
    const { productData, imageData } = getProductFormPayload({ data, isCreate: false });
    const { existingImages, newFiles } = imageData;

    try {
      // First update the product data
      await new Promise<void>((resolve, reject) => {
        updateProduct(
          { id: product.id, ...productData },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          },
        );
      });

      // Handle image updates if there are any new files or changes to existing ones
      if (newFiles.length > 0 || existingImages.length !== product.imagePaths.length) {
        let allImagePaths = [...existingImages];

        // If there are new files to upload
        if (newFiles.length > 0) {
          // Generate signed URLs for new files
          const imagesToSign = newFiles.map((file, idx) => ({
            originalName: file.name,
            contentType: file.type || "application/octet-stream",
            suffix: `${crypto.randomUUID?.() ?? Date.now()}-${idx}`,
          }));

          // Get signed URLs from the backend
          const { signedUploads } = await getImageUploadUrls({
            productId: product.id,
            imagesToSign,
          });

          // Upload new images
          const imageUploads = await uploadProductImage({
            images: newFiles,
            signedUploads,
          });

          // Add new uploads to the image paths
          const newImagePaths = imageUploads.map((res) => ({
            objectPath: res.objectPath,
            sortOrder: 0, // Will be reordered below
            isPrimary: false, // Will be set below
          }));

          allImagePaths = [...existingImages, ...newImagePaths];
        }

        // Update sort order and primary status for all images
        const finalImagePaths = allImagePaths.map((img, idx) => ({
          objectPath: img.objectPath,
          sortOrder: idx,
          isPrimary: idx === 0,
        }));

        await updateProductImages({
          productId: product.id,
          imagePaths: finalImagePaths,
        });
      }

      queryClient.invalidateQueries({ queryKey: [["app", "product"]] });
      toast.success(t("productUpdated"));
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  const defaultValues: ProductFormDefaultValues = getProductFormValues(product);
  const isLoading = isPending || isUpdatingImages || isUploadingImages || isGettingUrls;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>{t("updateProduct")}</DialogTitle>
          <DialogDescription>Update the details for "{product.name}" product.</DialogDescription>
        </DialogHeader>

        <ProductForm onSubmit={handleSubmit} defaultValues={defaultValues} isLoading={isLoading} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              {t("cancel")}
            </Button>
          </DialogClose>

          <Button type="submit" form="product-form" disabled={isLoading} isLoading={isLoading}>
            {t("save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProduct;
