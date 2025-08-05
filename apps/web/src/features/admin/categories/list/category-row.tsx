import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { FlatCategory } from "@/types/category";
import { CategoryActions } from "../crud/category-actions";

interface CategoryRowProps {
  category: FlatCategory;
}

export const CategoryRow = ({ category }: CategoryRowProps) => {
  const { t } = useTranslation();
  const indentStyle = { paddingLeft: `${category.level * 24 + 12}px` };

  return (
    <TableRow>
      <TableCell style={indentStyle} className="font-medium">
        <div className="flex items-center gap-2">
          {category.level > 0 && <div className="w-4 h-px bg-primary" />}
          <div className="min-w-0 flex-1">
            <div className="font-medium">{category.name}</div>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="secondary">{category.slug}</Badge>
      </TableCell>

      <TableCell className="max-w-xs">
        <div className="truncate">
          {category.description || <span className="text-muted-foreground italic">{t("noDescription")}</span>}
        </div>
      </TableCell>

      <TableCell>
        <CategoryActions category={category} />
      </TableCell>
    </TableRow>
  );
};
