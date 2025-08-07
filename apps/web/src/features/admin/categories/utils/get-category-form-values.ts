import type { Category, CategoryFormDefaultValues } from "@/types/category";

const getCategoryFormValues = (category?: Category): CategoryFormDefaultValues => {
  return {
    id: category?.id,
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    parentId: category?.parentId
      ? {
          value: category.parentId,
          label: category.parentName || "",
        }
      : null,
    imageUrl: category?.imageUrl || "",
    priority: category?.priority || 0,
    isActive: category?.isActive || true,
  };
};

export default getCategoryFormValues;
