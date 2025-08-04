import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { CategoryFilterStatus } from "@/types/category";

interface CategoryFiltersProps {
  search: string;
  status: CategoryFilterStatus;
  onSearch: (search: string) => void;
  onStatusChange: (status: CategoryFilterStatus) => void;
  onExpandAll: () => void;
}

const CategoryFilters = ({ search, status, onSearch, onStatusChange, onExpandAll }: CategoryFiltersProps) => {
  return (
    <div className="flex gap-4 items-center justify-end flex-wrap">
      <Input value={search} onChange={(e) => onSearch(e.target.value)} placeholder="Search" icon={<SearchIcon />} />

      <ToggleGroup variant="outline" type="single" value={status} onValueChange={onStatusChange}>
        <ToggleGroupItem value="all">All</ToggleGroupItem>
        <ToggleGroupItem value="active">Active</ToggleGroupItem>
        <ToggleGroupItem value="inactive">Inactive</ToggleGroupItem>
      </ToggleGroup>

      {/* TODO: Check the uncontrolled to controlled state change warning */}
      <Button variant="outline" onClick={onExpandAll}>
        Expand All
      </Button>
    </div>
  );
};

export default CategoryFilters;
