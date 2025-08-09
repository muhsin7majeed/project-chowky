import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FlatCategory } from "@/types/category";
import useDeleteCategory from "../apis/use-delete-category";
import ChangeStatus from "./change-status";
import UpdateCategory from "./update";

interface CategoryActionsProps {
  category: FlatCategory;
}

export const CategoryActions = ({ category }: CategoryActionsProps) => {
  const { t } = useTranslation();
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { mutate: deleteCategory, isPending } = useDeleteCategory();

  const handleEdit = () => {
    setShowUpdateDialog(true);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log("Delete category:", category.id);
  };

  return (
    <div className="flex items-center gap-2 justify-between">
      <ChangeStatus category={category} />

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
            <ConfirmationDialog
              trigger={
                <>
                  <TrashIcon className="mr-2 h-4 w-4" />
                  {t("delete")}
                </>
              }
              title={t("deleteCategory")}
              description={t("deleteCategoryDescription")}
              onConfirm={() => deleteCategory({ id: category.id })}
              isLoading={isPending}
            />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {showUpdateDialog && (
        <UpdateCategory category={category} open={showUpdateDialog} onOpenChange={setShowUpdateDialog} />
      )}
    </div>
  );
};
