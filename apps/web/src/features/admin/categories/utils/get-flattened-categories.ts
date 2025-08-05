import type { Category, FlatCategory } from "@/types/category";

const flattenCategories = (categories: Category[], level = 0, parentName?: string): FlatCategory[] => {
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

export default flattenCategories;
