import { useTranslation } from "react-i18next";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Category } from "@/types/category";
import { CategoryRow } from "./category-row";
import { flattenCategories } from "./utils";

interface CategoryListProps {
  categories: Category[];
  expanded: boolean;
}

const CategoryList = ({ categories }: CategoryListProps) => {
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
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("slug")}</TableHead>
              <TableHead>{t("description")}</TableHead>
              <TableHead>{t("status")}</TableHead>
              <TableHead>{t("actions")}</TableHead>
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
