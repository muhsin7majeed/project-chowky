import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { FlatCategory } from "@/types/category";

interface ChangeStatusProps {
  category: FlatCategory;
}

const ChangeStatus = ({ category }: ChangeStatusProps) => {
  const handleStatusToggle = () => {
    // TODO: Implement toggle status functionality
    console.log("Toggle status for category:", category.id);
  };

  return (
    <Label>
      <Switch checked={category.isActive} onCheckedChange={handleStatusToggle} />
      {category.isActive ? "Active" : "Inactive"}
    </Label>
  );
};

export default ChangeStatus;
