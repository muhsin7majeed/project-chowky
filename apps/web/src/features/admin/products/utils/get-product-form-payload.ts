import type { ProductFormDefaultValues } from "@/types/product";

const getProductFormPayload = (data: ProductFormDefaultValues) => {
  const payload = {
    name: data.name,
    sku: data.sku,
    price: data.price,
    stock: data.stock,
    isActive: data.isActive,
  };

  return payload;
};

export default getProductFormPayload;
