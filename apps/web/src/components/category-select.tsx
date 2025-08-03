import { useState } from "react";
import useCategories from "@/features/admin/categories/apis/use-categories";
import type { GenericLabelValue } from "@/types/common";
import { AsyncSelect } from "./ui/async-select";

interface CategorySelectProps {
  value: GenericLabelValue<number> | undefined;
  onChange: (value: GenericLabelValue<number> | undefined) => void;
  placeholder?: string;
  clearable?: boolean;
  label?: string;
}

const CategorySelect = ({
  value,
  onChange,
  label = "Category",
  placeholder = "Select a category",
  clearable = true,
}: CategorySelectProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = useCategories({ search: searchQuery });

  const options: GenericLabelValue<number>[] =
    categories.data?.map((category) => ({
      value: category.id,
      label: category.name,
    })) || [];

  const fetchData = async (query?: string) => {
    if (query) {
      setSearchQuery(query);
    } else {
      setSearchQuery("");
    }

    return options;
  };

  return (
    <div>
      <AsyncSelect<GenericLabelValue<number>>
        placeholder={placeholder}
        fetcher={fetchData}
        renderOption={(item) => <div>{item.label}</div>}
        getOptionValue={(item) => item.value.toString()}
        getDisplayValue={(item) => item.label}
        label={label}
        value={value?.toString() || ""}
        onChange={(value) => onChange(value)}
        clearable={clearable}
      />
    </div>
  );
};

export default CategorySelect;
