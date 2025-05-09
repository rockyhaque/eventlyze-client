import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentSubscriber({subscribers}:any) {

  if (subscribers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
     
        <h3 className="mt-4 text-lg font-medium">No Subscribers</h3>
        <p className="mt-2 text-sm text-muted-foreground">
            You haven't received any subscribers yet.
        </p>
      </div>
    )
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Subscriber</CardTitle>
        <CardDescription>People who have subscribe to your newsletter</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subscribers.map((subscriber: any) => (
            <div key={subscriber.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="uppercase">{subscriber.email.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">{subscriber?.email}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}