import type { Category } from "@/types/category";
import type { FlatCategory } from "./types";

// Helper function to flatten nested categories
export const flattenCategories = (categories: Category[], level = 0, parentName?: string): FlatCategory[] => {
  const flattened: FlatCategory[] = [];

  for (const category of categories) {
    flattened.push({
      ...category,
      level,
      parentName,
    });

    if (category.subCategories?.length) {
      flattened.push(...flattenCategories(category.subCategories, level + 1, category.name));
    }
  }

  return flattened;
};
