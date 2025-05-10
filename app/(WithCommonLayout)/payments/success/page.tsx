import { Button } from "@/components/ui/button"
import { Calendar, DollarSign } from "lucide-react"
import Link from "next/link"

const PaymentSuccessPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4 text-center">


            <div>
                <div className="relative mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-muted/50">
                    <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping"></div>
                    <DollarSign className="h-16 w-16 text-primary" />
                </div>
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight">Payment Successful</h2>

            <p className="mb-8 max-w-md text-lg text-muted-foreground">
              Thanks for your payment! Please wait for host to approve your join request.
            </p>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <Button
                    asChild
                    size="lg"
                    className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                    <Link href="/dashboard/payments">
                        See All Payments
                    </Link>
                </Button>
            </div>
        </div>
    )
}

export default PaymentSuccessPage