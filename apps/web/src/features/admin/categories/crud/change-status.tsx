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

  return <Switch checked={category.isActive} onCheckedChange={handleStatusToggle} />;
};

export default ChangeStatus;
