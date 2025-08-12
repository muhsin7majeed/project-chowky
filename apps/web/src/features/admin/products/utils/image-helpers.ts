import type { ProductFormImage, ProductImage } from "@/types/product";
import getProductImagePublicUrl from "./get-product-image-path";

/**
 * Type guard to check if an image is a File (new upload)
 */
export const isFileImage = (image: ProductFormImage): image is File => {
  return image instanceof File;
};

/**
 * Type guard to check if an image is an existing ProductImage
 */
export const isProductImage = (image: ProductFormImage): image is ProductImage => {
  return !isFileImage(image) && "objectPath" in image;
};

/**
 * Separates form images into existing images and new file uploads
 */
export const separateImages = (images: ProductFormImage[]) => {
  const existingImages: ProductImage[] = [];
  const newFiles: File[] = [];

  for (const image of images) {
    if (isFileImage(image)) {
      newFiles.push(image);
    } else {
      existingImages.push(image);
    }
  }

  return { existingImages, newFiles };
};

/**
 * Gets the appropriate preview URL for an image
 */
export const getImagePreviewUrl = (image: ProductFormImage): string => {
  if (isFileImage(image)) {
    return URL.createObjectURL(image);
  }
  return getProductImagePublicUrl(image.objectPath);
};

/**
 * Gets a unique identifier for an image (for React keys)
 */
export const getImageId = (image: ProductFormImage, index: number): string => {
  if (isFileImage(image)) {
    return `file-${image.name}-${index}`;
  }
  return `existing-${image.objectPath}-${index}`;
};
