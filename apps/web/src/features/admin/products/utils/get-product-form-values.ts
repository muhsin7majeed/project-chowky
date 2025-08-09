import type { ProductFormDefaultValues } from "@/types/product";

const getProductFormValues = (product?: ProductFormDefaultValues): ProductFormDefaultValues => {
  const values = {
    name: product?.name || "",
    sku: product?.sku || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    isActive: product?.isActive || true,
    images: product?.images || [],
    category: product?.category || null,
  };

  return values;
};

export default getProductFormValues;
