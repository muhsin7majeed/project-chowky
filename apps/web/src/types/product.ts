import type { GenericLabelValue } from "./common";

export interface ProductFormDefaultValues {
  id?: string;
  name: string;
  sku: string;
  description?: string;
  category?: GenericLabelValue<number> | null;
  price: number;
  stock: number;
  isActive: boolean;
  images?: File[];
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "inactive" | "draft";
  createdAt: string;
}
