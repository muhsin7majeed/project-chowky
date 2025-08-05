import { useState } from "react";
import AsyncSelect from "react-select/async";
import useCategories from "@/features/admin/categories/apis/use-categories";
import type { GenericLabelValue } from "@/types/common";

interface CategorySelectProps {
  value: GenericLabelValue<any> | "";
  onChange: (value: GenericLabelValue<any> | "") => void;
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

  console.log({ value });

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
          console.log("VALUE", value);
          onChange(value || "");
        }}
      />
    </div>
  );
};

export default CategorySelect;
