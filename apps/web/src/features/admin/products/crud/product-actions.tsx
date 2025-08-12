import { EditIcon, MoreHorizontalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Product } from "@/types/product";
import useDeleteProduct from "../apis/use-delete-product";
import UpdateProduct from "./update";

interface ProductActionsProps {
  product: Product;
}

export const ProductActions = ({ product }: ProductActionsProps) => {
  const { t } = useTranslation();
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleEdit = () => {
    setShowUpdateDialog(true);
  };

  const handleDeleteConfirm = async () => {
    deleteProduct(
      { id: product.id },
      {
        onSuccess: () => {
          setShowDeleteDialog(false);
          toast.success(t("productDeleted"));
        },
      },
    );
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  return (
    <div className="flex items-center gap-2 justify-between">
      {/* <ChangeStatus product={product} /> */}

      {showUpdateDialog && (
        <UpdateProduct product={product} open={showUpdateDialog} onOpenChange={setShowUpdateDialog} />
      )}

      <ConfirmationDialog
        title={`${t("deleteProduct")} ${product.name}`}
        description={t("deleteProductDescription")}
        isLoading={isPending}
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteConfirm}
      />

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

          <DropdownMenuItem onClick={handleDeleteClick} className="text-destructive">
            <TrashIcon className="mr-2 h-4 w-4" />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
