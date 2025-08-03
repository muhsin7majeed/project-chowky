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
