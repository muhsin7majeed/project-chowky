import { DIMENSION_UNIT_OPTIONS, WEIGHT_UNIT_OPTIONS } from "@/constants/common";
import type { ProductFormDefaultValues } from "@/types/product";

const getProductFormValues = (product?: ProductFormDefaultValues): ProductFormDefaultValues => {
  const values = {
    name: product?.name || "",
    sku: product?.sku || "",
    slug: product?.slug || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    isActive: product?.isActive || true,
    images: product?.images || [],
    category: product?.category || null,
    isFeatured: product?.isFeatured || false,
    isNew: product?.isNew || false,
    isBestSeller: product?.isBestSeller || false,
    cost: product?.cost || 0,
    weight: product?.weight || {
      value: 0,
      unit: WEIGHT_UNIT_OPTIONS[0].value,
    },
    length: product?.length || {
      value: 0,
      unit: DIMENSION_UNIT_OPTIONS[0].value,
    },
    width: product?.width || {
      value: 0,
      unit: DIMENSION_UNIT_OPTIONS[0].value,
    },
    height: product?.height || {
      value: 0,
      unit: DIMENSION_UNIT_OPTIONS[0].value,
    },
    description: product?.description || "",
  };

  return values;
};

export default getProductFormValues;
