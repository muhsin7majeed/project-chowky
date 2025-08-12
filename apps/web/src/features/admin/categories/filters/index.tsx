import { SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { search, status } = filters;

  return (
    <div className="flex gap-4 items-center justify-end flex-wrap">
      <Input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={t("search")}
        prefixIcon={<SearchIcon />}
      />

      <ToggleGroup size="sm" variant="outline" type="single" value={status} onValueChange={onStatusChange}>
        <ToggleGroupItem value="all">{t("all")}</ToggleGroupItem>
        <ToggleGroupItem value="active">{t("active")}</ToggleGroupItem>
        <ToggleGroupItem value="inactive">{t("inactive")}</ToggleGroupItem>
      </ToggleGroup>

      {/* TODO: Check the uncontrolled to controlled state change warning */}
      {/* <Button variant="outline" onClick={onExpandAll}>
        {expanded ? "Collapse All" : "Expand All"}
      </Button> */}
    </div>
  );
};

export default CategoryFilters;
