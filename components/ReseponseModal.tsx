import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";


export const SuccessModal = ({ open, onOpenChange, message }: { open: boolean, onOpenChange: (val: boolean) => void, message: string }) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-green-600">Success</DialogTitle>
        </DialogHeader>
        <p>{message}</p>
      </DialogContent>
    </Dialog>
  );


export const ErrorModal = ({ open, onOpenChange, message }: { open: boolean, onOpenChange: (val: boolean) => void, message: string }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-red-600">Error</DialogTitle>
      </DialogHeader>
      <p>{message}</p>
    </DialogContent>
  </Dialog>
);