import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

interface ConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  isLoading: boolean;
  trigger: React.ReactNode;
}

const ConfirmationDialog = ({ title, description, onConfirm, isLoading, trigger }: ConfirmationDialogProps) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
