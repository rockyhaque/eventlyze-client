"use client"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function PaymentSuccess({paymentDetails}:{paymentDetails:any}) {

  console.log(paymentDetails)

  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4 py-12">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-2 pb-2">
          <div className="rounded-full bg-green-50 p-3">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-center">Payment Successful</h1>
          <p className="text-muted-foreground text-center">Your transaction has been completed successfully</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-medium">TXN123456789</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">$99.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium">Credit Card</span>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You will receive a confirmation email shortly</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Your order will be processed within 24 hours</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>You can track your order in your account dashboard</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
