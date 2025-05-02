import Link from "next/link"
import { Calendar, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-muted p-4 text-center">
      <div className="relative mb-4 flex h-40 w-40 items-center justify-center rounded-full bg-muted/50">
        <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse"></div>
        <Calendar className="h-20 w-20 text-primary" />
      </div>


      <div className="mb-2 text-9xl font-extrabold tracking-tight text-primary flex gap-1 items-center">
        <span>4</span>
        <span>
          <div className="relative mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-muted/50">
            <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping"></div>
            <Calendar className="h-16 w-16 text-primary" />
          </div>
        </span>
        <span>4</span>
      </div>

      <h2 className="mb-4 text-3xl font-bold tracking-tight">Page Not Found</h2>

      <p className="mb-8 max-w-md text-muted-foreground">
        Oops! The event you're looking for seems to have ended or never existed. Let's get you back to where the action
        is happening.
      </p>

      <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
        <Button
          asChild
          size="lg"
          className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        >
          <Link href="/dashboard">
            Back to Dashboard
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="rounded-md">
          <Link href="/dashboard/create-event">
            Create New Event
          </Link>
        </Button>
      </div>
    </div>
  )
}
