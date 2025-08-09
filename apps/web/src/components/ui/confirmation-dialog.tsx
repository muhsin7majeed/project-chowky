import { Button } from "./button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog";

interface ConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationDialog = ({ title, description, onConfirm, isLoading, isOpen, onClose }: ConfirmationDialogProps) => {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="destructive" onClick={onConfirm} disabled={isLoading} isLoading={isLoading}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
