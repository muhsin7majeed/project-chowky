import type { Dimension, GenericLabelValue, Weight } from "./common";

export interface ProductFormDefaultValues {
  id?: string;
  name: string;
  sku: string;
  slug: string;
  description?: string;
  category?: GenericLabelValue<number> | null;
  price: number;
  stock: number;
  isActive: boolean;
  images?: File[];
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  cost: number;
  weight?: Weight;
  length?: Dimension;
  width?: Dimension;
  height?: Dimension;
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
