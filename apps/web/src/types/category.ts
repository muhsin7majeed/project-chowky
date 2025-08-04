import type { GenericLabelValue } from "./common";

export interface CategoryFormDefaultValues {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  parentId?: GenericLabelValue<number>;
  imageUrl?: string;
  priority?: number;
  isActive: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  parentId?: number | null;
  imageUrl?: string | null;
  priority?: number | null;
  isActive: boolean;
  subCategories?: Category[];
}

export type CategoryFilterStatus = "active" | "inactive" | "all";

export interface CategoryFiltersInterface {
  search: string;
  status: CategoryFilterStatus;
  expanded: boolean;
}
