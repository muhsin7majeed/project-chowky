import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { CategoryFilterStatus, CategoryFiltersInterface } from "@/types/category";

interface CategoryFiltersProps {
  filters: CategoryFiltersInterface;
  onSearch: (search: string) => void;
  onStatusChange: (status: CategoryFilterStatus) => void;
  onExpandAll: () => void;
}

const CategoryFilters = ({ filters, onSearch, onStatusChange }: CategoryFiltersProps) => {
  const { search, status } = filters;

  return (
    <div className="flex gap-4 items-center justify-end flex-wrap">
      <Input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search"
        prefixIcon={<SearchIcon />}
      />

      <ToggleGroup size="sm" variant="outline" type="single" value={status} onValueChange={onStatusChange}>
        <ToggleGroupItem value="all">All</ToggleGroupItem>
        <ToggleGroupItem value="active">Active</ToggleGroupItem>
        <ToggleGroupItem value="inactive">Inactive</ToggleGroupItem>
      </ToggleGroup>

      {/* TODO: Check the uncontrolled to controlled state change warning */}
      {/* <Button variant="outline" onClick={onExpandAll}>
        {expanded ? "Collapse All" : "Expand All"}
      </Button> */}
    </div>
  );
};

export default CategoryFilters;
