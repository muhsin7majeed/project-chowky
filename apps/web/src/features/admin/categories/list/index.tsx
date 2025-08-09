import { useTranslation } from "react-i18next";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Category } from "@/types/category";
import flattenCategories from "../utils/get-flattened-categories";
import { CategoryRow } from "./category-row";

interface CategoryListProps {
  categories: Category[];
  expanded: boolean;
  handleSort: (column: string) => void;
  sort: {
    column: string;
    direction: "asc" | "desc";
  };
}

const CategoryList = ({ categories, handleSort, sort }: CategoryListProps) => {
  const { t } = useTranslation();
  const flatCategories = flattenCategories(categories);

  if (flatCategories.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">{t("noCategories")}</div>;
  }

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="max-w-screen">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort("createdAt")}
                sortDirection={sort.column === "createdAt" ? sort.direction : undefined}
              >
                {t("createdAt")}
              </TableHead>

              <TableHead
                onClick={() => handleSort("name")}
                sortDirection={sort.column === "name" ? sort.direction : undefined}
              >
                {t("name")}
              </TableHead>
              <TableHead>{t("slug")}</TableHead>
              <TableHead>{t("description")}</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {flatCategories.map((category) => (
              <CategoryRow key={`${category.id}-${category.level}`} category={category} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CategoryList;
