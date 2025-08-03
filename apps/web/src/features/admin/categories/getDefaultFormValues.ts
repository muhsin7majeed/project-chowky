import type { CategoryFormDefaultValues } from "@/types/category";

const getDefaultFormValues = (): CategoryFormDefaultValues => {
  return {
    name: "",
    slug: "",
    description: "",
    parentId: undefined,
    imageUrl: undefined,
    priority: undefined,
    isActive: true,
  };
};

export default getDefaultFormValues;
