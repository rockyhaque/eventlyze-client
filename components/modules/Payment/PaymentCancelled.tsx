"use client"

import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function PaymentCancelled() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-12">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pb-2">
          <div className="rounded-full bg-amber-50 p-3">
            <XCircle className="h-12 w-12 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold text-center">Payment Cancelled</h1>
          <p className="text-muted-foreground text-center">Your payment process has been cancelled</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference</span>
                <span className="font-medium">REF123456789</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-amber-500">Cancelled</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">What happens now?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>No charges have been made to your payment method</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Your cart items are still saved</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You can resume your checkout process at any time</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">Need help?</h3>
            <p className="text-sm text-muted-foreground">
              If you have any questions or concerns about your cancelled payment, our customer support team is here to
              help.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/checkout">Return to Checkout</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
