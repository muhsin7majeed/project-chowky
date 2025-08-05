import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Category } from "@/types/category";
import UpdateCategory from "../update";

interface FlatCategory extends Category {
  level: number;
  parentName?: string;
}

// Helper function to flatten nested categories
const flattenCategories = (categories: Category[], level = 0, parentName?: string): FlatCategory[] => {
  const flattened: FlatCategory[] = [];

  for (const category of categories) {
    flattened.push({
      ...category,
      level,
      parentName,
    });

    if (category.subCategories?.length) {
      flattened.push(...flattenCategories(category.subCategories, level + 1, category.name));
    }
  }

  return flattened;
};

interface CategoryActionsProps {
  category: FlatCategory;
}

const CategoryActions = ({ category }: CategoryActionsProps) => {
  const { t } = useTranslation();
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  const handleEdit = () => {
    setShowUpdateDialog(true);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete category:", category.id);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEdit}>
            <EditIcon className="mr-2 h-4 w-4" />
            {t("edit")}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDelete} className="text-destructive">
            <TrashIcon className="mr-2 h-4 w-4" />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showUpdateDialog && (
        <UpdateCategory category={category} open={showUpdateDialog} onOpenChange={setShowUpdateDialog} />
      )}
    </>
  );
};

interface CategoryRowProps {
  category: FlatCategory;
}

const CategoryRow = ({ category }: CategoryRowProps) => {
  const { t } = useTranslation();
  const indentStyle = { paddingLeft: `${category.level * 24 + 12}px` };

  return (
    <TableRow>
      <TableCell style={indentStyle} className="font-medium">
        <div className="flex items-center gap-2">
          {category.level > 0 && <div className="w-4 h-px bg-primary hidden sm:block" />}

          <div className="min-w-0 flex-1">
            <div className="font-medium">{category.name}</div>
            <div className="text-xs text-muted-foreground md:hidden">{category.slug}</div>

            {category.description && (
              <div className="text-xs text-muted-foreground lg:hidden mt-1 line-clamp-2">{category.description}</div>
            )}
          </div>
        </div>
      </TableCell>

      <TableCell className="hidden md:table-cell">
        <Badge variant="secondary">{category.slug}</Badge>
      </TableCell>

      <TableCell className="max-w-xs hidden lg:table-cell">
        <div className="truncate">
          {category.description || <span className="text-muted-foreground italic">{t("noDescription")}</span>}
        </div>
      </TableCell>

      <TableCell>
        <Switch
          checked={category.isActive}
          onCheckedChange={() => {
            // TODO: Implement toggle status functionality
          }}
        />
      </TableCell>

      <TableCell>
        <CategoryActions category={category} />
      </TableCell>
    </TableRow>
  );
};

interface CategoryListProps {
  categories: Category[];
  expanded: boolean;
}

const CategoryList = ({ categories }: CategoryListProps) => {
  const { t } = useTranslation();
  const flatCategories = flattenCategories(categories);
  console.log(flatCategories);

  if (flatCategories.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">{t("noCategories")}</div>;
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[150px]">{t("name")}</TableHead>
              <TableHead className="hidden md:table-cell min-w-[120px]">{t("slug")}</TableHead>
              <TableHead className="hidden lg:table-cell">{t("description")}</TableHead>
              <TableHead className="min-w-[80px]">{t("status")}</TableHead>
              <TableHead className="w-[70px]">{t("actions")}</TableHead>
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
