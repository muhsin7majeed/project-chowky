import { useState } from "react";
import useCategories from "@/features/admin/categories/apis/use-categories";
import type { GenericLabelValue } from "@/types/common";
import CustomAsyncSelect from "./custom-async-select";

interface CategorySelectProps {
  value: GenericLabelValue<number> | undefined;
  onChange: (value: GenericLabelValue<number> | undefined) => void;
  placeholder?: string;
  clearable?: boolean;
}

const CategorySelect = ({
  value,
  onChange,
  placeholder = "Select a category",
  clearable = true,
}: CategorySelectProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useCategories({ search: searchQuery });

  const options: GenericLabelValue<number>[] =
    categories.data?.rows?.map((category) => ({
      value: category.id,
      label: category.name,
    })) || [];

  const loadOptions = (inputValue: string, callback: (options: GenericLabelValue<number>[]) => void) => {
    setSearchQuery(inputValue);

    // If data is already available and not loading, call callback immediately
    if (!categories.isLoading) {
      callback(options);
    }
  };

  return (
    <div>
      <CustomAsyncSelect
        placeholder={placeholder}
        clearable={clearable}
        loadOptions={loadOptions}
        value={value || undefined}
        onChange={(value) => {
          onChange((value || undefined) as GenericLabelValue<number> | undefined);
        }}
      />
    </div>
  );
};

export default CategorySelect;
