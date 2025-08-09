import type { ProductFormDefaultValues } from "@/types/product";

const getProductFormPayload = (data: ProductFormDefaultValues) => {
  const payload = {
    name: data.name,
    slug: data.slug,
    description: data.description,
    price: data.price,
    cost: data.cost,
    stock: data.stock,
    categoryId: data.category?.value as number,
    sku: data.sku,
    isActive: data.isActive,
    isNew: data.isNew,
    isBestSeller: data.isBestSeller,
    isFeatured: data.isFeatured,
    weight: data.weight?.value
      ? {
          value: data.weight?.value,
          unit: data.weight?.unit,
        }
      : undefined,
    length: data.length?.value
      ? {
          value: data.length?.value,
          unit: data.length?.unit,
        }
      : undefined,
    width: data.width?.value
      ? {
          value: data.width?.value,
          unit: data.width?.unit,
        }
      : undefined,
    height: data.height?.value
      ? {
          value: data.height?.value,
          unit: data.height?.unit,
        }
      : undefined,
  };

  return payload;
};

export default getProductFormPayload;
