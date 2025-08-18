import type { Category } from "./category";
import type { Dimension, GenericLabelValue, Weight } from "./common";

export type ProductStatus = "active" | "inactive" | "draft";

export type ProductFormImage = ProductImage | File;

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
  images?: ProductFormImage[];
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  cost: number;
  weight: Weight;
  length: Dimension;
  width: Dimension;
  height: Dimension;
}

export interface ProductImage {
  isPrimary: boolean;
  sortOrder: number;
  objectPath: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  imagePaths: ProductImage[];
  price: number;
  cost: number;
  stock: number;
  sku: string;
  status: ProductStatus;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  weight: Weight;
  length: Dimension;
  width: Dimension;
  height: Dimension;
  createdAt: string;
  updatedAt: string;
  category: GenericLabelValue<number>;
}

export interface AdminProductFiltersInterface {
  search: string;
  status: ProductStatus | "all";
  category?: GenericLabelValue<number>;
}

export type ProductOrderBy = "name" | "sku" | "price" | "stock" | "createdAt";

export interface UserProductFilters {
  search: string;
  category: Category | null;
}
