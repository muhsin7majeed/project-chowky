import { useState } from "react";
import AsyncSelect from "react-select/async";
import useCategories from "@/features/admin/categories/apis/use-categories";
import type { GenericLabelValue } from "@/types/common";

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

    callback(options);
  };

  return (
    <div>
      <AsyncSelect
        placeholder={placeholder}
        isClearable={clearable}
        cacheOptions
        loadOptions={loadOptions}
        value={value || ""}
        defaultOptions
        onChange={(value) => {
          onChange((value || undefined) as GenericLabelValue<number> | undefined);
        }}
      />
    </div>
  );
};

export default CategorySelect;
