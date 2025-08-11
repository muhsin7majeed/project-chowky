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

  const handleImagesUpload = async (
    signedUploads: { url: string; objectPath: string; contentType: string }[],
    images: File[],
  ) => {
    if (!signedUploads?.length || !images?.length) return;

    if (signedUploads.length !== images.length) {
      throw new Error("Signed URLs count does not match images count");
    }

    const uploads = images.map((image, index) => {
      const { url, contentType } = signedUploads[index];

      return fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": contentType || image.type || "application/octet-stream",
        },
        body: image,
      });
    });

    const responses = await Promise.all(uploads);

    responses.forEach((res, i) => {
      if (!res.ok) {
        console.error("Upload failed for index", i, res.status, res.statusText);
      }
    });

    return responses;
  };

  const handleSubmit = async (data: ProductFormDefaultValues) => {
    const payload = getProductFormPayload(data);

    const images = data.images || [];
    const imagesToSign = images.map((file, idx) => ({
      originalName: file.name,
      contentType: file.type || "application/octet-stream",
      suffix: `${crypto.randomUUID?.() ?? Date.now()}-${idx}`,
    }));

    createProduct(
      { ...payload, imagesToSign },
      {
        onSuccess: async (response) => {
          const { signedUploads } = response || {};

          await handleImagesUpload(signedUploads || [], images);

          toast.success(t("productCreated"));
          toggleOpen();
        },
      },
    );
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
