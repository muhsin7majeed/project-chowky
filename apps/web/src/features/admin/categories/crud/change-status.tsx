import { Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { FlatCategory } from "@/types/category";
import useUpdateCategory from "../apis/use-update-category";

interface ChangeStatusProps {
  category: FlatCategory;
}

const ChangeStatus = ({ category }: ChangeStatusProps) => {
  const { t } = useTranslation();
  const { mutate: updateCategory, isPending } = useUpdateCategory();

  const handleStatusToggle = () => {
    updateCategory(
      {
        id: category.id,
        isActive: !category.isActive,
        // name: category.name,
        // slug: category.slug,
      },
      {
        onSuccess: () => {
          toast.success(t("categoryUpdated"));
        },
      },
    );
  };

  return (
    <Label>
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Switch checked={category.isActive} onCheckedChange={handleStatusToggle} disabled={isPending} />
      )}
      {category.isActive ? "Active" : "Inactive"}
    </Label>
  );
};

export default ChangeStatus;
