"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PaymentDialog({
  open,
  onOpenChange,
  price,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  price: number;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Pay & Join
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Enter your payment details to join this event.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input id="card-number" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" placeholder="123" />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name on Card</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Pay {price}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
