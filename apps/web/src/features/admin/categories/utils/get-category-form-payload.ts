import type { CategoryFormDefaultValues } from "@/types/category";

const getCategoryFormPayload = (data: CategoryFormDefaultValues) => {
  return {
    name: data.name,
    slug: data.slug,
    description: data.description,
    parentId: data.parentId ? data.parentId.value : undefined,
    imageUrl: data.imageUrl,
    priority: data.priority,
    isActive: data.isActive,
  };
};

export default getCategoryFormPayload;
