

// "use client"

// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { updatedParticipatStatus } from "@/services/Participant";
// import { useState, useEffect } from "react";
// import { toast } from "sonner";

// interface TParticipantDialogProps {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     action: "status" | null;
//     onClose: () => void;
//     id: string;
//     currentStatus: string;
//     onStatusUpdate: (updatedParticipant: any) => void;
// }

// const ParticipantStatusDialog = ({
//     open,
//     onOpenChange,
//     onClose,
//     action,
//     id,
//     currentStatus,
//     onStatusUpdate
// }: TParticipantDialogProps) => {
//     const [status, setStatus] = useState(currentStatus);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         setStatus(currentStatus);
//     }, [currentStatus]);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             if (action === "status") {
//                 const updatedParticipant = await updatedParticipatStatus(id, status);
//                 console.log("update status", updatedParticipant);
                
//                 toast.success(`Participant status updated to "${status}".`);
//                 onStatusUpdate(updatedParticipant);
//             }
//             onClose();
//         } catch (error) {
//             toast.error("There was a problem updating the status.");
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Dialog open={open} onOpenChange={onOpenChange}>
//             <DialogContent className="sm:max-w-[425px]">
//                 <form onSubmit={handleSubmit}>
//                     <DialogHeader>
//                         <DialogTitle>Update Participant Status</DialogTitle>
//                         <DialogDescription>
//                             Update participant status for this event.
//                         </DialogDescription>
//                     </DialogHeader>

//                     <div className="grid gap-4 py-4">
//                         <div className="grid gap-2">
//                             <Label htmlFor="status">Status</Label>
//                             <Select
//                                 value={status}
//                                 onValueChange={setStatus}
//                             >
//                                 <SelectTrigger id="status" className="rounded-md">
//                                     <SelectValue placeholder="Select Status" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="APPROVED">APPROVED</SelectItem>
//                                     <SelectItem value="REJECTED">REJECTED</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                     </div>

//                     <DialogFooter>
//                         <Button
//                             type="button"
//                             variant="outline"
//                             onClick={onClose}
//                             disabled={loading}
//                         >
//                             Cancel
//                         </Button>
//                         <Button
//                             type="submit"
//                             className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
//                             disabled={loading}
//                         >
//                             {loading ? "Updating..." : "Update"}
//                         </Button>
//                     </DialogFooter>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default ParticipantStatusDialog;