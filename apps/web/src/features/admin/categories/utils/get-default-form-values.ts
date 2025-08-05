import type { Category, CategoryFormDefaultValues } from "@/types/category";

const getDefaultFormValues = (category?: Category): CategoryFormDefaultValues => {
  console.log("DEFAULT VALUES", category);

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
      : "",
    imageUrl: category?.imageUrl || "",
    priority: category?.priority || 0,
    isActive: category?.isActive || false,
  };
};

export default getDefaultFormValues;
