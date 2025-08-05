import type { Category, CategoryFormDefaultValues } from "@/types/category";

const getDefaultFormValues = (category?: Category): CategoryFormDefaultValues => {
  return {
    id: category?.id,
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    parentId: category?.parentId || undefined,
    imageUrl: category?.imageUrl || "",
    priority: category?.priority || 0,
    isActive: category?.isActive || false,
  };
};

export default getDefaultFormValues;
