import { SearchIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import CategorySelect from "@/components/category-select";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { GenericLabelValue } from "@/types/common";
import type { ProductFiltersInterface, ProductStatus } from "@/types/product";

interface ProductFiltersProps {
  filters: ProductFiltersInterface;
  onSearch: (search: string) => void;
  onStatusChange: (status: ProductStatus | "all") => void;
  onCategoryChange: (category: GenericLabelValue<number> | undefined) => void;
}

const ProductFilters = ({ filters, onSearch, onStatusChange, onCategoryChange }: ProductFiltersProps) => {
  const { t } = useTranslation();
  const { search, status, category } = filters;

  return (
    <div className="flex gap-4 items-center justify-end flex-wrap">
      <Input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={t("search_by_name_or_sku")}
        prefixIcon={<SearchIcon />}
        className="min-w-[200px]"
      />

      <div className="min-w-[200px]">
        <CategorySelect
          value={category}
          onChange={onCategoryChange}
          placeholder={t("select_category")}
          clearable={true}
        />
      </div>

      <ToggleGroup size="sm" variant="outline" type="single" value={status} onValueChange={onStatusChange}>
        <ToggleGroupItem value="all">{t("all")}</ToggleGroupItem>
        <ToggleGroupItem value="active">{t("active")}</ToggleGroupItem>
        <ToggleGroupItem value="inactive">{t("inactive")}</ToggleGroupItem>
        <ToggleGroupItem value="draft">{t("draft")}</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default ProductFilters;
